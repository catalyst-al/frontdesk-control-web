/* LUME Night Audit — behaviour. Content lives in data.js. */
'use strict';

const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9%+.-]+/g,' ').trim();
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
const jsArg=v=>String(v).replace(/'/g,"\\'");
const $=id=>document.getElementById(id);

/* ---------- Run progress: one record per night, stored only in this browser ---------- */
// A night runs from noon to noon, so 22:30–07:00 is one shift and a new night always starts empty.
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
function nightStart(now=new Date()){const d=new Date(now);if(d.getHours()<12)d.setDate(d.getDate()-1);d.setHours(12,0,0,0);return d}
const nightKey=()=>'lume-run-'+ymd(nightStart());
function nightLabel(){const a=nightStart(),b=new Date(a);b.setDate(b.getDate()+1);return `Night ${pad(a.getDate())}.${pad(a.getMonth()+1)} → ${pad(b.getDate())}.${pad(b.getMonth()+1)}.${b.getFullYear()}`}
function loadRun(){try{return JSON.parse(localStorage.getItem(nightKey())||'{}')}catch(e){return {}}}
function saveRun(r){try{localStorage.setItem(nightKey(),JSON.stringify(r))}catch(e){}}
const doneTime=i=>{const t=loadRun()[i];if(!t)return '';const d=new Date(t);return pad(d.getHours())+':'+pad(d.getMinutes())};
// Remove the old shared ticks (they never reset) and nights older than a week.
function pruneRuns(){try{const keep=new Date(nightStart());keep.setDate(keep.getDate()-7);
  Object.keys(localStorage).forEach(k=>{if(/^lume-v3-run-\d+$/.test(k)||(/^lume-run-\d{4}-\d\d-\d\d$/.test(k)&&k.slice(9)<ymd(keep)))localStorage.removeItem(k)})}catch(e){}}
// Ticking "Nachtlauf starten" asks first if key pre-EOD controls are still open.
const PRE_EOD=['settlements','d140cc','minibar','cover','d140storno','cashcount'];
function setRun(i,checked,box){
  const r=loadRun();
  if(checked&&guidedRun[i].answerId==='eodstart'){
    const open=guidedRun.map((s,j)=>({s,j})).filter(x=>PRE_EOD.includes(x.s.answerId)&&!(x.j in r)).map(x=>'• '+x.s.title);
    if(open.length&&!confirm('Not ticked yet before EOD:\n\n'+open.join('\n')+'\n\nStart Nachtlauf anyway?')){if(box)box.checked=false;return}
  }
  if(checked)r[i]=Date.now();else delete r[i];
  saveRun(r);renderRun();
}
function resetRun(){if(!confirm('Reset all ticks for this night?'))return;try{localStorage.removeItem(nightKey())}catch(e){}renderRun()}
/* ---------- Night summary (print) ---------- */
// One printable page for handover: every step with its tick time, open steps listed again, signature line.
function renderSummary(){
  const r=loadRun(),done=guidedRun.filter((_,i)=>i in r).length,open=guidedRun.map((s,i)=>({...s,i})).filter(s=>!(s.i in r));
  const now=new Date(),stamp=`${pad(now.getDate())}.${pad(now.getMonth()+1)}.${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  let h=`<h1>LUME Night Audit — Night summary</h1><p class="ps-meta"><b>${esc(nightLabel())}</b> · ${done} / ${guidedRun.length} steps completed · printed ${stamp}</p>`;
  ['START OF NIGHT','BEFORE EOD','AFTER EOD'].forEach(phase=>{
    const group=guidedRun.map((s,i)=>({...s,i})).filter(s=>s.phase===phase);
    h+=`<h2>${esc(phase)}</h2><table class="tbl"><thead><tr><th>#</th><th>Step</th><th>Done</th></tr></thead><tbody>`+group.map(s=>`<tr><td>${s.i+1}</td><td>${esc(s.title)}</td><td>${s.i in r?'✓ '+doneTime(s.i):'<b>OPEN</b>'}</td></tr>`).join('')+'</tbody></table>';
  });
  h+=open.length?`<h2>Still open (${open.length})</h2><ul>${open.map(s=>`<li>${s.i+1}. ${esc(s.title)}</li>`).join('')}</ul>`:'<h2>All steps completed</h2>';
  h+='<div class="ps-sign"><span>Night auditor: ______________________</span><span>Signature: ______________________</span></div><p class="ps-meta">Ticks are recorded in this browser only. Notes, differences and escalations go into the handover.</p>';
  $('printSummary').innerHTML=h;
}
function printSummary(){renderSummary();document.body.classList.add('print-summary-mode');window.print()}
window.addEventListener('afterprint',()=>document.body.classList.remove('print-summary-mode'));
function goNext(){const el=document.querySelector('.runstep.next');if(el)el.scrollIntoView({behavior:'smooth',block:'center'})}

