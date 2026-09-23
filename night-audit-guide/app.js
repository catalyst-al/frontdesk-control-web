/* Night Audit Guidebook — behaviour.
   Everything runs locally. The only thing stored is which steps were ticked,
   per business date, in this browser's localStorage. */
(function(){
  "use strict";
  var D = window.NAG;
  if(!D) return;

  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var IMG = "img/";
  var KEY_UI = "nag:ui:v1";
  var KEY_NIGHT = "nag:night:v1:";

  function load(key, fallback){
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  }
  function save(key, value){
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(e){}
  }
  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }
  function strip(html){ return String(html || "").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " "); }
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function iso(d){ return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function fromIso(s){
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null;
  }
  function de(d){ return d ? pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear() : "—"; }
  function addDays(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }

  /* ---------- state ---------- */
  var ui = load(KEY_UI, {});
  var state = {
    biz: null,
    mode: ui.mode === "all" ? "all" : "one",
    cur: ui.cur || D.steps[0].id,
    view: "guide",
    done: {}
  };

  // Business date: ?date=YYYY-MM-DD (sent by Front Desk Control), else the night shift's day:
  // before noon the shift is still closing yesterday.
  (function initDate(){
    var q = /[?&]date=(\d{4}-\d{2}-\d{2})/.exec(location.search);
    var d = q ? fromIso(q[1]) : null;
    if(!d){
      var now = new Date();
      d = now.getHours() < 12 ? addDays(now, -1) : now;
      d.setHours(12, 0, 0, 0);
    }
    state.biz = d;
  })();

  function nightKey(){ return KEY_NIGHT + iso(state.biz); }
  function loadNight(){ state.done = load(nightKey(), {}) || {}; }
  function saveNight(){ save(nightKey(), state.done); }
  function saveUi(){ save(KEY_UI, { mode: state.mode, cur: state.cur }); }

  /* ---------- derived data ---------- */
  var phaseById = {};
  D.phases.forEach(function(p){ phaseById[p.id] = p; });
  var labels = {}, counters = {};
  D.steps.forEach(function(s){
    counters[s.phase] = (counters[s.phase] || 0) + 1;
    labels[s.id] = phaseById[s.phase].no + counters[s.phase];
  });
  var stepIndex = {};
  D.steps.forEach(function(s, i){ stepIndex[s.id] = i; });

  function fill(html){
    return String(html || "")
      .replace(/\{B\}/g, "<span class='dt b' title='Business date'>" + de(state.biz) + "</span>")
      .replace(/\{C\}/g, "<span class='dt c' title='Current date'>" + de(addDays(state.biz, 1)) + "</span>");
  }

  var ICONS = {
    calendar: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='4' width='18' height='18' rx='2'/><path d='M16 2v4M8 2v4M3 10h18'/></svg>",
    layers: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2 2 7l10 5 10-5-10-5z'/><path d='m2 17 10 5 10-5M2 12l10 5 10-5'/></svg>",
    paperclip: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5'/></svg>",
    stop: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7.9 2h8.2L22 7.9v8.2L16.1 22H7.9L2 16.1V7.9z'/><path d='M12 8v4M12 16h.01'/></svg>"
  };

  /* ---------- header: dates and progress ---------- */
  function paintDates(){
    $("#bizDate").value = iso(state.biz);
    $("#curDate").textContent = de(addDays(state.biz, 1));
  }
  function paintProgress(){
    var total = D.steps.length;
    var done = D.steps.filter(function(s){ return state.done[s.id]; }).length;
    var c = 2 * Math.PI * 19;
    $("#ringFg").setAttribute("stroke-dasharray", (c * done / total).toFixed(1) + " " + c.toFixed(1));
    $("#ringTxt").textContent = done + " / " + total;
  }

  /* ---------- rules ---------- */
  function renderRules(){
    $("#rules").innerHTML = D.rules.map(function(r){
      return "<div class='rule" + (r.icon === "stop" ? " stop" : "") + "'><div class='ic'>" + ICONS[r.icon] + "</div>" +
        "<div><b class='t'>" + esc(r.title) + "</b><p>" + fill(r.text) + "</p></div></div>";
    }).join("");
  }

  /* ---------- rail ---------- */
  function renderRail(){
    $("#railList").innerHTML = D.phases.map(function(p){
      var steps = D.steps.filter(function(s){ return s.phase === p.id; });
      var done = steps.filter(function(s){ return state.done[s.id]; }).length;
      return "<div class='ph' data-ph='" + p.id + "'><div class='ph-h'><span class='ph-no'>" + p.no + "</span>" +
        "<span class='ph-t'>" + esc(p.title) + "</span><span class='ph-c'>" + done + "/" + steps.length + "</span></div>" +
        steps.map(function(s){
          return "<button type='button' class='st" + (state.done[s.id] ? " done" : "") + (s.id === state.cur ? " cur" : "") +
            "' data-go='" + s.id + "'><span class='n'>" + labels[s.id] + "</span><span class='l'>" + esc(s.title) +
            "</span><span class='d' aria-hidden='true'></span></button>";
        }).join("") + "</div>";
    }).join("");
    $("#railToggleTxt").textContent = labels[state.cur] + " · " + stepById(state.cur).title;
    applySearch();
  }
  function stepById(id){ return D.steps[stepIndex[id]] || D.steps[0]; }

  function searchText(s){
    return [s.title, s.lead, s.code, s.hk, s.layout, s.where, (s.how || []).join(" "), s.check, s.stop, s.tip, s.note,
      (s.imgs || []).map(function(i){ return i.cap; }).join(" "), phaseById[s.phase].title, labels[s.id]]
      .map(strip).join(" ").toLowerCase();
  }
  function applySearch(){
    var q = $("#q").value.trim().toLowerCase();
    var terms = q ? q.split(/\s+/) : [];
    var any = false;
    $$(".st", $("#railList")).forEach(function(b){
      var s = stepById(b.getAttribute("data-go"));
      var hay = searchText(s);
      var hit = terms.every(function(t){ return hay.indexOf(t) !== -1; });
      b.classList.toggle("hide", !hit);
      if(hit) any = true;
    });
    $$(".ph", $("#railList")).forEach(function(ph){
      ph.style.display = $$(".st:not(.hide)", ph).length ? "" : "none";
    });
    $("#railEmpty").style.display = any ? "none" : "block";
  }

  /* ---------- step card ---------- */
  var galleryPos = {};

  function chip(cls, html, attrs){ return "<span class='chip " + cls + "'" + (attrs || "") + ">" + html + "</span>"; }

  function renderStep(s){
    var i = stepIndex[s.id];
    var ph = phaseById[s.phase];
    var done = !!state.done[s.id];
    var meta = [];
    if(s.code) meta.push(chip("code", esc(s.code), " role='button' tabindex='0' data-copy='" + esc(s.code) + "' title='Click to copy'"));
    if(s.date === "business") meta.push(chip("d-business", "Date: <b>business " + de(state.biz) + "</b>"));
    if(s.date === "current") meta.push(chip("d-current", "Date: <b>current " + de(addDays(state.biz, 1)) + "</b>"));
    if(s.code || s.hk){
      meta.push(s.layout ? chip("layout", "Layout <b>" + esc(s.layout) + "</b>") : (s.out && s.phase === "reports" ? chip("", "No layout") : ""));
    }
    if(s.out) meta.push(chip("", "Output <b>" + esc(s.out) + "</b>"));
    if(s.hk) meta.push(chip("", "hotelkit: <b>" + esc(s.hk) + "</b>"));
    meta = meta.filter(Boolean);

    var imgs = s.imgs || [];
    var gp = Math.min(galleryPos[s.id] || 0, Math.max(imgs.length - 1, 0));
    var left = (s.where ? "<div class='where'>Where: " + s.where + "</div>" : "") +
      "<ol class='how'>" + (s.how || []).map(function(h){ return "<li><div>" + fill(h) + "</div></li>"; }).join("") + "</ol>" +
      (s.errors ? errorTable() : "") +
      (s.check ? "<div class='box check'><span class='bt'>Check</span>" + fill(s.check) + "</div>" : "") +
      (s.tip ? "<div class='box tip'><span class='bt'>Tip</span>" + fill(s.tip) + "</div>" : "") +
      (s.stop ? "<div class='box stop'><span class='bt'>Stop / watch out</span>" + fill(s.stop) + "</div>" : "") +
      (s.note ? "<div class='box note'><span class='bt'>Note</span>" + fill(s.note) + "</div>" : "");

    var right = "";
    if(imgs.length){
      var m = imgs[gp];
      right = "<figure class='gal-main'><button type='button' class='imgbtn' data-zoom='" + s.id + "' aria-label='Enlarge screenshot'>" +
        "<img src='" + IMG + m.src + "' alt='" + esc(strip(m.cap)) + "' loading='lazy' decoding='async'>" +
        "<span class='zoomhint'>Click to enlarge</span></button>" +
        "<figcaption><span class='fn'>Fig. " + (gp + 1) + "/" + imgs.length + "</span><span>" + m.cap +
        (m.ref ? "<span class='refflag'>sister hotel</span>" : "") + "</span></figcaption></figure>" +
        (imgs.length > 1 ? "<div class='thumbs'>" + imgs.map(function(im, k){
          return "<button type='button' class='thumb' data-thumb='" + s.id + "' data-k='" + k + "' aria-pressed='" + (k === gp) +
            "' aria-label='Screenshot " + (k + 1) + "'><img src='" + IMG + im.src + "' alt='' loading='lazy' decoding='async'><span>" + (k + 1) + "</span></button>";
        }).join("") + "</div>" : "") +
        "<div class='gal-extra'>" + imgs.map(function(im, k){
          return k === gp ? "" : "<figure class='gal-main' style='margin-top:10px'><img src='" + IMG + im.src + "' alt='' loading='lazy'><figcaption><span class='fn'>Fig. " + (k + 1) + "</span><span>" + im.cap + "</span></figcaption></figure>";
        }).join("") + "</div>";
    }

    var prev = D.steps[i - 1], next = D.steps[i + 1];
    return "<article class='step" + (done ? " is-done" : "") + "' id='s-" + s.id + "' data-step='" + s.id + "'>" +
      "<div class='step-head'><div class='step-badge'>" + labels[s.id] + "</div>" +
      "<div class='step-titles'><div class='step-ph'>" + ph.no + " · " + esc(ph.title) + "</div><h2>" + esc(s.title) + "</h2>" +
      (s.lead ? "<p class='step-lead'>" + fill(s.lead) + "</p>" : "") + "</div>" +
      "<button type='button' class='donebtn' data-done='" + s.id + "' aria-pressed='" + done + "'><span class='box'></span><span class='lbl'>" +
      (done ? "Done " + esc(state.done[s.id]) : "Mark done") + "</span></button></div>" +
      (meta.length ? "<div class='meta'>" + meta.join("") + "</div>" : "") +
      "<div class='step-body" + (imgs.length ? "" : " noimg") + "'><div>" + left + "</div>" + (right ? "<div>" + right + "</div>" : "") + "</div>" +
      (state.mode === "one" ? "<div class='step-foot'>" +
        "<button type='button' class='ghost' data-go='" + (prev ? prev.id : "") + "'" + (prev ? "" : " disabled") + ">← " + (prev ? labels[prev.id] : "Back") + "</button>" +
        "<span class='mid'>Step " + (i + 1) + " of " + D.steps.length + "</span>" +
        (next ? "<button type='button' class='primary' data-donenext='" + s.id + "'>" + (done ? "Next" : "Done") + " → " + labels[next.id] + "</button>"
              : "<button type='button' class='primary' data-donenext='" + s.id + "'>" + (done ? "Finished" : "Done — finish") + "</button>") +
        "</div>" : "") +
      "</article>";
  }

  function errorTable(){
    return "<table class='errtbl'><thead><tr><th>Error line</th><th>What to do</th></tr></thead><tbody>" +
      D.errors.map(function(e){
        return "<tr><td>" + esc(e.msg) + "</td><td>" + esc(e.fix) + " — <button type='button' class='linkbtn' data-go='" + e.step + "'>step " + labels[e.step] + "</button></td></tr>";
      }).join("") + "</tbody></table>";
  }

  function renderStage(){
    var html;
    if(state.mode === "one"){
      html = renderStep(stepById(state.cur));
    } else {
      html = D.phases.map(function(p){
        return "<div class='phase-head'><span class='ph-no'>" + p.no + "</span><h3>" + esc(p.title) + "</h3><span>" + esc(p.sub) + "</span></div>" +
          D.steps.filter(function(s){ return s.phase === p.id; }).map(renderStep).join("");
      }).join("");
    }
    $("#stage").innerHTML = html;
  }

  // In "All steps" mode the rail follows the step being read.
  var spyQueued = false;
  function spyStep(){
    spyQueued = false;
    if(state.mode !== "all" || state.view !== "guide") return;
    var cards = $$(".step", $("#stage")), id = null;
    for(var k = 0; k < cards.length; k++){
      if(cards[k].getBoundingClientRect().top <= 140) id = cards[k].getAttribute("data-step"); else break;
    }
    id = id || (cards[0] && cards[0].getAttribute("data-step"));
    if(!id || id === state.cur) return;
    state.cur = id; saveUi();
    $$(".st", $("#railList")).forEach(function(b){ b.classList.toggle("cur", b.getAttribute("data-go") === id); });
    $("#railToggleTxt").textContent = labels[id] + " · " + stepById(id).title;
  }
  window.addEventListener("scroll", function(){
    if(!spyQueued){ spyQueued = true; window.requestAnimationFrame(spyStep); }
  }, { passive: true });

  function renderAll(){
    paintDates(); paintProgress(); renderRules(); renderRail(); renderStage();
    renderQuick(); renderTrouble();
  }

  /* ---------- quick reference ---------- */
  function renderQuick(){
    var rows = D.steps.filter(function(s){ return s.phase === "reports" && (s.code || s.hk) && s.id !== "attach"; });
    $("#quickTbl").innerHTML = "<thead><tr><th>#</th><th>Report</th><th>SAP code</th><th>Date to type</th><th>Layout</th><th>Output</th><th>hotelkit item</th></tr></thead><tbody>" +
      rows.map(function(s){
        var date = s.date === "business" ? "<span class='dt b'>" + de(state.biz) + "</span> <span class='muted'>business</span>" :
                   s.date === "current" ? "<span class='dt c'>" + de(addDays(state.biz, 1)) + "</span> <span class='muted'>current</span>" : "<span class='muted'>—</span>";
        return "<tr><td class='num'>" + labels[s.id] + "</td>" +
          "<td><button type='button' class='linkbtn rname' data-open='" + s.id + "'>" + esc(s.title) + "</button></td>" +
          "<td>" + (s.code ? "<span class='chip code' role='button' tabindex='0' data-copy='" + esc(s.code) + "'>" + esc(s.code) + "</span>" : "<span class='muted'>—</span>") + "</td>" +
          "<td>" + date + "</td>" +
          "<td>" + (s.layout ? "<span class='chip layout'><b>" + esc(s.layout) + "</b></span>" : "<span class='muted'>none</span>") + "</td>" +
          "<td>" + esc(s.out || "—") + "</td><td>" + esc(s.hk || "—") + "</td></tr>";
      }).join("") + "</tbody>";
  }

  /* ---------- troubleshooting and references ---------- */
  function renderTrouble(){
    $("#errTbl2").innerHTML = errorTable().replace(/^<table class='errtbl'>|<\/table>$/g, "");
    $("#troubleList").innerHTML = D.troubles.map(function(t){
      return "<details class='tr'><summary>" + esc(t.q) + "</summary><div class='ans'>" + fill(t.a) +
        (t.img ? "<img src='" + IMG + t.img + "' alt='' loading='lazy' data-single='" + t.img + "' data-cap='" + esc(t.q) + "'>" : "") + "</div></details>";
    }).join("");
  }
  function renderRefs(){
    $("#refGrid").innerHTML = D.refs.map(function(r, k){
      return "<button type='button' class='refcard' data-ref='" + k + "'><img src='" + IMG + r.src + "' alt='' loading='lazy' decoding='async'>" +
        "<div><b>" + esc(r.title) + "</b><span>" + esc(r.text) + "</span></div></button>";
    }).join("");
  }

  /* ---------- navigation ---------- */
  function go(id, opts){
    if(!id || stepIndex[id] == null) return;
    state.cur = id; saveUi();
    showView("guide", true);
    if(state.mode === "one"){
      renderStage();
      if(!(opts && opts.noScroll)){
        var top = $("#stage").getBoundingClientRect().top + window.pageYOffset - 70;
        if(window.pageYOffset > top) window.scrollTo({ top: top, behavior: "smooth" });
      }
    } else {
      var el = document.getElementById("s-" + id);
      if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    $$(".st", $("#railList")).forEach(function(b){ b.classList.toggle("cur", b.getAttribute("data-go") === id); });
    $("#railToggleTxt").textContent = labels[id] + " · " + stepById(id).title;
    $("#rail").classList.remove("open");
    $("#railToggle").setAttribute("aria-expanded", "false");
    setHash("#" + id);
  }
  function setHash(h){
    try { history.replaceState(null, "", location.pathname + location.search + h); } catch(e){}
  }

  function showView(name, quiet){
    state.view = name;
    $$(".tab").forEach(function(t){ t.setAttribute("aria-selected", String(t.getAttribute("data-view") === name)); });
    $$(".view").forEach(function(v){ v.classList.toggle("on", v.id === "view-" + name); });
    if(name === "refs" && !$("#refGrid").children.length) renderRefs();
    if(!quiet) setHash(name === "guide" ? "#" + state.cur : "#view=" + name);
  }

  function setMode(mode){
    state.mode = mode; saveUi();
    $$(".seg button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode)); });
    renderStage();
    if(mode === "all") go(state.cur);
  }

  function toggleDone(id, force){
    var on = force != null ? force : !state.done[id];
    if(on){ var n = new Date(); state.done[id] = pad(n.getHours()) + ":" + pad(n.getMinutes()); }
    else delete state.done[id];
    saveNight();
    paintProgress();
    renderRail();
    replaceCard(id);
  }
  function replaceCard(id){
    var card = document.getElementById("s-" + id);
    if(!card) return;
    var tmp = document.createElement("div");
    tmp.innerHTML = renderStep(stepById(id));
    var fresh = tmp.firstChild;
    card.parentNode.replaceChild(fresh, card);
  }

  /* ---------- lightbox ---------- */
  var lb = { list: [], k: 0 };
  function openLb(list, k){
    lb.list = list; lb.k = k;
    $("#lb").classList.add("on");
    paintLb();
    $("#lbClose").focus();
  }
  function paintLb(){
    var it = lb.list[lb.k];
    $("#lbImg").src = IMG + it.src;
    $("#lbImg").alt = strip(it.cap);
    $("#lbCap").innerHTML = (lb.list.length > 1 ? "<b>" + (lb.k + 1) + "/" + lb.list.length + "</b> · " : "") + it.cap;
    $("#lbPrev").style.visibility = lb.list.length > 1 ? "visible" : "hidden";
    $("#lbNext").style.visibility = lb.list.length > 1 ? "visible" : "hidden";
  }
  function closeLb(){ $("#lb").classList.remove("on"); $("#lbImg").removeAttribute("src"); }
  function stepLb(d){ lb.k = (lb.k + d + lb.list.length) % lb.list.length; paintLb(); }

  /* ---------- copy ---------- */
  function copy(text, el){
    function ok(){
      toast("Copied " + text);
      if(el){ el.classList.add("copied"); setTimeout(function(){ el.classList.remove("copied"); }, 1200); }
    }
    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(text).then(ok, function(){ fallbackCopy(text) && ok(); });
    } else if(fallbackCopy(text)) ok();
  }
  function fallbackCopy(text){
    var t = document.createElement("textarea");
    t.value = text; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    var ok = false; try { ok = document.execCommand("copy"); } catch(e){}
    document.body.removeChild(t);
    return ok;
  }
  var toastTimer;
  function toast(msg){
    var t = $("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(toastTimer); toastTimer = setTimeout(function(){ t.classList.remove("on"); }, 1500);
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function(e){
    var t;
    if((t = e.target.closest("[data-copy]"))){ copy(t.getAttribute("data-copy"), t); return; }
    if((t = e.target.closest("[data-go]"))){ if(!t.disabled) go(t.getAttribute("data-go")); return; }
    if((t = e.target.closest("[data-open]"))){ go(t.getAttribute("data-open")); return; }
    if((t = e.target.closest("[data-done]"))){ toggleDone(t.getAttribute("data-done")); return; }
    if((t = e.target.closest("[data-donenext]"))){
      var id = t.getAttribute("data-donenext");
      if(!state.done[id]) toggleDone(id, true);
      var nx = D.steps[stepIndex[id] + 1];
      if(nx) go(nx.id); else toast("Night Audit guide completed");
      return;
    }
    if((t = e.target.closest("[data-thumb]"))){
      galleryPos[t.getAttribute("data-thumb")] = +t.getAttribute("data-k");
      replaceCard(t.getAttribute("data-thumb"));
      return;
    }
    if((t = e.target.closest("[data-zoom]"))){
      var sid = t.getAttribute("data-zoom");
      openLb(stepById(sid).imgs, galleryPos[sid] || 0); return;
    }
    if((t = e.target.closest("[data-ref]"))){
      openLb(D.refs.map(function(r){ return { src: r.src, cap: "<b>" + esc(r.title) + "</b> — " + esc(r.text) + " <span class='refflag'>sister hotel</span>" }; }), +t.getAttribute("data-ref"));
      return;
    }
    if((t = e.target.closest("[data-single]"))){
      openLb([{ src: t.getAttribute("data-single"), cap: esc(t.getAttribute("data-cap")) }], 0); return;
    }
    if((t = e.target.closest(".tab"))){ showView(t.getAttribute("data-view")); return; }
    if((t = e.target.closest("[data-mode]"))){ setMode(t.getAttribute("data-mode")); return; }
  });
  document.addEventListener("keydown", function(e){
    var t = e.target.closest && e.target.closest("[data-copy]");
    if(t && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); copy(t.getAttribute("data-copy"), t); return; }
    if($("#lb").classList.contains("on")){
      if(e.key === "Escape") closeLb();
      else if(e.key === "ArrowRight") stepLb(1);
      else if(e.key === "ArrowLeft") stepLb(-1);
      return;
    }
    if(state.view === "guide" && state.mode === "one" && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.altKey && !e.ctrlKey && !e.metaKey){
      var i = stepIndex[state.cur];
      if(e.key === "ArrowRight" && D.steps[i + 1]) go(D.steps[i + 1].id, { noScroll: true });
      if(e.key === "ArrowLeft" && D.steps[i - 1]) go(D.steps[i - 1].id, { noScroll: true });
    }
  });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", function(){ stepLb(-1); });
  $("#lbNext").addEventListener("click", function(){ stepLb(1); });
  $("#lb").addEventListener("click", function(e){ if(e.target === this || e.target.classList.contains("lb-stage")) closeLb(); });

  $("#q").addEventListener("input", applySearch);
  $("#q").addEventListener("keydown", function(e){
    if(e.key === "Enter"){ var first = $(".st:not(.hide)", $("#railList")); if(first) go(first.getAttribute("data-go")); }
  });
  $("#railToggle").addEventListener("click", function(){
    var open = $("#rail").classList.toggle("open");
    this.setAttribute("aria-expanded", String(open));
  });
  $("#bizDate").addEventListener("change", function(){
    var d = fromIso(this.value);
    if(!d){ paintDates(); return; }
    state.biz = d; loadNight(); renderAll();
  });
  $("#resetBtn").addEventListener("click", function(){
    if(!confirm("Clear all ticks for business date " + de(state.biz) + "?")) return;
    state.done = {}; saveNight(); renderAll();
  });
  $("#printBtn").addEventListener("click", function(){
    var prevMode = state.mode, prevView = state.view;
    document.body.classList.add("print-all");
    state.mode = "all"; renderStage(); showView("guide", true);
    // Lazy images must be loaded before the print dialog snapshots the page.
    $$("#stage img").forEach(function(im){ im.loading = "eager"; });
    setTimeout(function(){
      window.print();
      document.body.classList.remove("print-all");
      state.mode = prevMode; renderStage(); showView(prevView, true);
    }, 400);
  });
  window.addEventListener("hashchange", readHash);

  function readHash(){
    var h = decodeURIComponent(location.hash.replace(/^#/, ""));
    if(!h) return;
    var m = /^view=(\w+)$/.exec(h);
    if(m && $("#view-" + m[1])){ showView(m[1], true); return; }
    if(stepIndex[h] != null){ state.cur = h; showView("guide", true); if(state.mode === "one") renderStage(); else go(h); renderRail(); }
  }

  (function rulesState(){
    var box = $("#rulesBox");
    var pref = load("nag:rules:v1", null);
    // Closed by default on phones and inside Front Desk Control so the current step is visible first.
    box.open = pref == null ? (window.innerWidth > 860 && window.self === window.top) : !!pref;
    box.addEventListener("toggle", function(){ save("nag:rules:v1", box.open); });
  })();

  /* ---------- boot ---------- */
  if(window.self !== window.top) document.body.classList.add("embedded");
  if(stepIndex[state.cur] == null) state.cur = D.steps[0].id;
  $$(".seg button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === state.mode)); });
  loadNight();
  renderAll();
  readHash();
})();
