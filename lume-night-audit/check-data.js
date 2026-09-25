/* LUME Night Audit — content check. Run after editing data.js:
     node lume-night-audit/check-data.js
   Loads data.js and the search part of app.js (no browser needed) and reports broken references.
   Exit code 1 when something is wrong. */
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const dir=__dirname,read=f=>fs.readFileSync(path.join(dir,f),'utf8');

// app.js up to its start-up block: only definitions, nothing touches the DOM.
const app=read('app.js'),cut=app.indexOf('/* ---------- Start ---------- */');
if(cut<0){console.error('app.js: start-up marker not found');process.exit(1)}
const d=vm.runInNewContext(read('data.js')+'\n'+app.slice(0,cut)+
  '\n;({sections,allCards,guidedRun,codes,problems,phaseMap,badgeClass,visualGuides,visualLinks,getTopCard})',{});

const errors=[],err=m=>errors.push(m);
const dupes=(list,what)=>list.filter((x,i)=>list.indexOf(x)!==i).forEach(x=>err(`duplicate ${what} id "${x}"`));
const cards=new Map(d.allCards.map(c=>[c.id,c])),secs=new Map(d.sections.map(s=>[s.id,s])),guides=new Map(d.visualGuides.map(g=>[g.id,g]));
dupes(d.allCards.map(c=>c.id),'card');dupes(d.sections.map(s=>s.id),'section');dupes(d.visualGuides.map(g=>g.id),'visual guide');

d.sections.forEach(s=>{
  if(!(s.badge in d.badgeClass))err(`section ${s.id}: unknown badge "${s.badge}"`);
  (s.steps||[]).forEach((st,i)=>{if(!st[0])err(`section ${s.id} step ${i+1}: no title`)});
});
d.allCards.forEach(c=>{
  if(!c.title)err(`card ${c.id}: no title`);
  if(c.sectionId&&!secs.has(c.sectionId))err(`card ${c.id}: unknown sectionId "${c.sectionId}"`);
  if(c.status&&!(c.status in d.badgeClass))err(`card ${c.id}: unknown status "${c.status}"`);
});
const PHASES=['START OF NIGHT','BEFORE EOD','AFTER EOD'];
d.guidedRun.forEach((s,i)=>{
  const at=`Run Night step ${i+1} (${s.title})`;
  if(!PHASES.includes(s.phase))err(`${at}: phase "${s.phase}" is not shown on Run Night`);
  if(!s.answerId&&!s.sectionId)err(`${at}: no answerId or sectionId, HOW opens nothing`);
  if(s.answerId&&!cards.has(s.answerId))err(`${at}: unknown answerId "${s.answerId}"`);
  if(s.sectionId&&!secs.has(s.sectionId))err(`${at}: unknown sectionId "${s.sectionId}"`);
});

// Visual guides: every linked image exists on disk and every image file is used.
const used=new Set();
d.visualGuides.forEach(g=>(g.images||[]).forEach(im=>{
  used.add(im.src);
  if(!fs.existsSync(path.join(dir,im.src)))err(`visual guide ${g.id}: missing file ${im.src}`);
  if(!im.caption)err(`visual guide ${g.id}: ${im.src} has no caption`);
}));
Object.entries(d.visualLinks).forEach(([ref,links])=>{
  if(!cards.has(ref)&&!secs.has(ref))err(`visualLinks "${ref}": not a card or section id`);
  links.forEach(([id,ix])=>{const g=guides.get(id);
    if(!g)return err(`visualLinks "${ref}": unknown guide "${id}"`);
    ix.forEach(i=>{if(!g.images[i])err(`visualLinks "${ref}": guide "${id}" has no image ${i}`)});
  });
});
fs.readdirSync(path.join(dir,'images')).forEach(f=>{if(!used.has('images/'+f))err(`images/${f} is not used by any visual guide`)});

// Codes and Problem buttons must open an answer, not "No confident direct answer".
d.codes.forEach(([c])=>{if(!d.getTopCard(c))err(`Codes tab: "${c}" finds no answer`)});
d.problems.forEach(([t,q])=>{if(!d.getTopCard(q))err(`Problem tab: "${t}" (query "${q}") finds no answer`)});

if(errors.length){console.error(`${errors.length} problem(s) in LUME content:\n- `+errors.join('\n- '));process.exit(1)}
console.log(`LUME content OK: ${d.guidedRun.length} run steps, ${cards.size} cards, ${secs.size} sections, ${guides.size} visual guides, ${used.size} images, ${d.codes.length} codes, ${d.problems.length} problems.`);