/* ---------- Visual guides ---------- */
const guideById=id=>visualGuides.find(g=>g.id===id);
function linkedImages(ref){const out=[];(visualLinks[ref]||[]).forEach(([id,ix])=>{const g=guideById(id);if(g)ix.forEach(i=>{if(g.images[i])out.push({g,im:g.images[i]})})});return out}
function getVisualGuidesForRef(ref){const seen=new Set(),out=[];(visualLinks[ref]||[]).forEach(([id])=>{const g=guideById(id);if(g&&!seen.has(id)){seen.add(id);out.push(g)}});return out}
function figure(im,i){return `<figure class="figure"><img src="${im.src}" alt="${esc(im.caption)}" loading="lazy" onclick="openImageZoom(this.src,this.alt)"><figcaption><b>${i+1}.</b> ${esc(im.caption)}</figcaption></figure>`}
function openDrawerHtml(html){$('drawerContent').innerHTML=html;$('drawer').classList.add('show');document.body.style.overflow='hidden'}
function openVisualForRef(ref,title){const items=linkedImages(ref);if(!items.length)return;openDrawerHtml(`<h2>${esc(title||items[0].g.title)}</h2><p class="muted" style="margin-top:6px">Only the screenshot(s) linked to this SOP / workflow are shown here.</p><div class="visualgallery" style="padding:14px 0">${items.map((x,i)=>figure(x.im,i)).join('')}</div>`)}
function openVisualGuide(id){const g=guideById(id);if(!g)return;const ref=Object.keys(visualLinks).find(k=>visualLinks[k].some(x=>x[0]===id));if(ref)return openVisualForRef(ref,g.title);openDrawerHtml(`<h2>${esc(g.title)}</h2><p class="muted" style="margin-top:6px">${esc(g.summary||'')}</p><div class="visualgallery" style="padding:14px 0">${(g.images||[]).map(figure).join('')}</div>`)}
function renderInlineVisuals(ref){const items=linkedImages(ref);if(!items.length)return '';return `<div class="visualinline"><b>Visual help · linked to this workflow</b><div class="inlinebtns"><button class="btn" onclick="openVisualForRef('${jsArg(ref)}')">SEE linked screenshots</button></div><div class="inline-mini">${items.slice(0,2).map(x=>`<img src="${x.im.src}" alt="${esc(x.im.caption)}" onclick="openImageZoom(this.src,this.alt)" title="Click to zoom">`).join('')}</div></div>`}
function renderVisuals(){
  $('visualGrid').innerHTML=visualGuides.map(g=>`<article class="visualcard" id="visual-${g.id}"><div class="visualhead"><h3>${esc(g.title)}</h3><p>${esc(g.summary)}</p><div class="visualtagrow"><span class="badge b-live">${esc(g.phase)}</span>${(g.refIds||[]).slice(0,5).map(r=>`<span class="badge b-check">${esc(r.toUpperCase())}</span>`).join('')}</div></div><div class="visualgallery">${g.images.map(figure).join('')}</div></article>`).join('');
}
function openImageZoom(src,caption){$('imgZoomImg').src=src;$('imgZoomCap').textContent=caption||'';$('imgZoom').classList.add('show');document.body.style.overflow='hidden'}
function closeImageZoom(){$('imgZoom').classList.remove('show');$('imgZoomImg').src='';document.body.style.overflow=''}

