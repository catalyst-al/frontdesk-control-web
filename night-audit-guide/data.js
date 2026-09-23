/* Night Audit Guidebook — content.
   Source material: "Final Night Audit" (step screenshots, DEFRAAIR), "Night Audit" (same
   procedure, earlier version), the remote-support screen recording (Departures not billed)
   and the photographed "Nighty procedure Radisson" sheets (sister hotel, used as reference).

   Placeholders inside text: {B} = business date (the day being closed),
   {C} = current date (business date + 1). Both are filled in live by app.js.
   No guest names, reservation numbers, card data or passwords are stored here; all
   screenshots were redacted before being added. */
window.NAG = {

  phases: [
    { id: "prep",    no: "A", title: "Start of shift",             sub: "hotelkit, End of Day checklist, SAP" },
    { id: "reports", no: "B", title: "Reports before the audit",    sub: "Run, save as PDF, attach in hotelkit" },
    { id: "audit",   no: "C", title: "Run the Night Audit",         sub: "Clear blockers, close tills, continue" },
    { id: "noshow",  no: "D", title: "No-show processing",          sub: "When an arrival did not come" },
    { id: "close",   no: "E", title: "Finish & handover",           sub: "Everything the morning team needs" }
  ],

  rules: [
    { icon: "calendar", title: "Two dates — know which one",
      text: "Every report uses the <b>business date</b> ({B}, the day you are closing) <b>except</b> Trial Balance, Breakfast (F&amp;B Services Forecast), VIP report and Wake-up report — those use the <b>current date</b> ({C})." },
    { icon: "layers", title: "Three reports need a layout",
      text: "No Show → <code>/NOS</code> · Late CXL → <code>/L-CXL</code> · Paid out → <code>/NP</code>. Every other report is saved or printed <b>without</b> a layout." },
    { icon: "paperclip", title: "Report → PDF → hotelkit",
      text: "Save each report as PDF and attach it to its item in <b>End of Day Checklist – FRAPQ</b>, then press <b>OK</b>. An item without its PDF is not done." },
    { icon: "stop", title: "Never guess with money",
      text: "Do not cancel charges, move dates or change statuses without a clear reason from the reservation or your manager. If you are unsure: stop, write it in the handover and ask the FOM / manager on duty." }
  ],

  steps: [
    /* ---------------- A. START OF SHIFT ---------------- */
    { id: "hotelkit-login", phase: "prep", title: "Open hotelkit and sign in",
      lead: "hotelkit holds the End of Day checklist where every report is attached.",
      where: "Desktop → <b>Hotelkit</b>",
      how: [
        "Double-click the <b>Hotelkit</b> icon on the desktop.",
        "On <b>Anmeldung | hotelkit | FRAPQ</b> use <b>Login with SSO</b> with the front-office night account.",
        "On the Radisson Hotel Group page enter the password and press <b>Sign in</b>.",
        "Confirm the sign-in request (you receive a call / approval prompt)."
      ],
      check: "You see the hotelkit start page with the menu on the left.",
      stop: "Never write the password on paper or in a shared file. If the call does not arrive, ask the manager on duty — do not use another person's account.",
      imgs: [
        { src: "start-desktop.png", cap: "Desktop shortcut <b>Hotelkit</b>." },
        { src: "hk-login.png", cap: "Single Sign-on (SSO) — press <b>Login with SSO</b>." },
        { src: "hk-sso.png", cap: "Radisson Hotel Group sign-in → <b>Sign in</b>, then confirm the call." }
      ] },

    { id: "hotelkit-eod", phase: "prep", title: "Open the End of Day Checklist – FRAPQ",
      lead: "Filter the tasks so only tonight's checklist is shown.",
      where: "hotelkit → <b>Aufgaben</b> (checklist icon in the left menu)",
      date: "business",
      how: [
        "Click the <b>Aufgaben</b> icon (clipboard with tick) in the left menu.",
        "Open <b>Filter &amp; Sortierung</b> on the right and choose <b>MEINE → An mich</b>.",
        "Set <b>both</b> date boxes to the business date {B} (one day only).",
        "Open <b>End of Day Checklist – FRAPQ</b> (status <i>Offen</i> or <i>In Arbeit</i>)."
      ],
      check: "The checklist shows items such as <b>Cancelled charges</b>, <b>No Show</b>, <b>Late CXL</b>, <b>Paid out</b>, each with <b>OK / Nicht OK</b>.",
      imgs: [
        { src: "hk-tasks.png", cap: "Left menu → <b>Aufgaben</b>." },
        { src: "hk-filter.png", cap: "Filter: <b>MEINE → An mich</b>." },
        { src: "hk-date.png", cap: "From and to = the same day: the business date." },
        { src: "hk-eod.png", cap: "Open <b>End of Day Checklist – FRAPQ</b>." },
        { src: "hk-checklist.png", cap: "The checklist items. Each report is attached to its own item." }
      ] },

    { id: "sap-open", phase: "prep", title: "Open SAP (TMS) and find your favourites",
      lead: "All reports and the Night Audit itself run in SAP.",
      where: "Desktop → <b>SAP Logon 64</b> → TMS → <b>SAP Easy Access TMS_All</b>",
      how: [
        "Start <b>SAP Logon 64</b> and log in to TMS with your own user.",
        "In <b>SAP Easy Access</b> the favourites list contains <b>Night audit process</b>, <b>Charges by date</b>, <b>Till operations</b>, <b>Cancel today's check-outs</b> and more.",
        "Tip: report codes such as <code>/CCSHT/R_FC_SI_07</code> can be typed into the command field (top left) — copy them from this guide."
      ],
      check: "SAP Easy Access is open and you can see the favourites.",
      imgs: [
        { src: "dnb-menu.png", cap: "SAP Easy Access: favourites (top) and the TMS main menu (bottom)." }
      ] },

    /* ---------------- B. REPORTS ---------------- */
    { id: "cancelled", phase: "reports", title: "Cancelled charges",
      code: "/CCSHT/R_FC_SI_07", hk: "Cancelled charges", date: "business", layout: null, out: "PDF → hotelkit",
      how: [
        "Open <b>Cancelled charges</b>.",
        "<b>Charge date</b> = {B}. Leave all other fields empty.",
        "Press <b>Execute</b> (clock icon / <kbd>F8</kbd>).",
        "Save the result as PDF and attach it to <b>Cancelled charges</b> in hotelkit."
      ],
      check: "Every cancelled charge of the day is listed with user and amount.",
      stop: "A cancellation you cannot explain (large amount, unknown user) → do not correct it yourself; mention it in the handover.",
      imgs: [ { src: "rep-cancelled.png", cap: "Charge date = business date → Execute." } ] },

    { id: "segmentation", phase: "reports", title: "Segmentation check – Zero rate check",
      code: "/CCSHT/RMS_Reporting", hk: "Segmentation check - Zero rate check", date: "business", layout: null, out: "PDF → hotelkit",
      how: [
        "Run the RMS reporting / <b>Revenue report by daily segmentation</b>.",
        "<b>Revenue date</b> from–to = {B}.",
        "Look for reservations with rate 0 / free rooms (House Status also shows <b>Free/Price 0</b>).",
        "Save as PDF and attach to <b>Segmentation check – Zero rate check</b>."
      ],
      check: "Every zero-rate / free reservation is expected (e.g. complimentary, house use).",
      stop: "Do not change rates at night. A zero rate that looks wrong goes into the handover for the FOM.",
      note: "No Park Inn screenshot yet — the pictures are from the Radisson sister hotel. The screens are identical; the hotel code differs (DEFRAAIR here).",
      imgs: [
        { src: "ref-segmentation.jpg", cap: "Reference: Revenue report by daily segmentation (1 hotel, 2 revenue date, 3 creation date).", ref: true },
        { src: "ref-house-status.jpg", cap: "Reference: House Status — <b>No show</b> and <b>Free/Price 0</b> lines.", ref: true }
      ] },

    { id: "cashier", phase: "reports", title: "Cashier closure report (Service & FO)",
      hk: "Cashier closure report (Service & FO)", date: "business", out: "Check → OK in hotelkit",
      how: [
        "Make sure every front-office and service cashier has closed their till for the day.",
        "If you need to see a closure again, use <b>Closure reprint</b> with <b>Date</b> = {B}.",
        "When all closures are there, press <b>OK</b> on the hotelkit item."
      ],
      check: "No cashier of the day is missing a closure.",
      stop: "A missing closure → <b>Nicht OK</b>, add a comment (Anmerkung) with the cashier/outlet, and tell the manager.",
      note: "Reference picture from the Radisson sister hotel.",
      imgs: [ { src: "ref-closure-reprint.jpg", cap: "Reference: Closure reprint — date from–to.", ref: true } ] },

    { id: "noshow-report", phase: "reports", title: "No Show report",
      code: "/CCSHT/RS_06_35_ALV", hk: "No Show", date: "business", layout: "/NOS", out: "PDF → hotelkit",
      how: [
        "Open <b>Pending reservations by status</b>.",
        "<b>Arrival date</b> = {B}.",
        "<b>Target status</b> = <b>5</b> (no show).",
        "Press <b>Execute</b>.",
        "Click the layout icon, choose <code>/NOS</code> <i>noshows</i> in <b>Overview of Layouts</b> and confirm with ✓.",
        "Save as PDF and attach to <b>No Show</b> in hotelkit."
      ],
      check: "The list shows status <b>05 NO SHOW</b> with client and remarks (e.g. <i>RO VCC</i>, <i>BB VCC</i>).",
      stop: "Guests who still appear as expected arrivals are handled in phase D before the audit continues.",
      imgs: [
        { src: "rep-noshow-sel.png", cap: "Arrival date = business date · Target status = 5." },
        { src: "rep-noshow-res.png", cap: "Result → layout icon (arrow)." },
        { src: "rep-layout-nos.png", cap: "Choose <b>/NOS – noshows</b> and confirm ✓." }
      ] },

    { id: "latecxl", phase: "reports", title: "Late cancellation report",
      code: "/CCSHT/RS_06_35_ALV", hk: "Late CXL", date: "business", layout: "/L-CXL", out: "PDF → hotelkit",
      how: [
        "Same report as No Show: <b>Pending reservations by status</b>.",
        "<b>Arrival date</b> = {B}.",
        "<b>Target status</b> = <b>6</b> (cancelled).",
        "Press <b>Execute</b>.",
        "Layout icon → choose <code>/L-CXL</code> <i>late cancellations</i> → ✓.",
        "Save as PDF and attach to <b>Late CXL</b>."
      ],
      check: "The list shows status <b>06 CANCELLED</b>.",
      note: "Another training source shows the layout as <code>/LCXL</code>. Use the one your hotel confirms.",
      imgs: [
        { src: "rep-latecxl-sel.png", cap: "Arrival date = business date · Target status = 6 → Execute." },
        { src: "rep-latecxl-res.png", cap: "Result list → layout icon → <b>/L-CXL</b>." },
        { src: "rep-layouts-both.png", cap: "Overview of Layouts: <b>/L-CXL</b> for late cancellations, <b>/NOS</b> for no-shows." }
      ] },

    { id: "pos", phase: "reports", title: "POS report",
      hk: "POS report", out: "PDF → hotelkit",
      how: [
        "The POS report arrives by <b>e-mail</b>. Open it in Outlook or in Chrome.",
        "Save it as PDF and attach it to <b>POS report</b>, then press <b>OK</b>."
      ],
      check: "The PDF is attached to the POS item.",
      stop: "No POS e-mail by the end of the shift → <b>Nicht OK</b> with a comment.",
      imgs: [ { src: "hk-pos.png", cap: "hotelkit item <b>POS report</b> — source: e-mail / Chrome." } ] },

    { id: "paidout", phase: "reports", title: "Paid out",
      code: "/CCSHT/R_FC_SI_03", hk: "Paid out", date: "business", layout: "/NP", out: "PDF → hotelkit",
      how: [
        "Open <b>Charges by Date – Charge – Reserv/Folio</b>.",
        "<b>Hotel</b> = <code>DEFRAAIR</code>.",
        "<b>Charge status</b> = <b>2</b>.",
        "<b>Charge date</b> = {B}. Leave <b>Limit</b> at 500.",
        "Press <b>Execute</b>.",
        "Layout icon → choose <code>/NP</code> <i>Negative Posting</i> → ✓.",
        "Save as PDF and attach to <b>Paid out</b>."
      ],
      check: "Negative postings of the day are listed (reservation, room, description, amount).",
      imgs: [
        { src: "rep-paidout-sel.png", cap: "Hotel DEFRAAIR · Charge status 2 · Charge date = business date." },
        { src: "rep-paidout-layout.png", cap: "Result → layout icon → <b>/NP Negative Posting</b>." }
      ] },

    { id: "trial", phase: "reports", title: "Trial Balance",
      hk: "End-Of-Day reports", date: "current", layout: null, out: "PDF → hotelkit",
      how: [
        "Open <b>Trial Balance</b>.",
        "<b>Hotel</b> = <code>DEFRAAIR</code>.",
        "<b>Current date</b> = {C} — this is one of the four <b>current date</b> reports.",
        "Press <b>Execute</b>, switch to <b>ERP ledger view</b> if needed.",
        "Print / save as PDF with the print icon."
      ],
      check: "Revenue, taxes, guest ledger and deposit ledger are shown with totals.",
      imgs: [
        { src: "rep-trial-sel.png", cap: "Current date (not the business date) → Execute." },
        { src: "rep-trial-res.png", cap: "Result — print / save with the print icon. Amounts hidden in this picture." }
      ] },

    { id: "invoices", phase: "reports", title: "Outgoing invoices report",
      hk: "End-Of-Day reports", date: "business", layout: null, out: "PDF + print",
      how: [
        "Open <b>DEFRAAIR. Outgoing invoices report</b>.",
        "<b>Date</b> = {B}. Leave <i>Display statistical taxes</i> ticked.",
        "Press <b>Execute</b>.",
        "Save and print <b>without</b> a layout."
      ],
      check: "All invoices of the business date are listed.",
      imgs: [ { src: "rep-invoices.png", cap: "Date = business date → Execute → save and print, no layout." } ] },

    { id: "highbalance", phase: "reports", title: "High Balance report (Credits report)",
      code: "/CCSHT/R_CE_SI_07", hk: "High Balance Report", date: "business", layout: null, out: "PDF + print",
      how: [
        "Open the <b>Credits report</b>.",
        "Type only the <b>Arrival date</b> = {B} (yesterday). Leave <i>to</i> empty.",
        "Keep <b>Check-in</b> ticked.",
        "Press <b>Execute</b> and print normally, <b>without</b> a layout."
      ],
      check: "In-house guests with a high open balance are listed.",
      stop: "A very high balance without a valid guarantee → handover for the morning team; do not charge a card without authorisation.",
      imgs: [ { src: "rep-credits.png", cap: "Arrival date = business date · Check-in ticked." } ] },

    { id: "breakfast", phase: "reports", title: "Breakfast report (F&B Services Forecast)",
      hk: "End-Of-Day reports", date: "current", layout: null, out: "Print → kitchen + PDF",
      how: [
        "Open <b>F&amp;B Services Forecast</b>.",
        "<b>Date</b> = {C} (current date).",
        "Reservation status: <b>Check-in</b>, <b>Confirmed</b> and <b>Check-out</b> ticked; Provisional not ticked.",
        "Information type: <b>General</b>. Keep <b>Only meal (nature 1 concepts)</b> ticked.",
        "Press <b>Execute</b>. Print it, <b>write the number of people on the pages</b> and bring it to the kitchen.",
        "Also save the PDF."
      ],
      check: "The printed list is in the kitchen and the PDF is saved.",
      tip: "Load the same PDF into <b>Front Desk Control → Breakfast</b> so the breakfast check and Breakfast Live use tonight's list.",
      imgs: [ { src: "rep-breakfast.png", cap: "Date = current date · Check-in, Confirmed, Check-out · General · Only meal." } ] },

    { id: "vip", phase: "reports", title: "VIP report (Expected VIP arrivals)",
      hk: "End-Of-Day reports", date: "current", layout: null, out: "PDF",
      how: [
        "Open <b>DEFRAAIR. Expected VIP Arrivals</b>.",
        "<b>From</b> = {C} (current date). Leave the selected fields as they are.",
        "Press <b>Execute</b> and save directly — no layout, nothing else."
      ],
      check: "Tomorrow's VIP arrivals are saved as PDF.",
      imgs: [ { src: "rep-vip.png", cap: "From = current date → Execute → save." } ] },

    { id: "wakeup", phase: "reports", title: "Wake-up report (Alarm system setup)",
      hk: "End-Of-Day reports", date: "current", layout: null, out: "PDF",
      how: [
        "Open <b>Alarm system setup</b>.",
        "<b>Device</b> = <code>PBXALFRFT</code>. To find it: press <kbd>F4</kbd> in the field, type <b>pbx</b> in <i>Search Request</i> and pick <b>PBXALFRFT</b>.",
        "<b>Wake up date</b> = {C} (current date), <b>Wake up time</b> = 00:00:01.",
        "Press <b>Execute</b> and save without any layout."
      ],
      check: "All wake-up calls for the new day are listed.",
      stop: "Do not tick <b>Cancel wake-up call</b> — that deletes wake-up calls.",
      imgs: [
        { src: "rep-wakeup.png", cap: "Device PBXALFRFT · current date · 00:00:01." },
        { src: "rep-wakeup-device.png", cap: "F4 search: type <b>pbx</b>, pick <b>PBXALFRFT</b>, confirm ✓." }
      ] },

    { id: "attach", phase: "reports", title: "Attach the PDFs in hotelkit",
      lead: "Each report belongs to its own checklist item.",
      where: "hotelkit → End of Day Checklist – FRAPQ",
      how: [
        "On the item (e.g. <b>Cancelled charges</b>) open the ▾ menu on the right.",
        "Choose <b>Anhang hinzufügen</b> and select the saved PDF.",
        "In <b>Ergebnis übermitteln</b> add a short note if needed and press <b>Senden</b>.",
        "Press <b>OK</b> on the item. The item shows <i>Anhänge (1)</i> and your name.",
        "Reports without their own item (Trial Balance, Outgoing invoices, Breakfast, VIP, Wake-up) go to <b>End-Of-Day-reports attached to this Task?</b>"
      ],
      check: "Every report item shows an attachment and a green OK.",
      stop: "A report you could not run → <b>Nicht OK</b> + <b>Anmerkung hinzufügen</b> with the reason. Never press OK on an empty item.",
      imgs: [
        { src: "hk-attach-arrows.png", cap: "Item name → your name → attachment row." },
        { src: "hk-attach-menu.png", cap: "▾ menu → <b>Anhang hinzufügen</b>." },
        { src: "hk-submit.png", cap: "<b>Ergebnis übermitteln</b> → <b>Senden</b>." }
      ] },

    { id: "eod-ok", phase: "reports", title: "Confirm the remaining checklist items",
      lead: "The last block of the checklist is confirmed with OK once each point is done.",
      how: [
        "<b>End-Of-Day reports attached to this Task?</b> → OK when all PDFs are attached.",
        "<b>Credit card reconciliation</b> <code>/CCSHT/R_FC_SI_01</code> → OK when done.",
        "<b>Cash reconciliation by Controlling</b> → OK.",
        "<b>Entertainment list</b> — EMMA TMS → POS → Information Systems → Plant Menu → Sales → Layout <b>\"Hausbon2\"</b> → OK.",
        "<b>High Balance Report</b> <code>/CCSHT/R_CE_SI_07</code> → OK (already run in step B)."
      ],
      check: "The whole checklist is green.",
      stop: "Anything you could not complete → Nicht OK with a comment, never a silent OK.",
      imgs: [ { src: "hk-eod-ok.png", cap: "The final items, each confirmed with <b>OK</b>." } ] },

    /* ---------------- C. NIGHT AUDIT ---------------- */
    { id: "na-start", phase: "audit", title: "Start the Night Audit and read the error list",
      where: "SAP favourites → <b>Night audit process</b>",
      how: [
        "Start <b>Night audit process</b>.",
        "SAP shows <b>ERRORS NIGHT AUDIT</b> — the list of everything that still blocks the audit.",
        "Read every line (see the table below), then confirm with ✓."
      ],
      errors: true,
      check: "You know which blockers must be cleared before <b>Continue N.A.</b>",
      stop: "If SAP says <b>Night Audit process is being run by user …</b>, the audit is already running in another session. Do not start it twice — see Troubleshooting.",
      imgs: [ { src: "na-errors.png", cap: "ERRORS NIGHT AUDIT — read, then confirm ✓." } ] },

    { id: "na-phase1", phase: "audit", title: "Phase 1 (pre-audit) and the toolbar",
      how: [
        "After the error list SAP runs <b>PHASE 1: PRE-AUDIT</b>. Every process should end with <b>Concluded W/o errors</b>.",
        "The toolbar is your tool box: <b>Expect. Departures</b>, <b>Check-Out</b>, <b>Modify Stay</b>, <b>Expected Arrivals</b>, <b>Modify Reservation</b>, <b>Cash points Reports</b>, <b>Cancel / Charge / Manual Invoices</b>, <b>Payments on hold</b>, <b>Continue N.A.</b>",
        "Clear each blocker with the matching button (next steps), then continue."
      ],
      check: "<i>End of phase 1</i> is shown and every process says <i>Concluded W/o errors</i>.",
      imgs: [ { src: "na-phase1.png", cap: "Phase 1 finished — toolbar with <b>Continue N.A.</b> on the right." } ] },

    { id: "na-arrivals", phase: "audit", title: "Expected arrivals still open",
      lead: "“Still Expected Arrivals NOT CHECKED-IN”",
      how: [
        "Open <b>Expected Arrivals</b> (or House Status → <b>Arrivals Expected</b>).",
        "For each reservation check: has the guest arrived (check in), is it a late arrival with guarantee, or a no-show?",
        "A real no-show → phase <b>D – No-show processing</b>."
      ],
      check: "No arrival of the business date is left open.",
      stop: "A guaranteed late arrival (e.g. flight delayed, guest called) is not a no-show. When in doubt keep the room and ask the manager.",
      imgs: [ { src: "ns-house.png", cap: "House Status → <b>Arrivals Expected</b> opens the list of open arrivals." } ] },

    { id: "na-departures", phase: "audit", title: "Expected departures still open",
      lead: "“Still Expected Departures NOT CHECKED-OUT”",
      how: [
        "Open <b>Expect. Departures</b>.",
        "Guests who left and are settled → <b>Check-Out</b>.",
        "Guests who stay longer → <b>Modify Stay</b> only with the guest's or manager's confirmation."
      ],
      check: "No departure of the business date is left open.",
      stop: "Open balance on a departure → do not check out with a balance; settle it or hand it over."
    },

    { id: "na-dnb", phase: "audit", title: "Departures not billed",
      lead: "“Reservations in Check-out not yet billed (Check REPORTS → DEPARTURES NOT BILLED)”",
      how: [
        "Open <b>Reports → Departures not billed</b>. Rows with a <b>red deadline</b> block the audit — typically <b>Day-guest</b> (Day-g.) accounts of events (e.g. M&amp;E dinner, tune-up) with an open balance.",
        "Open the account: TMS → Billing → <b>Day-guest billing</b> → <b>Modify day-guest invoice</b> → enter the reservation → Execute.",
        "The <b>Modify items of all folios</b> screen shows the open items and the <b>Departure</b> date.",
        "If the account must stay open (the event bills later): set <b>Departure</b> to the event's real end date and <b>Save</b>. If the guest must pay now: bill/settle the folio instead.",
        "Refresh <b>Departures not billed</b> — the row must disappear."
      ],
      check: "Departures not billed shows no red row for the business date.",
      stop: "Moving a departure date only hides the balance until that date. Do it only when the account is meant to stay open, write reservation + reason in the handover, and ask the manager when unsure.",
      note: "Taken from the remote-support recording of a real night (event day-guest accounts).",
      imgs: [
        { src: "dnb-list.png", cap: "Departures not billed — red deadline = blocking today. Holder names hidden." },
        { src: "dnb-menu.png", cap: "TMS main menu → Billing → <b>Day-guest billing</b>." },
        { src: "dnb-dayguest.png", cap: "Modify day-guest invoice → enter the reservation." },
        { src: "dnb-before.png", cap: "Before: departure = today, 242,00 EUR still pending." },
        { src: "dnb-after.png", cap: "After: departure moved to the event's end date → <b>Save</b>." }
      ] },

    { id: "na-cashpoints", phase: "audit", title: "Cash points (Till status maintenance)",
      where: "Night Audit toolbar → <b>Cash points Reports</b>",
      how: [
        "Click <b>Cash points Reports</b>. <b>Till status maintenance</b> lists every till (ACCT…, FD…, M&amp;E…) with its status.",
        "Check which tills are still <b>Open</b>.",
        "Close a till only as your trainer / FOM has shown you for this hotel. The screen has select-all (bottom left), <b>Open</b> and <b>Close</b>."
      ],
      check: "You know the status of every till before you continue.",
      stop: "The training source did not finish this lesson (“Cash point — you must show me tomorrow”). Do not select all and close every till from the screenshot alone. If a till is open and you have no instruction: note it in the handover and ask the FOM / manager on duty.",
      note: "Needs confirmation (Master SOP E08 / Q06).",
      imgs: [
        { src: "na-cashpoints.png", cap: "Toolbar → <b>Cash points Reports</b>." },
        { src: "na-tills.png", cap: "Till status maintenance — select-all, <b>Open</b> and <b>Close</b>. Use only as instructed." }
      ] },

    { id: "na-continue", phase: "audit", title: "Continue N.A. and confirm",
      how: [
        "When all blockers are cleared, press <b>Continue N.A.</b>",
        "Wait. Do not close SAP while it runs.",
        "SAP confirms: <b>Night Audit for the hotel {B} has been done — DEFRAAIR</b>. Confirm with ✓."
      ],
      check: "The information box shows the business date {B} as done.",
      stop: "If the error list comes back, a blocker is still open — go back to the matching step. Never force the audit.",
      imgs: [
        { src: "na-continue.png", cap: "<b>Continue N.A.</b>" },
        { src: "na-done.png", cap: "“Night Audit for the hotel … has been done” → ✓." }
      ] },

    /* ---------------- D. NO-SHOW ---------------- */
    { id: "ns-open", phase: "noshow", title: "Open the reservation and read the remarks",
      how: [
        "House Status → <b>Arrivals Expected</b> → double-click the reservation.",
        "Read <b>Remarks</b> (e.g. <i>BB VCC · 66,03 € · NO SHOW</i>) and the pending amount at the bottom right.",
        "Note room, client (e.g. Booking.com, Priceline/Agoda) and the no-show amount for the handover / VCC."
      ],
      check: "You know whether a no-show fee applies and how it is guaranteed (VCC, card, none).",
      imgs: [
        { src: "ns-house.png", cap: "Arrivals Expected → open the reservation." },
        { src: "ns-remarks.png", cap: "Remarks show VCC, amount and NO SHOW; pending amount bottom right." }
      ] },

    { id: "ns-status", phase: "noshow", title: "Set the reservation status to 5 (No show)",
      how: [
        "In the reservation choose <b>Edit</b> → <b>Reservation status</b>.",
        "Enter <b>5</b> and confirm ✓.",
        "The reservation status changes to <b>No Show</b> and SAP posts the no-show room charge."
      ],
      check: "Status = No Show.",
      imgs: [ { src: "ns-status5.png", cap: "Edit → Reservation status → <b>5</b> → ✓." } ] },

    { id: "ns-charge", phase: "noshow", title: "Clear the posted no-show charge",
      lead: "“Cancel/no show reservations not yet billed (Check REPORTS → Cancel with charges)”",
      how: [
        "Open <b>Modify items of all folios</b> for the reservation.",
        "Right-click the <b>Room No Show</b> item → <b>Cancel charg.</b>",
        "Enter the <b>Cancel. reason</b>, confirm ✓, enter your password and save."
      ],
      check: "The folio shows no open no-show item and the error line is gone.",
      stop: "This is the documented night procedure. If the remark says a no-show fee must be charged (VCC/card), make sure it is recorded — Front Desk Control → VCC or the handover — so it is charged. If unsure, ask before cancelling.",
      imgs: [
        { src: "ns-cancel-menu.png", cap: "Right-click the Room No Show item → <b>Cancel charg.</b>" },
        { src: "ns-cancel-reason.png", cap: "Cancel reason → ✓ → password → save." }
      ] },

    /* ---------------- E. CLOSE ---------------- */
    { id: "close-check", phase: "close", title: "Final check before the morning team arrives",
      how: [
        "hotelkit: every item of <b>End of Day Checklist – FRAPQ</b> is OK with its PDF (or Nicht OK with a comment).",
        "Breakfast list printed, numbers written on it, in the kitchen.",
        "Open tills or cash-point questions written in the handover.",
        "Front Desk Control → <b>Night Audit</b>: record the result of each control, open items and follow-ups, then <b>Generate &amp; print report</b>.",
        "Front Desk Control → <b>Handover</b>: no-shows with fee, moved departures, high balances, anything unusual."
      ],
      check: "The morning shift can start without asking you anything."
    }
  ],

  /* Error lines from ERRORS NIGHT AUDIT and where they are solved. */
  errors: [
    { msg: "Still Expected Departures NOT CHECKED-OUT", fix: "Expect. Departures → Check-Out or Modify Stay", step: "na-departures" },
    { msg: "Still Expected Arrivals NOT CHECKED-IN", fix: "Expected Arrivals → check in, or No-show processing", step: "na-arrivals" },
    { msg: "Reservations in Check-out not yet billed (DEPARTURES NOT BILLED)", fix: "Reports → Departures not billed → bill or adjust the day-guest account", step: "na-dnb" },
    { msg: "Cancel/no show reservations not yet billed (Cancel with charges)", fix: "Modify items of all folios → clear the no-show charge", step: "ns-charge" }
  ],

  troubles: [
    { q: "“Night Audit process is being run by user DEFRAAIRFO3”",
      a: "The audit is already running in another SAP session (another PC or window). Do not start it again. Press <b>Exit</b>, find the session that runs it and let it finish. If nobody is running it, call the manager / SAP support.",
      img: "na-running.png" },
    { q: "The error list comes back after Continue N.A.",
      a: "One blocker is still open. Match the line with the table in step C1 and go back to that step." },
    { q: "A report shows nothing",
      a: "Check the date: business date {B} for most reports, current date {C} only for Trial Balance, Breakfast, VIP and Wake-up." },
    { q: "I cannot find the layout /NOS, /L-CXL or /NP",
      a: "Open the layout icon in the result list; the <b>Overview of Layouts</b> is sorted alphabetically — scroll. If it is missing, save the list without layout and write it in the hotelkit comment." },
    { q: "Departures not billed shows day-guest event accounts",
      a: "These are M&amp;E / event accounts with an open balance and departure today. See step C5: bill them, or move the departure only if the account must stay open, and document it." },
    { q: "A till cannot be closed",
      a: "Someone may still be logged in to that till. Ask the colleague/outlet to close it; otherwise note the till in the handover and inform the manager." }
  ],

  /* Photographed procedure sheets from the Radisson sister hotel (DEFRA1, 2022). */
  refs: [
    { src: "ref-till-balances.jpg", title: "Total till balances (cash on hand)", text: "Balance date from–to, breakdown by cashier." },
    { src: "ref-preauth.jpg", title: "Pre-authorisation situation", text: "Reservations in check-in · Outstanding credit · Credit exceeded." },
    { src: "ref-charges-by-date.jpg", title: "Charges by Date – Charge – Reserv/Folio", text: "Same screen as Paid out; charge date from–to." },
    { src: "ref-daily-mgmt.jpg", title: "Daily Management report", text: "Night Audit date · show all month / year." },
    { src: "ref-revenue-profit.jpg", title: "Daily revenue by profit center", text: "Night Audit date · profit center." },
    { src: "ref-cancelled.jpg", title: "Cancelled charges", text: "Charge date from–to." },
    { src: "ref-house-status.jpg", title: "House Status", text: "No show and Free/Price 0 lines, occupancy, ADR, RevPAR." },
    { src: "ref-closure-reprint.jpg", title: "Closure reprint", text: "Cashier closures by date." },
    { src: "ref-segmentation.jpg", title: "Revenue report by daily segmentation", text: "Hotel · revenue date · creation date." },
    { src: "ref-till-movements.jpg", title: "Till Movements (single identifier)", text: "Balance date from–to." },
    { src: "ref-trial-balance.jpg", title: "Trial Balance", text: "Hotel · current date." },
    { src: "ref-outgoing-invoices.jpg", title: "Outgoing invoices report", text: "Date from–to." }
  ]
};
