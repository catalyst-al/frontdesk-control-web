/* LUME Visual Quality Update
   Deterministic, non-generative enhancement of existing SOP screenshots.
   No interface, captions, SOP mapping, workflow logic, or original image files are changed.
*/
(function(){
'use strict';

const VQ={
  version:'2026-09-23-v1',
  cache:new Map(),
  pending:new Map(),
  observer:null,
  io:null
};

function isSopJpeg(src){
  if(!src) return false;
  return /^data:image\/(jpeg|jpg);base64,/i.test(src) ||
    /(?:^|\/)lume-night-audit\/images\/[^?#]+\.jpe?g(?:[?#].*)?$/i.test(src) ||
    /^images\/[^?#]+\.jpe?g(?:[?#].*)?$/i.test(src);
}

function scaleFor(w,h){
  const longest=Math.max(w,h);
  if(longest<700) return 2.5;
  if(longest<1200) return 2.0;
  if(longest<1800) return 1.5;
  return 1.0;
}

function loadImage(src){
  return new Promise((resolve,reject)=>{
    const im=new Image();
    im.decoding='async';
    im.onload=()=>resolve(im);
    im.onerror=reject;
    im.src=src;
  });
}

function gentleSharpen(canvas){
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  const w=canvas.width,h=canvas.height;
  const pixels=w*h;
  if(pixels>3500000 || w<3 || h<3) return;
  const im=ctx.getImageData(0,0,w,h);
  const src=im.data;
  const out=new Uint8ClampedArray(src);
  const amount=0.10;
  for(let y=1;y<h-1;y++){
    let p=(y*w+1)*4;
    for(let x=1;x<w-1;x++,p+=4){
      for(let c=0;c<3;c++){
        const center=src[p+c];
        const blur=(src[p-4+c]+src[p+4+c]+src[p-w*4+c]+src[p+w*4+c]+center*4)/8;
        out[p+c]=Math.max(0,Math.min(255,Math.round(center+(center-blur)*amount)));
      }
    }
  }
  im.data.set(out);
  ctx.putImageData(im,0,0);
}

async function enhance(src){
  if(!isSopJpeg(src)) return src;
  if(VQ.cache.has(src)) return VQ.cache.get(src);
  if(VQ.pending.has(src)) return VQ.pending.get(src);

  const work=(async()=>{
    const im=await loadImage(src);
    const scale=scaleFor(im.naturalWidth,im.naturalHeight);
    const w=Math.max(1,Math.round(im.naturalWidth*scale));
    const h=Math.max(1,Math.round(im.naturalHeight*scale));
    const c=document.createElement('canvas');
    c.width=w;c.height=h;
    const ctx=c.getContext('2d');
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality='high';
    ctx.filter='contrast(1.035)';
    ctx.drawImage(im,0,0,w,h);
    ctx.filter='none';
    gentleSharpen(c);
    let out;
    try{out=c.toDataURL('image/webp',0.96);}catch(e){out=c.toDataURL('image/png');}
    VQ.cache.set(src,out);
    VQ.pending.delete(src);
    return out;
  })().catch(()=>{
    VQ.pending.delete(src);
    return src;
  });

  VQ.pending.set(src,work);
  return work;
}

async function upgradeNode(img){
  if(!img || img.dataset.lumeVq==='done' || img.dataset.lumeVq==='working') return;
  const src=img.getAttribute('src')||'';
  if(!isSopJpeg(src)) return;
  img.dataset.lumeVq='working';
  img.dataset.lumeVqOriginal=src;
  const hi=await enhance(src);
  if(img.isConnected && img.dataset.lumeVqOriginal===src){
    img.src=hi;
    img.dataset.lumeVq='done';
  }
}

function observeImage(img){
  if(!img || img.dataset.lumeVqObserved==='1') return;
  const src=img.getAttribute('src')||'';
  if(!isSopJpeg(src)) return;
  img.dataset.lumeVqObserved='1';
  if(VQ.io) VQ.io.observe(img); else upgradeNode(img);
}

function scan(root){
  if(!root || !root.querySelectorAll) return;
  if(root.matches && root.matches('.visualgallery img,.inline-mini img,#imgZoomImg')) observeImage(root);
  root.querySelectorAll('.visualgallery img,.inline-mini img,#imgZoomImg').forEach(observeImage);
}

function install(){
  if('IntersectionObserver' in window){
    VQ.io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          VQ.io.unobserve(e.target);
          upgradeNode(e.target);
        }
      });
    },{rootMargin:'500px 0px'});
  }

  scan(document);

  VQ.observer=new MutationObserver(muts=>{
    muts.forEach(m=>{
      m.addedNodes&&m.addedNodes.forEach(n=>{if(n.nodeType===1)scan(n)});
      if(m.type==='attributes' && m.target && m.target.tagName==='IMG'){
        const img=m.target;
        if(img.dataset.lumeVq==='working' || img.dataset.lumeVq==='done') return;
        observeImage(img);
      }
    });
  });
  VQ.observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});

  if(typeof window.openImageZoom==='function'){
    const oldZoom=window.openImageZoom;
    window.openImageZoom=function(src,caption){
      oldZoom(src,caption);
      enhance(src).then(hi=>{
        const z=document.getElementById('imgZoomImg');
        if(z && z.src===src) z.src=hi;
      });
    };
  }

  if(typeof window.renderVisuals==='function'){
    const oldRender=window.renderVisuals;
    window.renderVisuals=function(){
      const r=oldRender.apply(this,arguments);
      setTimeout(()=>scan(document.getElementById('visualGrid')),0);
      return r;
    };
  }

  window.LumeVisualQuality=VQ;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
else install();
})();