/* ---------- Navigation ---------- */
function showView(name){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  $('view-'+name).classList.add('active');
  document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.view===name));
  window.scrollTo({top:document.querySelector('.topnav').offsetTop,behavior:'smooth'});
}
function focusSearch(){setTimeout(()=>$('q').focus(),80)}
function openSop(id){closeDrawer();showView('sop');setTimeout(()=>openSection(id),60)}
function openSection(id){const d=$('sop-'+id);if(!d)return;d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'})}
function toggleAll(v){document.querySelectorAll('.sop-section').forEach(x=>x.open=v)}
function openDrawerCard(card){openDrawerHtml(renderAnswer(card))}
function closeDrawer(){$('drawer').classList.remove('show');document.body.style.overflow=''}

/* ---------- Run Night ---------- */
const SOURCE={check:['Checkliste NEU','b-check'],live:['Live Training','b-live'],both:['Checklist + Live','b-both']};
function renderRun(){
  const host=$('runList');host.innerHTML='';
  const r=loadRun(),next=guidedRun.findIndex((_,i)=>!(i in r));
  ['START OF NIGHT','BEFORE EOD','AFTER EOD'].forEach(phase=>{
    const group=guidedRun.map((s,i)=>({...s,i})).filter(s=>s.phase===phase);
    const block=document.createElement('div');block.className='phase';
    block.innerHTML=`<div class="phase-title"><h3>${esc(phase)}</h3><div class="phase-count">${group.filter(s=>s.i in r).length} / ${group.length} completed</div></div>`;
    group.forEach(s=>{
      const done=s.i in r,[srcLabel,srcClass]=SOURCE[s.source]||SOURCE.both,ref=s.answerId||s.sectionId||'';
      const row=document.createElement('div');row.className='runstep'+(done?' done':'')+(s.i===next?' next':'');
      const visualBtn=getVisualGuidesForRef(ref).length?`<button class="howbtn" onclick="openVisualForRef('${ref}')">SEE</button>`:'';
      const flag=done?`<span class="donetime">✓ ${doneTime(s.i)}</span>`:(s.i===next?'<span class="nextflag">NEXT</span>':'');
      row.innerHTML=`<input type="checkbox" ${done?'checked':''} onchange="setRun(${s.i},this.checked,this)"><div><h4>${esc(s.title)}${s.time?`<span class="timeflag">${esc(s.time)}</span>`:''}${flag}</h4><p>${esc(s.detail)}</p><span class="badge ${srcClass}" style="margin-top:7px">${srcLabel}</span></div><div class="run-actions"><button class="howbtn" onclick="openRunHelp(${s.i})">HOW</button>${visualBtn}</div>`;
      block.appendChild(row);
    });
    host.appendChild(block);
  });
  const done=guidedRun.filter((_,i)=>i in r).length,pct=Math.round(done/guidedRun.length*100);
  $('runCount').textContent=`${done} / ${guidedRun.length} completed`;$('runBar').style.width=pct+'%';$('runPct').textContent=pct+'%';
  $('runNight').textContent=nightLabel();$('runNext').hidden=next<0;
}
function openRunHelp(i){const s=guidedRun[i];if(s.answerId){const c=allCards.find(x=>x.id===s.answerId);if(c)return openDrawerCard(c)}if(s.sectionId)openSectionDrawer(s.sectionId)}

/* ---------- Search ---------- */
function cardHay(c){return norm([c.title,c.code,(c.aliases||[]).join(' '),c.keywords,c.summary,c.path,(c.steps||[]).join(' '),(c.checks||[]).join(' '),(c.stop||[]).join(' ')].join(' '))}
function meaningfulTokens(raw){return norm(raw).split(/\s+/).filter(t=>t&&!STOPWORDS.has(t))}
function expandTokens(tokens){const set=new Set(tokens);for(const t of tokens)for(const group of SYNSETS)if(group.includes(t))group.forEach(x=>set.add(x));return [...set]}
function levenshtein(a,b){if(a===b)return 0;if(!a.length)return b.length;if(!b.length)return a.length;const v0=Array(b.length+1).fill(0).map((_,i)=>i),v1=Array(b.length+1);for(let i=0;i<a.length;i++){v1[0]=i+1;for(let j=0;j<b.length;j++){const cost=a[i]===b[j]?0:1;v1[j+1]=Math.min(v1[j]+1,v0[j+1]+1,v0[j]+cost)}for(let j=0;j<=b.length;j++)v0[j]=v1[j]}return v1[b.length]}
const cardById=id=>allCards.find(c=>c.id===id);
// Hand-written intents that win over the score ranking.
function intentCard(raw){const q=norm(raw),has=(...w)=>w.some(x=>q.includes(x));
  if(q==='gxp'||has('gxp night','empower gxp'))return cardById('gxpnight');
  if(q==='cec'||has('cec case','customer care open cases'))return cardById('gxpcec');
  if(has('gxp','case')&&q.includes('work order'))return cardById('gxpworkorder');
  if(q.includes('opera')&&has('version','cloud','xpress','franv'))return cardById('operaversion');
  if(has('cashless','01.10.2026'))return cardById('cashlesscontext');
  if(has('15/5','15 5'))return cardById('service155');
  // Problems first, so "FreedomPay d140 mismatch" is not taken by the general D140 intents.
  if(q.includes('minibar')&&has('not zero','nicht null','nuk eshte zero','balance'))return cardById('minibarzero');
  if(q.includes('cover')&&has('not zero','nicht null','nuk eshte zero','balance'))return cardById('coverzero');
  if(q.includes('freedompay')&&q.includes('d140')&&has('mismatch','difference','match','passt'))return cardById('ccdiff');
  if(q.includes('cash')&&q.includes('difference')||has('kasse differenz','drop oracle difference'))return cardById('cashdiff');
  if(q.includes('vcc')&&has('failed','declined','unclear','geht nicht','deshton'))return cardById('vccfailed');
  if(has('eod','nachtlauf','tagesabschluss')&&has('error','stuck','fehler','problem'))return cardById('eoderror');
  if(q.includes('abrechnung')&&has('missing','fehlt','mungon'))return cardById('missingabrechnung');
  if(has('arrival','anreise')&&has('open','still','eod','nachtlauf'))return cardById('arrivalopen');
  if(q==='d140')return cardById('d140overview');
  if(q.includes('d140')&&has('storno','negative'))return cardById('d140storno');
  if(q.includes('d140')&&has('card','cc','freedompay','ifc','ecom'))return cardById('d140cc');
  return null;
}
function scoreCard(card,raw){const q=norm(raw),base=cardHay(card);if(!q)return 0;let score=0;const code=norm(card.code||''),title=norm(card.title||'');if(code&&q===code)score+=180;else if(code&&q.includes(code))score+=95;if(q===title)score+=140;else if(title.includes(q)||q.includes(title))score+=45;for(const a0 of(card.aliases||[])){const a=norm(a0);if(q===a)score+=140;else if(a&&q.includes(a))score+=60}const tokens=meaningfulTokens(raw),expanded=expandTokens(tokens);for(const t of tokens){if(base.includes(t))score+=12;else if(t.length>=4){const words=base.split(/\s+/);if(words.some(w=>w.length>=4&&levenshtein(t,w)<=1))score+=5}}for(const t of expanded){if(!tokens.includes(t)&&base.includes(t))score+=2}if(tokens.length&&tokens.every(t=>base.includes(t)))score+=30;return score}
function getTopCard(raw){const hit=intentCard(raw);if(hit)return hit;const best=allCards.map(c=>({c,s:scoreCard(c,raw)})).sort((a,b)=>b.s-a.s)[0];return best&&best.s>=18?best.c:null}
function renderAnswer(card){
  if(!card)return '<div class="empty">No confident direct answer found. Try a shorter term or exact code such as <b>D140</b>, <b>9516</b>, <b>E100</b>, <b>VCC</b> or <b>%Down</b>.</div>';
  let h=`<div class="answer"><div class="answer-top"><div><h3>${esc(card.title)}${card.code?` <span class="muted">${esc(card.code)}</span>`:''}</h3><span class="phasepill">${esc(phaseMap[card.sectionId]||'REFERENCE')}</span></div><span class="badge ${badgeClass[card.status]||'b-live'}">${esc(badgeLabel[card.status]||'Confirmed')}</span></div><p class="summary">${esc(card.summary)}</p>`;
  if(card.path)h+=`<div class="path">${esc(card.path)}</div>`;
  if(card.steps?.length)h+='<ol>'+card.steps.map(x=>`<li>${esc(x)}</li>`).join('')+'</ol>';
  if(card.checks?.length)h+=`<div class="check"><b>CHECK:</b> ${esc(card.checks.join(' '))}</div>`;
  if(card.stop?.length)h+=`<div class="stop"><b>STOP / DO NOT GUESS:</b> ${esc(card.stop.join(' '))}</div>`;
  h+=renderInlineVisuals(card.id||card.sectionId||'');
  if(card.sectionId){
    const own=getVisualGuidesForRef(card.id).length;
    // Open (unconfirmed) items only show screenshots that belong to them, never the section's.
    const visualRef=own?card.id:(card.status!=='open'&&getVisualGuidesForRef(card.sectionId).length?card.sectionId:'');
    h+=`<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn" onclick="openSop('${card.sectionId}')">Show full SOP</button>${visualRef?`<button class="btn" onclick="openVisualForRef('${visualRef}')">Open visual guide</button>`:''}</div>`;
  }
  return h+'</div>';
}
function searchNow(){
  const raw=$('q').value.trim(),a=$('answerBox'),r=$('relatedBox');
  if(!raw){a.innerHTML='';r.innerHTML='';return}
  a.innerHTML=renderAnswer(getTopCard(raw));
  const toks=meaningfulTokens(raw),exp=expandTokens(toks),hits=[];
  sections.filter(s=>s.id!=='quick').forEach(s=>s.steps.forEach((st,i)=>{const hay=norm([s.title,s.subtitle,st[0],st[1],st[2]||''].join(' '));let sc=0;toks.forEach(t=>{if(hay.includes(t))sc+=8});exp.forEach(t=>{if(!toks.includes(t)&&hay.includes(t))sc+=1});if(sc>0)hits.push({s,st,i,sc})}));
  hits.sort((x,y)=>y.sc-x.sc);
  r.innerHTML=hits.length?'<div class="related"><b>Related SOP steps</b>'+hits.slice(0,8).map(h=>`<button class="result" onclick="openSop('${h.s.id}')"><strong>${esc(h.st[0])}</strong><small>${esc(h.s.title)} · Step ${h.i+1}</small></button>`).join('')+'</div>':'';
}
function setQuery(v){showView('ask');$('q').value=v;searchNow();focusSearch()}
function clearSearch(){$('q').value='';searchNow();focusSearch()}

/* ---------- Static tabs ---------- */
function renderCodes(){$('codeGrid').innerHTML=codes.map(([c,d])=>`<button class="codecard" onclick="setQuery('${jsArg(c)}')"><code>${esc(c)}</code><span>${esc(d)}</span></button>`).join('')}
function renderProblems(){$('problemGrid').innerHTML=problems.map(([t,q])=>`<button class="problem" onclick="setQuery('${jsArg(q)}')"><strong>${esc(t)}</strong><span>Open safe next action</span></button>`).join('')}
// Intro, path, table and numbered steps of one SOP section (Full SOP tab and HOW drawer).
function sopContent(s){
  let h='';
  if(s.intro)h+=`<div class="note">${esc(s.intro)}</div>`;
  if(s.path)h+=`<div><b>Path</b><div class="path">${esc(s.path)}</div></div>`;
  if(s.table)h+='<div class="table-scroll"><table class="tbl"><thead><tr><th>Code</th><th>Description</th></tr></thead><tbody>'+s.table.map(x=>`<tr><td><b>${esc(x[0])}</b></td><td>${esc(x[1])}</td></tr>`).join('')+'</tbody></table></div>';
  return h+'<div class="step-list">'+s.steps.map((st,i)=>`<div class="sopstep"><div class="sopnum">${i+1}</div><div><b>${esc(st[0])}</b><span>${esc(st[1])}</span></div></div>`).join('')+'</div>';
}
function renderSop(){
  $('sopLibrary').innerHTML=sections.filter(s=>s.id!=='quick').map(s=>{
    let body='<div class="sop-body">'+sopContent(s);
    const visuals=getVisualGuidesForRef(s.id);
    if(visuals.length)body+=`<div class="sop-extra"><b>Visual support:</b> ${visuals.map(g=>`<button class="btn" onclick="openVisualGuide('${g.id}')">${esc(g.title)}</button>`).join(' ')}</div>`;
    return `<details class="sop-section" id="sop-${s.id}"><summary><span>${esc(s.title)}<br><small class="muted" style="font-weight:500">${esc(s.subtitle)}</small></span><span class="badge ${badgeClass[s.badge]}">${esc(s.badgeText)}</span></summary>${body}</div></details>`;
  }).join('');
}
// HOW for a checklist step that has no answer card: show its SOP section in the drawer.
function openSectionDrawer(id){
  const s=sections.find(x=>x.id===id);if(!s)return;
  openDrawerHtml(`<div class="answer"><div class="answer-top"><div><h3>${esc(s.title)}</h3><span class="phasepill">${esc(phaseMap[s.id]||'REFERENCE')}</span></div><span class="badge ${badgeClass[s.badge]||'b-live'}">${esc(s.badgeText)}</span></div><p class="summary">${esc(s.subtitle)}</p>${sopContent(s)}${renderInlineVisuals(s.id)}<div style="margin-top:12px"><button class="btn" onclick="openSop('${s.id}')">Show full SOP</button></div></div>`);
}

/* ---------- Start ---------- */
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>showView(b.dataset.view));
$('q').addEventListener('input',searchNow);
$('q').addEventListener('keydown',e=>{if(e.key==='Enter')searchNow();if(e.key==='Escape')clearSearch()});
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if($('imgZoom').classList.contains('show'))closeImageZoom();else if($('drawer').classList.contains('show'))closeDrawer()});
pruneRuns();renderRun();renderCodes();renderProblems();renderVisuals();renderSop();
// A page left open overnight rolls over to the new night at noon.
let shownNight=nightKey();setInterval(()=>{if(nightKey()!==shownNight){shownNight=nightKey();renderRun()}},60000);
