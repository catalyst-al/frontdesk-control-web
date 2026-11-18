/* "Save PDF" for the SOP pages: the browser's own PDF printer writes the file, so this opens
   the print window with the file name already set (Chrome and Edge take it from the page
   title) and a short hint on which printer to choose. Used by checkin-guide/,
   night-audit-guide/, night-audit-2/ and the SAP guides in index.html. No network calls. */
(function(){
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function hint(text){
    var el = document.getElementById("sopPdfHint");
    if(!el){
      el = document.createElement("div"); el.id = "sopPdfHint"; el.setAttribute("role", "status");
      el.style.cssText = "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:2147483000;max-width:min(560px,calc(100vw - 32px));" +
        "background:#04234F;color:#fff;font:600 13px/1.45 system-ui,Segoe UI,Arial,sans-serif;padding:10px 14px;border-radius:10px;box-shadow:0 10px 30px rgba(4,35,79,.35)";
      var st = document.createElement("style"); st.textContent = "@media print{#sopPdfHint{display:none!important}}";
      document.head.appendChild(st); document.body.appendChild(el);
    }
    el.textContent = text; el.hidden = false;
    clearTimeout(hint.t); hint.t = setTimeout(function(){ el.hidden = true; }, 9000);
  }
  // name: file name without date, e.g. "SOP Check-in Check-out"; print: the page's own print routine.
  window.sopSavePdf = function(name, print){
    var d = new Date(), old = document.title;
    document.title = name + " " + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear();
    hint("In the print window choose “Save as PDF” (or “Microsoft Print to PDF”) as the printer, then Save.");
    var restore = function(){ document.title = old; window.removeEventListener("afterprint", restore); };
    window.addEventListener("afterprint", restore);
    setTimeout(restore, 60000);
    print();
  };
})();
