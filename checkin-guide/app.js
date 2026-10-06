/* Check-in Guide — behaviour.
   Everything runs locally. The only thing stored is the display choice (one step / all
   steps and the step last open) in this browser's localStorage. */
(function(){
  "use strict";
  var D = window.CIG;
  if(!D) return;

  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var IMG = "img/";
  var KEY_UI = "cig:ui:v1";

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

  /* ---------- state ---------- */
  var ui = load(KEY_UI, {}) || {};
  var state = {
    mode: ui.mode === "all" ? "all" : "one",
    cur: ui.cur || D.steps[0].id,
    view: "guide"
  };
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
  function stepById(id){ return D.steps[stepIndex[id]] || D.steps[0]; }

  var ICONS = {
    card: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='5' width='20' height='14' rx='2'/><path d='M2 10h20M6 15h4'/></svg>",
    cash: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='6' width='20' height='12' rx='2'/><circle cx='12' cy='12' r='2.5'/><path d='M6 12h.01M18 12h.01'/></svg>",
    form: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><path d='M14 2v6h6M8 13h8M8 17h5'/></svg>",
    stop: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7.9 2h8.2L22 7.9v8.2L16.1 22H7.9L2 16.1V7.9z'/><path d='M12 8v4M12 16h.01'/></svg>"
  };

  /* ---------- rules ---------- */
  function renderRules(){
    $("#rules").innerHTML = D.rules.map(function(r){
      return "<div class='rule" + (r.icon === "stop" ? " stop" : "") + "'><div class='ic'>" + ICONS[r.icon] + "</div>" +
        "<div><b class='t'>" + esc(r.title) + "</b><p>" + r.text + "</p></div></div>";
    }).join("");
  }

  /* ---------- rail ---------- */
  function renderRail(){
    $("#railList").innerHTML = D.phases.map(function(p){
      var steps = D.steps.filter(function(s){ return s.phase === p.id; });
      return "<div class='ph' data-ph='" + p.id + "'><div class='ph-h'><span class='ph-no'>" + p.no + "</span>" +
        "<span class='ph-t'>" + esc(p.title) + "</span><span class='ph-c'>" + steps.length + "</span></div>" +
        steps.map(function(s){
          return "<button type='button' class='st" + (s.id === state.cur ? " cur" : "") +
            "' data-go='" + s.id + "'><span class='n'>" + labels[s.id] + "</span><span class='l'>" + esc(s.title) + "</span></button>";
        }).join("") + "</div>";
    }).join("");
    $("#railToggleTxt").textContent = labels[state.cur] + " · " + stepById(state.cur).title;
    applySearch();
  }

  function searchText(s){
    return [s.title, s.lead, s.where, (s.how || []).join(" "), s.check, s.stop, s.tip, s.note,
      (s.imgs || []).map(function(i){ return i.cap; }).join(" "), phaseById[s.phase].title, labels[s.id]]
      .map(strip).join(" ").toLowerCase();
  }
  function applySearch(){
    var q = $("#q").value.trim().toLowerCase();
    var terms = q ? q.split(/\s+/) : [];
    var any = false;
    $$(".st", $("#railList")).forEach(function(b){
      var hay = searchText(stepById(b.getAttribute("data-go")));
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

  function renderStep(s){
    var i = stepIndex[s.id];
    var ph = phaseById[s.phase];
    var imgs = s.imgs || [];
    var gp = Math.min(galleryPos[s.id] || 0, Math.max(imgs.length - 1, 0));
    var left = (s.where ? "<div class='where'>Where: " + s.where + "</div>" : "") +
      "<ol class='how'>" + (s.how || []).map(function(h){ return "<li><div>" + h + "</div></li>"; }).join("") + "</ol>" +
      (s.check ? "<div class='box check'><span class='bt'>Check</span>" + s.check + "</div>" : "") +
      (s.tip ? "<div class='box tip'><span class='bt'>Tip</span>" + s.tip + "</div>" : "") +
      (s.stop ? "<div class='box stop'><span class='bt'>Watch out</span>" + s.stop + "</div>" : "") +
      (s.note ? "<div class='box note'><span class='bt'>Note</span>" + s.note + "</div>" : "");

    var right = "";
    if(imgs.length){
      var m = imgs[gp];
      right = "<figure class='gal-main'><button type='button' class='imgbtn' data-zoom='" + s.id + "' aria-label='Enlarge screenshot'>" +
        "<img src='" + IMG + m.src + "' alt='" + esc(strip(m.cap)) + "' loading='lazy' decoding='async'>" +
        "<span class='zoomhint'>Click to enlarge</span></button>" +
        "<figcaption><span class='fn'>Fig. " + (gp + 1) + "/" + imgs.length + "</span><span>" + m.cap + "</span></figcaption></figure>" +
        (imgs.length > 1 ? "<div class='thumbs'>" + imgs.map(function(im, k){
          return "<button type='button' class='thumb' data-thumb='" + s.id + "' data-k='" + k + "' aria-pressed='" + (k === gp) +
            "' aria-label='Screenshot " + (k + 1) + "'><img src='" + IMG + im.src + "' alt='' loading='lazy' decoding='async'><span>" + (k + 1) + "</span></button>";
        }).join("") + "</div>" : "") +
        "<div class='gal-extra'>" + imgs.map(function(im, k){
          return k === gp ? "" : "<figure class='gal-main' style='margin-top:10px'><img src='" + IMG + im.src + "' alt='' loading='lazy'><figcaption><span class='fn'>Fig. " + (k + 1) + "</span><span>" + im.cap + "</span></figcaption></figure>";
        }).join("") + "</div>";
    }

    var prev = D.steps[i - 1], next = D.steps[i + 1];
    return "<article class='step' id='s-" + s.id + "' data-step='" + s.id + "'>" +
      "<div class='step-head'><div class='step-badge'>" + labels[s.id] + "</div>" +
      "<div class='step-titles'><div class='step-ph'>" + ph.no + " · " + esc(ph.title) + "</div><h2>" + esc(s.title) + "</h2>" +
      (s.lead ? "<p class='step-lead'>" + s.lead + "</p>" : "") + "</div></div>" +
      "<div class='step-body" + (imgs.length ? "" : " noimg") + "'><div>" + left + "</div>" + (right ? "<div>" + right + "</div>" : "") + "</div>" +
      (state.mode === "one" ? "<div class='step-foot'>" +
        "<button type='button' class='ghost' data-go='" + (prev ? prev.id : "") + "'" + (prev ? "" : " disabled") + ">← " + (prev ? labels[prev.id] : "Back") + "</button>" +
        "<span class='mid'>Step " + (i + 1) + " of " + D.steps.length + "</span>" +
        (next ? "<button type='button' class='primary' data-go='" + next.id + "'>Next → " + labels[next.id] + "</button>"
              : "<span class='more'>More steps coming</span>") +
        "</div>" : "") +
      "</article>";
  }

  function renderStage(){
    var html;
    if(state.mode === "one"){
      html = renderStep(stepById(state.cur));
    } else {
      html = D.phases.map(function(p){
        return "<div class='phase-head'><span class='ph-no'>" + p.no + "</span><h3>" + esc(p.title) + "</h3><span>" + esc(p.sub) + "</span></div>" +
          D.steps.filter(function(s){ return s.phase === p.id; }).map(renderStep).join("");
      }).join("") + "<p class='more-all'>More steps coming.</p>";
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

  /* ---------- special cases and phrases ---------- */
  function renderCases(){
    $("#caseList").innerHTML = D.cases.map(function(c){
      return "<details class='tr'><summary>" + esc(c.q) + "</summary><div class='ans'>" + c.a + "</div></details>";
    }).join("");
  }
  function renderPhrases(){
    $("#phraseTbl").innerHTML = "<thead><tr><th>When</th><th>Deutsch</th><th>English</th></tr></thead><tbody>" +
      D.phrases.map(function(p){
        return "<tr><td class='when'>" + esc(p.when) + "</td><td>" + esc(p.de) + "</td><td>" + esc(p.en) + "</td></tr>";
      }).join("") + "</tbody>";
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
    if(!quiet) setHash(name === "guide" ? "#" + state.cur : "#view=" + name);
  }

  function setMode(mode){
    state.mode = mode; saveUi();
    $$(".seg button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode)); });
    renderStage();
    if(mode === "all") go(state.cur);
  }

  function replaceCard(id){
    var card = document.getElementById("s-" + id);
    if(!card) return;
    var tmp = document.createElement("div");
    tmp.innerHTML = renderStep(stepById(id));
    card.parentNode.replaceChild(tmp.firstChild, card);
  }

  /* ---------- lightbox ---------- */
  var lb = { list: [], k: 0, back: null };
  function openLb(list, k){
    lb.list = list; lb.k = k; lb.back = document.activeElement;
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
  function closeLb(){
    $("#lb").classList.remove("on"); $("#lbImg").removeAttribute("src");
    if(lb.back && lb.back.focus) lb.back.focus();
  }
  function stepLb(d){ lb.k = (lb.k + d + lb.list.length) % lb.list.length; paintLb(); }

  /* ---------- events ---------- */
  document.addEventListener("click", function(e){
    var t;
    if((t = e.target.closest("[data-go]"))){ if(!t.disabled) go(t.getAttribute("data-go")); return; }
    if((t = e.target.closest("[data-thumb]"))){
      galleryPos[t.getAttribute("data-thumb")] = +t.getAttribute("data-k");
      replaceCard(t.getAttribute("data-thumb"));
      return;
    }
    if((t = e.target.closest("[data-zoom]"))){
      var sid = t.getAttribute("data-zoom");
      openLb(stepById(sid).imgs, galleryPos[sid] || 0); return;
    }
    if((t = e.target.closest(".tab"))){ showView(t.getAttribute("data-view")); return; }
    if((t = e.target.closest("[data-mode]"))){ setMode(t.getAttribute("data-mode")); return; }
  });
  document.addEventListener("keydown", function(e){
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
    if(stepIndex[h] != null){ state.cur = h; showView("guide", true); renderStage(); renderRail(); if(state.mode === "all") go(h); }
  }

  (function rulesState(){
    var box = $("#rulesBox");
    var pref = load("cig:rules:v1", null);
    // Closed by default on phones and inside Front Desk Control so the current step is visible first.
    box.open = pref == null ? (window.innerWidth > 860 && window.self === window.top) : !!pref;
    box.addEventListener("toggle", function(){ save("cig:rules:v1", box.open); });
  })();

  /* ---------- boot ---------- */
  if(window.self !== window.top) document.body.classList.add("embedded");
  if(stepIndex[state.cur] == null) state.cur = D.steps[0].id;
  $$(".seg button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === state.mode)); });
  renderRules(); renderRail(); renderStage(); renderCases(); renderPhrases();
  readHash();
})();
