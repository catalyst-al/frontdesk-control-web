/* LUME V5.1 release safety patch — open items stay visibly unconfirmed. */
(function(){
'use strict';

const safetyCards=[
{
 id:'t134', title:'T134 Facility Task Details', code:'T134', sectionId:'reports', status:'open',
 aliases:['t134','facility task details','t134 facility task details','depart full departure clean'],
 keywords:'t134 facility task details depart full departure clean standing role report pack open',
 summary:'T134 Facility Task Details was seen during live training, but its standing role in the formal LUME Night report package is not yet confirmed.',
 path:'Post-EOD reports · exact standing use remains open',
 steps:['Recognize T134 as Facility Task Details.','Treat the demonstrated DEPART - Full Departure Clean screen as orientation only.','Use T134 during Night Audit only when the current checklist or trainer explicitly requires it.'],
 checks:['T134 has not been substituted for J146 or added to the report pack by assumption.'],
 stop:['Do not treat T134 as J146 and do not invent a nightly distribution rule. Confirm its standing role with the trainer/FOM.']
},
{
 id:'oldpms', title:'Old PM accounts 9404 / 9600', code:'9404 / 9600', sectionId:'postpm', status:'open',
 aliases:['9404','pm 9404','old pm 9404','9600','pm 9600','old pm 9600','9404 9600'],
 keywords:'old legacy pm accounts 9404 9600 current 9515 cover 9516 minibar do not use replace substitute',
 summary:'PM 9404 and PM 9600 are old references. They must not be used in place of the current daily Cover PM 9515 and Minibar PM 9516.',
 path:'Current daily PMs: Cover 9515 · Minibar 9516',
 steps:['For Cover, use the current PM 9515 workflow.','For Minibar, use the current PM 9516 workflow.','If an old document or screen points to PM 9404 or PM 9600, stop and confirm before posting.'],
 checks:['The active account is the current authorized PM 9515 or PM 9516 for the correct business date.'],
 stop:['Do not post, extend, copy or check out PM 9404/9600 as substitutes for PM 9515/9516.']
}
];

safetyCards.forEach(card=>{
 if(!qaCards.some(x=>x.id===card.id))qaCards.push(card);
 if(!allCards.some(x=>x.id===card.id))allCards.push(card);
});

if(!codes.some(x=>x[0]==='T134'))codes.push(['T134','Facility Task Details - standing role open']);
if(!codes.some(x=>String(x[0]).includes('9600')))codes.push(['9404 / 9600','Old PMs - do not substitute']);

const minibarCard=qaCards.find(x=>x.id==='minibar');
if(minibarCard&&!minibarCard.stop.some(x=>x.includes('9600'))){
 minibarCard.stop.unshift('Do not use old PM 9600 in place of current Minibar PM 9516.');
}
const coverCard=qaCards.find(x=>x.id==='cover');
if(coverCard&&!coverCard.stop.some(x=>x.includes('9404'))){
 coverCard.stop.unshift('Do not use old PM 9404 in place of current Cover PM 9515.');
}

const previousRenderAnswer=renderAnswer;
renderAnswer=function(card){
 let html=previousRenderAnswer(card);
 if(card&&card.status==='open'&&!getVisualGuidesForRef(card.id).length){
  html=html.replace(/<button class="btn" onclick="openVisualForRef\('[^']+'\)">Open visual guide<\/button>/g,'');
 }
 return html;
};
})();
