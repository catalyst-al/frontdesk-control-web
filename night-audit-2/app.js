/* Night Audit 2.0 — behaviour.
   Everything runs locally; the page makes no network calls. Stored in this browser only:
   the display choice (one step / all steps, last step open) and the ticks of the current
   night. A night runs from 12:00 to 12:00 the next day, so every tick made between those
   hours belongs to the same business date; "Reset night" clears them. */
(function(){
  "use strict";
  var D = window.NA2;
  if(!D) return;

  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var IMG = "img/";
  var KEY_UI = "na2:ui:v1";
  var KEY_DONE = "na2:done:v1";

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

  /* ---------- business night ---------- */
  // The night of business date B runs from B 12:00 to B+1 12:00. ?date=YYYY-MM-DD overrides it
  // (Front Desk Control passes its business date that way).
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function nightKey(){
    var m = /[?&]date=(\d{4}-\d{2}-\d{2})/.exec(location.search);
    if(m) return m[1];
    var d = new Date(Date.now() - 12 * 3600 * 1000);
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  var NIGHT = nightKey();
  function nightLabel(){
    var p = NIGHT.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return "Night of " + days[d.getDay()] + " " + p[2] + "." + p[1] + "." + p[0];
  }
  var doneStore = load(KEY_DONE, {}) || {};
  if(doneStore.night !== NIGHT) doneStore = { night: NIGHT, steps: {} };
  function isDone(id){ return !!(doneStore.steps && doneStore.steps[id]); }
  function setDone(id, on){
    doneStore.steps = doneStore.steps || {};
    if(on) doneStore.steps[id] = 1; else delete doneStore.steps[id];
    save(KEY_DONE, doneStore);
  }
  function resetNight(){
    doneStore = { night: NIGHT, steps: {} };
    save(KEY_DONE, doneStore);
  }

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
  var procByStep = {};
  (D.processes || []).forEach(function(p){ procByStep[p.step] = p; });

  var ICONS = {
    list: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='5' cy='6' r='2'/><circle cx='5' cy='12' r='2'/><circle cx='5' cy='18' r='2'/><path d='M11 6h10M11 12h10M11 18h10'/></svg>",
    cursor: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='8' height='8' rx='2'/><path d='m5 7 2 2 3-4'/><path d='M13 14l7 3-3 1-1 3z'/><path d='M3 15h6M3 19h6'/></svg>",
    link: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1'/><path d='M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1'/></svg>",
    stop: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7.9 2h8.2L22 7.9v8.2L16.1 22H7.9L2 16.1V7.9z'/><path d='M12 8v4M12 16h.01'/></svg>"
  };

  /* ---------- progress ---------- */
  function paintProgress(){
    var total = D.steps.length, n = 0;
    D.steps.forEach(function(s){ if(isDone(s.id)) n++; });
    $("#nightLabel").textContent = nightLabel();
    $("#nightPct").textContent = n + " / " + total;
    $("#nightFill").style.width = (total ? Math.round(n / total * 100) : 0) + "%";
  }

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
          return "<button type='button' class='st" + (s.id === state.cur ? " cur" : "") + (isDone(s.id) ? " done" : "") +
            "' data-go='" + s.id + "'><span class='n'>" + labels[s.id] + "</span><span class='l'><span class='tick' aria-hidden='true'>✓</span>" + esc(s.title) + "</span></button>";
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

  function kindBadge(s){
    var p = procByStep[s.id];
    if(!p) return "";
    if(p.group === "Optional") return "<span class='kind opt'>Optional · report</span>";
    return p.actions.length ? "<span class='kind act'>Actions in the app</span>" : "<span class='kind info'>Informative · solve in TMS</span>";
  }

  function renderStep(s){
    var i = stepIndex[s.id];
    var ph = phaseById[s.phase];
    var imgs = s.imgs || [];
    var gp = Math.min(galleryPos[s.id] || 0, Math.max(imgs.length - 1, 0));
    var done = isDone(s.id);
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
    var doneBtn = "<button type='button' class='donebtn' data-done='" + s.id + "' aria-pressed='" + done + "'><span class='bx' aria-hidden='true'>✓</span>" + (done ? "Done tonight" : "Mark as done") + "</button>";
    return "<article class='step" + (done ? " is-done" : "") + "' id='s-" + s.id + "' data-step='" + s.id + "'>" +
      "<div class='step-head'><div class='step-badge'>" + (done ? "✓" : labels[s.id]) + "</div>" +
      "<div class='step-titles'><div class='step-ph'>" + ph.no + " · " + esc(ph.title) + "</div><h2>" + esc(s.title) + "</h2>" +
      (s.lead ? "<p class='step-lead'>" + s.lead + "</p>" : "") + "</div>" + kindBadge(s) + "</div>" +
      "<div class='step-body" + (imgs.length ? "" : " noimg") + "'><div>" + left + "</div>" + (right ? "<div>" + right + "</div>" : "") + "</div>" +
      "<div class='step-foot'>" +
        (state.mode === "one"
          ? "<button type='button' class='ghost' data-go='" + (prev ? prev.id : "") + "'" + (prev ? "" : " disabled") + ">← " + (prev ? labels[prev.id] : "Back") + "</button>"
          : "<span></span>") +
        "<span class='mid'>" + doneBtn + "</span>" +
        (state.mode === "one"
          ? (next ? "<button type='button' class='primary' data-go='" + next.id + "'>Next → " + labels[next.id] + "</button>"
                  : "<span class='more'>End of the guide</span>")
          : "<span class='more'>Step " + (i + 1) + " of " + D.steps.length + "</span>") +
      "</div>" +
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
      }).join("") + "<p class='more-all'>End of the guide.</p>";
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

  /* ---------- processes table and questions ---------- */
  function renderProcesses(){
    $("#procTbl").innerHTML = "<thead><tr><th>#</th><th>Process</th><th>Group</th><th>Actions in the Night Audit app</th><th>Where it is solved</th><th></th></tr></thead><tbody>" +
      (D.processes || []).map(function(p){
        var acts = p.actions.length ? "<ul>" + p.actions.map(function(a){ return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" : "<span class='none'>No action in the app — informative only</span>";
        return "<tr><td class='no'>" + p.no + "</td><td><b>" + esc(p.name) + "</b></td>" +
          "<td><span class='grp " + (p.group === "Optional" ? "o" : "m") + "'>" + esc(p.group) + "</span></td>" +
          "<td>" + acts + "</td><td>" + esc(p.where) + "</td>" +
          "<td><button type='button' class='linkbtn' data-go='" + p.step + "'>Step " + labels[p.step] + "</button></td></tr>";
      }).join("") + "</tbody>";
  }
  function renderFaq(){
    $("#faqList").innerHTML = (D.faq || []).map(function(c){
      return "<details class='tr'><summary>" + esc(c.q) + "</summary><div class='ans'>" + c.a + "</div></details>";
    }).join("");
  }

  /* ---------- Visual SOP ---------- */
  function isChecked(id){ return !!(doneStore.checks && doneStore.checks[id]); }
  function setChecked(id, on){
    doneStore.checks = doneStore.checks || {};
    if(on) doneStore.checks[id] = 1; else delete doneStore.checks[id];
    save(KEY_DONE, doneStore);
  }
  function renderVisual(){
    var V = D.visual, host = $("#visual");
    if(!V || !host) return;
    var quick = V.pages.map(function(p){
      return "<button type='button' class='vs-q " + (p.kind === "action" ? "act" : "info") + "' data-vs='" + p.no + "'><span class='n'>" + (p.no < 10 ? "0" : "") + p.no + "</span><span><b>" + esc(p.title) + "</b><span>" + (p.kind === "action" ? "Action available" : "Information only") + "</span></span></button>";
    }).join("");
    var pages = V.pages.map(function(p){
      var shot;
      if(p.img){
        shot = "<div class='vs-shot'><div class='lab'>Original screenshot from SOP · sample data anonymized</div><div class='vs-shot-grid" + (p.zoom ? "" : " one") + "'>" +
          "<button type='button' data-vsimg='" + p.no + "' data-k='0' aria-label='Enlarge screenshot'><img src='" + IMG + p.img + "' alt='" + esc(p.title) + "' loading='lazy' decoding='async'></button>" +
          (p.zoom ? "<div class='vs-zoom'><button type='button' data-vsimg='" + p.no + "' data-k='1' aria-label='Enlarge the Actions menu'><img src='" + IMG + p.zoom + "' alt='Actions menu' loading='lazy' decoding='async'></button><div class='lab'>Actions menu · enlarged</div></div>" : "") +
          "</div></div>";
      } else {
        shot = "<div class='vs-shot'><div class='lab'>Illustrative workflow · no screenshot in the source SOP</div><div class='vs-flow'>" +
          p.flow.map(function(f, k){ return (k ? "<span class='arr' aria-hidden='true'>&rsaquo;</span>" : "") + "<div class='box'><b>" + esc(f[0]) + "</b><span>" + esc(f[1]) + "</span></div>"; }).join("") +
          "</div></div>";
      }
      return "<article class='vs-page' id='vs-" + p.no + "'>" +
        "<div class='vs-page-h'><span class='no'>" + (p.no < 10 ? "0" : "") + p.no + " / 13</span><div><h3>" + esc(p.title) + "</h3><p>" + esc(p.sub) + "</p></div>" +
        "<span class='vs-badge " + (p.kind === "action" ? "act" : "info") + "'>" + (p.kind === "action" ? "Action in NA app" : "Information only") + "</span></div>" +
        shot +
        "<div class='vs-page-body'><div class='vs-steps'><span class='bt'>Steps / what to do</span><ul>" + p.steps.map(function(t){ return "<li>" + t + "</li>"; }).join("") + "</ul></div>" +
        "<div class='vs-check " + p.checkKind + "'><span class='bt'>Check / important</span>" + p.check + "</div></div>" +
        "<div class='vs-page-f'><span>DEFRAAIR · internal operational reference · EMMA v2 visual guide</span><span>" + esc(p.src) + " · <button type='button' class='linkbtn' data-go='" + p.step + "'>Step " + labels[p.step] + " in this guide</button></span></div>" +
        "</article>";
    }).join("");
    var checks = V.checklist.items.map(function(c){
      return "<button type='button' class='vs-item" + (isChecked(c.id) ? " on" : "") + "' data-vscheck='" + c.id + "' aria-pressed='" + isChecked(c.id) + "'><span class='bx' aria-hidden='true'>✓</span><span><b>" + esc(c.title) + "</b><span>" + esc(c.text) + "</span></span></button>";
    }).join("");
    host.innerHTML =
      "<div class='vs-cover'><div class='vs-cover-top'><span>" + esc(V.eyebrow) + "</span><span>EMMA v2 (Fiori) / Night Audit</span></div><div class='vs-strip'></div><div class='vs-cover-body'>" +
        "<h2>" + esc(V.title) + "</h2><p class='sub'>" + esc(V.sub) + "</p>" +
        "<div class='vs-count'><b>" + V.count.n + "</b><div><div class='t'>" + esc(V.count.title) + "</div><div class='l'>" + esc(V.count.line) + "</div></div></div>" +
        "<div class='vs-note'><span class='bt'>" + esc(V.confirms.title) + "</span><p>" + esc(V.confirms.lead) + "</p><p>" + esc(V.confirms.text) + "</p></div>" +
        "<div class='vs-foot'><span>Source: SOP New NA Functions (EMMA v2 Fiori, 5 pages) · Visual guide DEFRAAIR, 16 pages</span><span>Internal training reference · not a payment authorization</span></div>" +
      "</div></div>" +
      "<div class='vs-h'><h3>Quick reference / 13 processes</h3><p>Find the process in EMMA v2, identify the permitted action, then open the detailed page.</p></div>" +
      "<div class='vs-quick'>" + quick + "</div>" +
      "<div class='vs-safety'>" + V.safety + "</div>" +
      pages +
      "<div class='vs-h' style='margin-top:26px'><h3>" + esc(V.checklist.title) + "</h3><p>" + esc(V.checklist.sub) + " Ticks belong to tonight and clear with Reset night.</p></div>" +
      "<div class='vs-list'>" + checks + "</div>" +
      "<div class='vs-scope'>" + esc(V.checklist.scope) + "</div>" +
      "<div class='vs-foot'><span>DEFRAAIR · internal operational reference · EMMA v2 visual guide</span><button type='button' class='ghost' id='vsPrint'>Print the Visual SOP</button></div>";
  }
  function vsImgs(no){
    var p = null;
    (D.visual ? D.visual.pages : []).forEach(function(x){ if(x.no === no) p = x; });
    if(!p) return [];
    var list = [{ src: p.img, cap: "<b>" + (p.no < 10 ? "0" : "") + p.no + "</b> · " + esc(p.title) + " · original screenshot from the SOP, sample data anonymized" }];
    if(p.zoom) list.push({ src: p.zoom, cap: "<b>" + (p.no < 10 ? "0" : "") + p.no + "</b> · " + esc(p.title) + " · Actions menu, enlarged" });
    return list;
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

  function toggleDone(id){
    setDone(id, !isDone(id));
    replaceCard(id);
    $$(".st", $("#railList")).forEach(function(b){ if(b.getAttribute("data-go") === id) b.classList.toggle("done", isDone(id)); });
    paintProgress();
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
    if((t = e.target.closest("[data-done]"))){ toggleDone(t.getAttribute("data-done")); return; }
    if((t = e.target.closest("[data-vs]"))){ var pg = document.getElementById("vs-" + t.getAttribute("data-vs")); if(pg) pg.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if((t = e.target.closest("[data-vsimg]"))){ openLb(vsImgs(+t.getAttribute("data-vsimg")), +t.getAttribute("data-k")); return; }
    if((t = e.target.closest("[data-vscheck]"))){ var cid = t.getAttribute("data-vscheck"); setChecked(cid, !isChecked(cid)); t.classList.toggle("on", isChecked(cid)); t.setAttribute("aria-pressed", String(isChecked(cid))); return; }
    if((t = e.target.closest("#vsPrint"))){
      document.body.classList.add("print-visual"); showView("visual", true);
      $$("#visual img").forEach(function(im){ im.loading = "eager"; });
      setTimeout(function(){ window.print(); document.body.classList.remove("print-visual"); }, 400);
      return;
    }
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
    // Ctrl+P prints every step, the same as the Print button.
    if((e.ctrlKey || e.metaKey) && !e.altKey && String(e.key).toLowerCase() === "p"){ e.preventDefault(); if(state.view === "visual" && $("#vsPrint")) $("#vsPrint").click(); else $("#printBtn").click(); return; }
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
  $("#resetBtn").addEventListener("click", function(){
    if(!window.confirm("Clear every tick of " + nightLabel() + "?")) return;
    resetNight();
    renderRail(); renderStage(); renderVisual(); paintProgress();
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
    var pref = load("na2:rules:v1", null);
    // Closed by default on phones and inside Front Desk Control so the current step is visible first.
    box.open = pref == null ? (window.innerWidth > 860 && window.self === window.top) : !!pref;
    box.addEventListener("toggle", function(){ save("na2:rules:v1", box.open); });
  })();

  /* ---------- boot ---------- */
  if(window.self !== window.top) document.body.classList.add("embedded");
  if(stepIndex[state.cur] == null) state.cur = D.steps[0].id;
  $$(".seg button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === state.mode)); });
  renderRules(); renderRail(); renderStage(); renderProcesses(); renderFaq(); renderVisual(); paintProgress();
  readHash();
})();
