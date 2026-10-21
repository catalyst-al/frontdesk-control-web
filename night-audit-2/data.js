/* Night Audit 2.0 — content.
   Source: "EMMA v2 (Fiori) | New Night Audit functions" (Radisson Hotel Group SOP, 2026):
   the overview of the new Night Audit app, the 13 processes and the actions each one offers.
   Screenshots come from that SOP (Radisson Blu demo/sister hotels) and were redacted before
   they were added: guest and company names, reservation / invoice / event numbers, amounts and
   staff names are blurred. The screens are the same for DEFRAAIR.
   Anything that is our own reading of the screenshots (not written in the SOP) is marked as
   a Note inside the step. */
window.NA2 = {

  phases: [
    { id: "start",   no: "A", title: "Open Fiori & the Night Audit app", sub: "Desktop icon, two-window sign-in, business date, processes list" },
    { id: "actions", no: "B", title: "Processes with actions",  sub: "Solved directly in the Night Audit app (1 – 5)" },
    { id: "info",    no: "C", title: "Informative processes",   sub: "Reported here, solved in TMS / Folio Management (6 – 13)" },
    { id: "run",     no: "D", title: "Execute the Night Audit", sub: "When every mandatory process is green" }
  ],

  rules: [
    { icon: "list", title: "Blue number = open, green tick = done",
      text: "The left column lists every process. A <b>blue circle with a number</b> means that many lines are still open; a <b>green tick</b> means the process is clear. The heading counts them: <b>Mandatory (5/11)</b> = 5 of 11 still open." },
    { icon: "cursor", title: "Select the line, then Actions",
      text: "Open the process, <b>tick the checkbox</b> of the reservation(s) and choose the action from the <b>Actions</b> menu at the top right of the list. The action is applied to the ticked lines only." },
    { icon: "link", title: "“Only informative” = go to TMS",
      text: "Processes marked <i>To manage this point, go to TMS</i> cannot be changed from the app. Solve them in TMS or Folio Management, then press the <b>refresh</b> arrow next to <i>Show all</i> so the count updates." },
    { icon: "stop", title: "Never guess with money",
      text: "No-show fees, moved dates, express check-out and limit billing dates change what the guest or the company pays. If the reservation does not make the right action clear: stop, write it in the handover and ask the manager on duty." }
  ],

  steps: [
    /* ---------------- A. THE APP ---------------- */
    { id: "open-fiori", phase: "start", title: "Open Fiori from the desktop",
      lead: "EMMA v2 runs in the browser. The shortcut on the night PC is called FIORI.",
      where: "Desktop → <b>FIORI</b> (blue monitor icon with the globe)",
      how: [
        "On the desktop double-click the <b>FIORI</b> icon. It opens the EMMA v2 (Fiori) sign-in page in the browser.",
        "Keep <b>SAP Logon 64</b> (TMS) for everything the Night Audit app cannot do itself (parts C and D of this guide and the whole Night Audit guidebook): both run side by side.",
        "<b>Hotelkit</b> stays the place for the End of Day checklist and the attached reports."
      ],
      check: "The browser shows the Radisson Hotel Group sign-in window with the hotel drop-down.",
      imgs: [
        { src: "na2-desktop-fiori.png", cap: "Night PC desktop: <b>FIORI</b> opens EMMA v2, <b>SAP Logon 64</b> is TMS, <b>Hotelkit</b> the checklist, <b>Front Desk Control</b> this workstation." }
      ] },

    { id: "sign-in", phase: "start", title: "Sign in: two windows",
      lead: "Fiori asks twice: first the hotel's front-office login, then your own user ID with the TMS password. All user names and passwords are in the <b>Access</b> tab of Front Desk Control.",
      where: "Fiori sign-in page → <b>first window</b> → <b>second window</b> → launchpad",
      how: [
        "<b>First window</b> (the Radisson Hotel Group box): choose <b>Park Inn by Radisson Frankfurt Airport</b> in the hotel drop-down, enter the front-office Fiori user and its password (Access tab → <i>FIORI · first window</i>) and press <b>Login</b>.",
        "<b>Second window</b>: enter your <b>user ID</b> — the same number as in TMS, e.g. <code>0000029705</code>; the drop-down also accepts the short form without the leading zeros — and your <b>TMS password</b>. Press <b>Login</b>.",
        "We have <b>two</b> TMS user IDs at the night desk (Access tab → <i>FIORI · second window</i>). Use the one you also use in TMS; either one opens the same apps.",
        "The Fiori <b>launchpad</b> opens with the tiles (Check in, Cancel Check-In, reservations …). The <b>Night Audit</b> app is one of these tiles."
      ],
      check: "You are on the launchpad and can see the Night Audit tile.",
      stop: "Passwords are never written in this guide, in the handover or on paper at the desk: they live in the Access tab (locked with its PIN) and nowhere else. If a password was changed, update the Access tab the same night.",
      note: "From the hotel's e-mail about the Fiori login: open the Fiori sign-in page, enter the front-office access data you were given, then your own user ID (e.g. 0000029705) and your TMS password.",
      imgs: [
        { src: "na2-fiori-login.png", cap: "Radisson Hotel Group sign-in: hotel <b>Park Inn by Radisson Frankfurt Airport</b>, user ID (drop-down, blurred here), password, <b>Login</b>. Behind it the launchpad tiles." }
      ] },

    { id: "open-app", phase: "start", title: "Open the Night Audit app and read the screen",
      lead: "The Night Audit runs in EMMA v2 (Fiori). One screen shows every process that must be clear before the audit can be executed.",
      where: "Fiori launchpad → tile <b>Night Audit</b>",
      how: [
        "On the launchpad open the <b>Night Audit</b> tile. The header shows the hotel and, below it, the <b>business date</b> you are closing <b>&raquo;</b> the <b>next business date</b> (e.g. <i>Wednesday, 22 Apr 2026 &raquo; Thursday, 23 Apr 2026</i>). Check that this is tonight's date before you touch anything.",
        "On the left is the <b>Processes</b> list, split into <b>Mandatory</b> and <b>Optional</b>. The heading tells you how many are still open, e.g. <b>Mandatory (5/11)</b>.",
        "Each process shows a <b>blue circle with the number of open lines</b> or a <b>green tick</b> when it is clear. The <b>Show all</b> switch also lists the processes that are already green; the <b>circular arrow</b> next to it refreshes the counts.",
        "The right side stays empty (<i>No process selected</i>) until you click a process. Then its list of reservations / events opens there.",
        "At the bottom right is the <b>Execute Night Audit</b> button. Work through the processes from top to bottom until the mandatory ones are green."
      ],
      check: "Business date correct, the Processes list is visible, you can see which processes are blue (open) and which are green (done).",
      note: "In the screenshots <i>Execute Night Audit</i> is greyed out while mandatory processes are still open. Treat it as available only once they are all green; confirm this behaviour on the live system the first night.",
      imgs: [
        { src: "na2-overview.png", cap: "The Night Audit app: business date &raquo; next date, the Processes list on the left (Mandatory x/11, Optional), the work area on the right, <b>Execute Night Audit</b> bottom right." }
      ] },

    { id: "how-solve", phase: "start", title: "How a process is solved",
      lead: "Every process with actions works the same way: open it, tick the lines, choose an action.",
      where: "Night Audit → <b>Processes</b> → any process with a blue number",
      how: [
        "Click the process in the left column. Its list opens on the right with the title and the number of open lines, e.g. <i>Expected arrivals not Checked-in (30)</i>.",
        "Read the line: reservation / event number, name, dates, folio, payment type, amounts. The reservation number is a link — clicking it opens the reservation (Folio Management) when you need more detail.",
        "<b>Tick the checkbox</b> at the start of the line(s) you want to treat. The ticked line turns red/pink.",
        "Open <b>Actions</b> (top right of the list) and choose the action. The available actions depend on the process — they are listed step by step in part B.",
        "When the line disappears from the list and the counter goes down, the action is done. When a process has no <b>Actions</b> menu, it is informative only: solve it in TMS and refresh (part C)."
      ],
      check: "You know where the checkbox, the <b>Actions</b> menu and the refresh arrow are.",
      tip: "You can tick several lines and apply the same action once — useful for <i>Automatic invoicing for amount due 0</i> on long lists.",
      imgs: [
        { src: "na2-arrivals.png", cap: "The pattern: process selected on the left (red frame), one line ticked (red), <b>Actions</b> menu open at the top right." },
        { src: "na2-events-groups.png", cap: "Same pattern on <i>Events &amp; Groups reservations Limit Billing date</i>: tick the line, then <b>Actions → Move limit billing date</b>." }
      ] },

    /* ---------------- B. PROCESSES WITH ACTIONS ---------------- */
    { id: "p1-arrivals", phase: "actions", title: "1 · Expected arrivals not Checked-In",
      lead: "Every reservation that should have arrived today but is still not checked in. Each line needs one of three actions.",
      where: "Processes → <b>Expected arrivals not Checked-in</b> → tick the line → <b>Actions</b>",
      how: [
        "Open the process and look at every line: name, nights, departure, adults/children. Decide for each one whether the guest is in the house (walked in without check-in), is coming later, or is a <b>no-show</b>.",
        "<b>Express check-in</b> — for a guest who is actually in the house. The room must be <b>pre-assigned</b> on the reservation, otherwise express check-in is not possible: assign the room first.",
        "<b>Change arrival date</b> (1 day by default) — for a guest who arrives tomorrow. If the reservation is set as cadence, its <b>fixed charges, routing, loan items, actions, discounts and promo codes move with the date</b>, and the <b>special tax is adjusted</b> automatically.",
        "The system <b>refuses</b> to move the arrival if the departure date would be before the new arrival date. If the new arrival equals the departure (<b>day use</b>), the room price stays, the <b>City Tax is deleted</b> and a pop-up tells you so.",
        "<b>Change status to no-show</b> — for a guest who did not come. A reminder about the <b>cancellation / penalty fee</b> appears. If the fee must <b>not</b> be charged (e.g. the booking rule says so or the manager decided), open the reservation and remove the fees."
      ],
      check: "The process shows a green tick: no expected arrival is left without check-in, new arrival date or no-show status.",
      stop: "A no-show with a fee is money charged to the guest's card or the company. Apply the hotel's no-show rule (see the Night Audit guidebook, part D) and when you are not sure whether to charge, leave the fee decision to the manager and note it in the handover.",
      imgs: [
        { src: "na2-arrivals.png", cap: "<b>Actions</b> on Expected arrivals not Checked-in: <b>Express check-in</b>, <b>Change arrival date</b>, <b>Change status to no-show</b>." }
      ] },

    { id: "p2-departures", phase: "actions", title: "2 · Expected departures not Checked-Out",
      lead: "Guests who should have left today but are still checked in. Either they stay another night or they are gone and must be checked out.",
      where: "Processes → <b>Expected departures not Checked Out</b> → tick the line → <b>Actions</b>",
      how: [
        "Open the process. Each line shows the reservation, room, guest or group name, pax, arrival/departure and room type.",
        "Find out whether the guest is still in the room (keys, housekeeping status, call the room if needed) or has left.",
        "<b>Move to virtual and extend departure date</b> — the guest stays: the departure is moved <b>1 day by default</b> and the reservation goes to the virtual room <b>Z001</b>. Fix the real room and rate in the morning handover.",
        "<b>Express check-out</b> — the guest has left: the reservation is checked out from here. This only works when <b>all folios are correctly invoiced and paid</b>; an open folio blocks it. Settle or invoice the folio first in Folio Management."
      ],
      check: "The process is green: every expected departure is either extended or checked out.",
      stop: "Do not express check-out a reservation with an open balance just to clear the list — the balance must be invoiced and paid first. A balance you cannot settle goes into the handover.",
      imgs: [
        { src: "na2-departures.png", cap: "<b>Actions</b> on Expected departures not Checked Out: <b>Move to virtual and extend departure date</b> (Z001, +1 day) or <b>Express check-out</b>." }
      ] },

    { id: "p3-limit-billing", phase: "actions", title: "3 · Events & Groups reservations Limit Billing date",
      lead: "Event and group reservations whose limit billing date is today but which are not invoiced yet.",
      where: "Processes → <b>Events &amp; Groups reservations Limit Billing date</b> → tick the line → <b>Actions → Move limit billing date</b>",
      how: [
        "Open the process. Each line shows the reservation, type (<b>Event</b> or <b>Group</b>), arrival date, folio, payment type, the day charge and the current balance.",
        "If the event / group has already been invoiced by the day team, the line should not be here — check the folio before you move anything.",
        "For a reservation that is <b>not invoiced</b>: tick it and choose <b>Move limit billing date</b>. The date moves <b>1 day by default</b>, so the day team can invoice it tomorrow.",
        "Repeat for every open line (several lines can be ticked together)."
      ],
      check: "The process is green: no event or group reservation is left with today's limit billing date.",
      stop: "Moving the limit billing date only delays the invoice; it does not fix a wrong folio. A group with a big balance and no clear billing instruction goes into the handover for the FOM / M&amp;E.",
      imgs: [
        { src: "na2-events-groups.png", cap: "Tick the event / group reservation → <b>Actions → Move limit billing date</b>. The list shows type, arrival date, folio, payment type and balance." }
      ] },

    { id: "p4-dayguest", phase: "actions", title: "4 · Day-Guest Billing in Check-Out, not yet billed",
      lead: "Day-guest reservations (type Day-guest) that are in check-out status but have no invoice yet.",
      where: "Processes → <b>Day-Guest Billing reservations in Check Out not yet billed</b> → tick the line → <b>Actions</b>",
      how: [
        "Open the process. Each line shows the reservation, main guest name, type <b>Day-guest</b>, arrival date, folio, payment type and the day charge.",
        "Look at the amount: <b>0,00</b> means nothing is due; an amount means something still has to be paid or invoiced.",
        "<b>Automatic invoicing for amount due 0</b> — tick every line with amount due 0 and choose this action: the invoice is created automatically and the line disappears.",
        "<b>DG Billing: Modify departure date</b> — for a day guest that must stay open (not billed tonight): the departure date is moved <b>+1 day</b> by default."
      ],
      check: "The process is green: every day guest in check-out is either invoiced or moved to tomorrow.",
      imgs: [
        { src: "na2-dayguest.png", cap: "<b>Actions</b> on Day-Guest Billing: <b>DG Billing: Modify departure date</b> (+1 day) or <b>Automatic invoicing for amount due 0</b>." }
      ] },

    { id: "p5-individual", phase: "actions", title: "5 · Individual reservations in Check-Out, not yet billed",
      lead: "Individual reservations that are checked out but still have no invoice. Usually a long list — most lines have nothing due.",
      where: "Processes → <b>Individual reservations in Check Out not yet billed</b> → tick the lines → <b>Actions → Automatic invoicing for amount due 0</b>",
      how: [
        "Open the process. Each line shows the reservation, main guest name, type <b>Individual</b>, arrival date, folio, payment type and the day charge without tax.",
        "Tick every line with amount due <b>0,00</b> (tick the header checkbox to select all, then untick the lines with an amount).",
        "Choose <b>Automatic invoicing for amount due 0</b>: an invoice is created for each selected reservation and the lines disappear.",
        "A line with an amount still due cannot be closed this way: open the reservation (click its number) and settle it in <b>Folio Management</b>, or leave it in the handover with the reason."
      ],
      check: "The process is green, or only lines with a real balance are left and they are in the handover.",
      note: "The only action in this process is <i>Automatic invoicing for amount due 0</i>; there is no date change here.",
      imgs: [
        { src: "na2-individual.png", cap: "Individual reservations in Check Out not yet billed: the single action <b>Automatic invoicing for amount due 0</b>." }
      ] },

    /* ---------------- C. INFORMATIVE PROCESSES ---------------- */
    { id: "p6-invoices", phase: "info", title: "6 · Invoices not yet paid",
      lead: "A report of every invoice that is created but not paid. Nothing can be done from the app itself.",
      where: "Processes → <b>Invoices not yet paid</b> → click the reservation number → <b>Folio Management</b>",
      how: [
        "Open the process. Each line shows the invoice ID, holder ID, holder name and the amount paid.",
        "There is <b>no Actions menu</b>: the process is informative only.",
        "To take the payment, click the <b>reservation number</b> on the line: Folio Management opens and the payment is processed there (card on file, PinPad, or the agreed payment method).",
        "Come back to the Night Audit app and press the <b>refresh</b> arrow: the line disappears once the invoice is paid."
      ],
      check: "No unpaid invoice is left, or the ones left are explained in the handover.",
      stop: "Invoice paid = money moved. Use only the payment method the reservation allows; a company invoice on account stays open on purpose — do not force a card payment on it.",
      imgs: [
        { src: "na2-invoices.png", cap: "Invoices not yet paid: a report (invoice ID, holder, amount paid). No Actions menu — open the reservation to process the payment." }
      ] },

    { id: "p7-hold", phase: "info", title: "7 · Payments on Hold",
      lead: "A report of every payment that is on hold in a reservation. It is listed under Optional in the app.",
      where: "Processes → <b>Optional</b> → <b>Payments on Hold</b>",
      how: [
        "Open the process. Each line shows the invoice ID, reservation ID, payment method, amount, date, status (Confirmed, Check-in, Check-out, Offer) and the till that took it.",
        "There is <b>no Actions menu</b>: the process is informative only.",
        "Read the list for anything unusual (a large amount, an old date, a payment on a reservation that checked out). Note it in the handover; the day team / accounting releases payments on hold.",
        "Because the process is optional it does not block the audit."
      ],
      check: "You have looked at the list and noted anything unusual.",
      imgs: [
        { src: "na2-payments-hold.png", cap: "Payments on Hold under <b>Optional</b>: invoice, reservation, payment method, amount, date, status, till. Report only." }
      ] },

    { id: "p8-room-move", phase: "info", title: "8 · Remaining room move / change: list of rooms",
      lead: "Rooms with a room move or room change that was planned but has not been actioned.",
      where: "Processes → <b>Remaining room move/change</b>",
      how: [
        "Open the process: it lists the pending room moves / changes planned for today.",
        "There is <b>no Actions menu</b>: the process is informative only.",
        "Check each one: either the move happened and must be recorded in TMS, or it did not happen and the plan must be removed / moved to tomorrow in TMS.",
        "Refresh the Night Audit app afterwards."
      ],
      check: "No pending room move is left for today.",
      note: "The SOP has no screenshot for this process. The list looks like the other reports (process on the left, table on the right)." },

    { id: "p9-cancel-noshow", phase: "info", title: "9 · Cancel / no-show reservations with pending charges",
      lead: "Cancelled or no-show reservations that still carry charges to be settled.",
      where: "Processes → <b>Cancel/No-show reservations with pending charges</b> → click the reservation number",
      how: [
        "Open the process. Each line shows the reservation, type, holder, description, folio and payment type.",
        "There is <b>no Actions menu</b>: the process is informative only, but the reservation number is a link.",
        "Click the reservation to open it and <b>settle the charges</b>: charge the no-show / cancellation fee to the card or the company as the reservation allows, or remove the charge when it must not be charged.",
        "Refresh the Night Audit app: the line disappears once the folio is settled."
      ],
      check: "Every cancelled / no-show reservation with charges is settled or noted in the handover with the reason.",
      stop: "Same rule as the no-shows in process 1: charge only what the booking conditions allow; when unsure, leave the charge and the decision to the manager.",
      imgs: [
        { src: "na2-cancel-noshow.png", cap: "Cancel/No-show reservations with pending charges: reservation (link), type, holder, description, folio, payment type." }
      ] },

    { id: "p10-locked", phase: "info", title: "10 · Locked reservations in EMMA TMS",
      lead: "A reservation that is open in TMS by someone is locked and blocks the Night Audit.",
      where: "Processes → <b>Locked reservations</b> → TMS",
      how: [
        "Open the process: it tells you <b>which reservation</b> is locked and <b>via which transaction</b>.",
        "There is <b>no Actions menu</b>: the process is informative only.",
        "Go to TMS and <b>exit the reservation</b> (close the screen that holds it). If a colleague has it open on another PC, ask them to leave it; after hours it may be your own session on a second window.",
        "Refresh the Night Audit app: the lock disappears."
      ],
      check: "No reservation is locked; the process is green.",
      note: "The SOP has no screenshot for this process." },

    { id: "p11-pos", phase: "info", title: "11 · POS Outlets not closed",
      lead: "A point-of-sale outlet (bar, restaurant) that has not closed its day blocks the audit.",
      where: "Processes → <b>POS Outlets not closed</b> → the POS system / till of the outlet",
      how: [
        "Open the process: it lists the outlets still open.",
        "There is <b>no Actions menu</b>: the process is informative only.",
        "Close the outlet in its POS / till (end-of-day closure), as the outlet team normally does. Check <b>Till Status</b> in the Processes list as well.",
        "Refresh the Night Audit app."
      ],
      check: "All POS outlets are closed; the process is green.",
      note: "The SOP has no screenshot for this process. Till and outlet closures stay as in the Night Audit guidebook (Cashier closure report)." },

    { id: "p12-events-ci", phase: "info", title: "12 · Events not Checked-In",
      lead: "Events that start today but were not checked in. They are solved in TMS, on the event itself.",
      where: "Processes → <b>Events not Checked-in</b> → TMS → the Event",
      how: [
        "Open the process. Each line shows the event ID, description, start and end date, event type and status (Tentative, Confirmed).",
        "There is <b>no Actions menu</b>: the process is informative only (<i>To manage this point, go to TMS</i>).",
        "In TMS open the event and check it in, or correct its dates / status when the event is not taking place.",
        "Refresh the Night Audit app."
      ],
      check: "No event with today's start date is left without check-in.",
      imgs: [
        { src: "na2-events-not-ci.png", cap: "Events not Checked-in: event ID, description, dates, type, status. Solve it in TMS on the event." }
      ] },

    { id: "p13-events-co", phase: "info", title: "13 · Events not Checked-Out",
      lead: "Events whose end date has passed but which were not checked out. Solved in TMS, on the event.",
      where: "Processes → <b>Events not Checked Out</b> → TMS → the Event",
      how: [
        "Open the process. Each line shows the event ID, description, start and end date, event type and status.",
        "There is <b>no Actions menu</b>: the process is informative only.",
        "In TMS open the event and check it out (after its folio is invoiced), or extend its end date when it continues.",
        "Refresh the Night Audit app."
      ],
      check: "No finished event is left checked in.",
      imgs: [
        { src: "na2-events-not-co.png", cap: "Events not Checked Out: same columns as Events not Checked-in. Solve it in TMS on the event." }
      ] },

    /* ---------------- D. EXECUTE ---------------- */
    { id: "execute", phase: "run", title: "Execute the Night Audit",
      lead: "When the mandatory processes are green, the audit can be started from the same screen.",
      where: "Night Audit → bottom right → <b>Execute Night Audit</b>",
      how: [
        "Switch <b>Show all</b> on and go through the Processes list once more: every <b>Mandatory</b> process must show a green tick. Optional processes (Payments on Hold) do not block.",
        "Press the <b>refresh</b> arrow one last time so the counts are current.",
        "Press <b>Execute Night Audit</b> (bottom right) and wait for it to finish. Do not close the browser while it runs.",
        "Afterwards continue with the reports and the handover as in the Night Audit guidebook (part E)."
      ],
      check: "The business date has moved to the next day and the audit is finished without errors.",
      stop: "A yellow bar at the bottom reading <b>Night audit is locked by another user</b> (with a warning counter at the bottom left) means another user is in the Night Audit at the same time — do not execute until it is cleared; find out who and ask them to leave the app.",
      imgs: [
        { src: "na2-events-groups.png", cap: "Bottom bar: warning counter on the left, <b>Night audit is locked by another user</b> and <b>Execute Night Audit</b> on the right." },
        { src: "na2-overview.png", cap: "Start screen with <b>Execute Night Audit</b> greyed out while mandatory processes are still open." }
      ] }
  ],

  /* Quick reference: one line per process, as in the SOP. */
  processes: [
    { no: 1,  name: "Expected arrivals not Checked-In", group: "Mandatory", actions: ["Express check-in (room must be pre-assigned)", "Change arrival date (+1 day default)", "Change status to no-show (fee reminder)"], where: "Night Audit app → Actions", step: "p1-arrivals" },
    { no: 2,  name: "Expected departures not Checked-Out", group: "Mandatory", actions: ["Move to virtual (Z001) and extend departure date (+1 day)", "Express check-out (all folios invoiced and paid)"], where: "Night Audit app → Actions", step: "p2-departures" },
    { no: 3,  name: "Events & Groups reservations Limit Billing date", group: "Mandatory", actions: ["Move limit billing date (+1 day) if not invoiced"], where: "Night Audit app → Actions", step: "p3-limit-billing" },
    { no: 4,  name: "Day-Guest Billing in Check-Out, not yet billed", group: "Mandatory", actions: ["DG Billing: Modify departure date (+1 day)", "Automatic invoicing for amount due 0"], where: "Night Audit app → Actions", step: "p4-dayguest" },
    { no: 5,  name: "Individual reservations in Check-Out, not yet billed", group: "Mandatory", actions: ["Automatic invoicing for amount due 0"], where: "Night Audit app → Actions", step: "p5-individual" },
    { no: 6,  name: "Invoices not yet paid", group: "Mandatory", actions: [], where: "Click the reservation number → Folio Management → take the payment", step: "p6-invoices" },
    { no: 7,  name: "Payments on Hold", group: "Optional", actions: [], where: "Report only — note anything unusual in the handover", step: "p7-hold" },
    { no: 8,  name: "Remaining room move / change", group: "Mandatory", actions: [], where: "TMS — record or remove the planned room move", step: "p8-room-move" },
    { no: 9,  name: "Cancel / no-show reservations with pending charges", group: "Mandatory", actions: [], where: "Click the reservation → settle the charges", step: "p9-cancel-noshow" },
    { no: 10, name: "Locked reservations in EMMA TMS", group: "Mandatory", actions: [], where: "TMS — exit the reservation named by the app", step: "p10-locked" },
    { no: 11, name: "POS Outlets not closed", group: "Mandatory", actions: [], where: "POS / till of the outlet — close it", step: "p11-pos" },
    { no: 12, name: "Events not Checked-In", group: "Mandatory", actions: [], where: "TMS — on the Event", step: "p12-events-ci" },
    { no: 13, name: "Events not Checked-Out", group: "Mandatory", actions: [], where: "TMS — on the Event", step: "p13-events-co" }
  ],

  /* What changed compared with the old TMS night: short answers for the first nights. */
  faq: [
    { q: "What is new compared with the Night Audit in TMS?",
      a: "The blockers are no longer found one by one in SAP: the Night Audit app in EMMA v2 (Fiori) lists all of them as <b>processes</b> on one screen, with a counter per process, and the first five can be solved directly there with the <b>Actions</b> menu (express check-in / check-out, date changes, no-show, automatic invoicing). The reports, hotelkit checklist and handover stay as before — see the <b>Night Audit</b> tab → Guidebook." },
    { q: "Which processes can I solve inside the app?",
      a: "Only processes <b>1 – 5</b>: Expected arrivals not Checked-In, Expected departures not Checked-Out, Events &amp; Groups Limit Billing date, Day-Guest Billing not yet billed, Individual reservations not yet billed. Every other process is a report: it tells you what is wrong and you fix it in TMS or Folio Management, then refresh." },
    { q: "What does “1 day per default” mean?",
      a: "When you change an arrival date, a departure date or a limit billing date from the app, the system proposes <b>tomorrow</b> (today + 1). That is enough for the night: the day team corrects the real date in the morning if needed." },
    { q: "The express check-in is not offered / does nothing.",
      a: "Express check-in needs a <b>pre-assigned room</b>. Assign a room on the reservation first, then run the action again." },
    { q: "Express check-out is refused.",
      a: "All folios of the reservation must be <b>correctly invoiced and paid</b>. Open the reservation, invoice and settle the folio (or route it as the reservation says), then run express check-out again. If it cannot be settled tonight, extend the departure (process 2, Move to virtual) and put it in the handover." },
    { q: "I changed the arrival date and the City Tax disappeared.",
      a: "That happens when the new arrival date equals the departure date: the stay becomes a <b>day use</b>. The room price stays, the City Tax is deleted and a pop-up informs you. If the guest really stays the night, the departure date must be moved too." },
    { q: "A no-show is shown with a cancellation / penalty fee.",
      a: "The reminder appears every time you set a no-show. If the fee must <b>not</b> be charged, navigate to the reservation and remove the fees after setting the status. The decision follows the booking conditions and the hotel's no-show rule — see the Night Audit guidebook, part D." },
    { q: "“Night audit is locked by another user” appears at the bottom.",
      a: "Another user has the Night Audit open at the same time. Do not execute. Find out who it is (a colleague, or your own second window / session) and let them leave the app, then refresh." },
    { q: "A process has no Actions menu.",
      a: "It is an informative process (6 – 13). Solve it where the step says — Folio Management, TMS, the POS — and press the refresh arrow next to <i>Show all</i>. The count updates and the process turns green." }
  ],

  /* Visual SOP: the DEFRAAIR "EMMA v2 (Fiori) – New Night Audit functions, step-by-step visual guide"
     (16 pages, English, October 2026), reproduced page by page. Checked against the Radisson source
     SOP: every process, action and default matches. Two edits: the managers named in the document are
     written as FOM / GM here (no staff names in this repository), and Payment on Hold is marked as the
     Optional process it is in the app. Pages 8, 10 and 11 have no screenshot in the source SOP; the
     document shows a workflow instead, kept here. */
  visual: {
    eyebrow: "Park Inn / DEFRAAIR · Front Office + Night Operations",
    title: "EMMA v2 (Fiori) · New Night Audit functions",
    sub: "Step-by-step visual guide · English explanations with original EMMA labels",
    count: { n: 13, title: "Processes in the source SOP", line: "5 with actions in the Night Audit app · 8 informative-only reports" },
    confirms: {
      title: "What the source document confirms",
      lead: "The five-page SOP is an overview of new EMMA v2 (Fiori) Night Audit functions. It is not a complete click-by-click manual or a general payment authorization.",
      text: "Screenshots show training examples. Their hotel, dates and reservations are not DEFRAAIR live data. For real operations, verify the hotel business date, booking terms and the most recent confirmed instructions of the FOM / GM."
    },
    safety: "<b>Safety check:</b> actions in the Night Audit app do not replace reviewing invoices, folios, VCCs, guarantees, City Tax and hotel date. Never change a reservation simply to clear an error without checking its operational and financial impact.",
    pages: [
      { no: 1, title: "Expected arrivals not Checked-In", sub: "Expected arrivals that have not been checked in", kind: "action", src: "Source SOP · page 1",
        img: "na2-arrivals.png", zoom: "na2-zoom-arrivals.png", step: "p1-arrivals",
        steps: ["Open <b>Expected arrivals not Checked-In</b> in the left-hand process list.", "Select the appropriate reservation using its checkbox, then open <b>Actions</b>.", "Choose the correct action: <b>Express check-in</b>, <b>Change arrival date</b> or <b>Change status to no-show</b>.", "Verify the new status and refresh the list before continuing."],
        check: "Express check-in requires a pre-assigned room. Changing arrival date defaults to +1 day; scheduled charges / routing and other cadence items move, and Special Tax is adjusted. For day use, City Tax is removed while room price remains. Verify actual arrival and no-show fee before acting.", checkKind: "important" },
      { no: 2, title: "Expected Departures not Checked-Out", sub: "Expected departures that are still not checked out", kind: "action", src: "Source SOP · page 2",
        img: "na2-departures.png", zoom: "na2-zoom-departures.png", step: "p2-departures",
        steps: ["Open <b>Expected departures not Checked-Out</b> and select the correct reservation.", "Under <b>Actions</b>, choose <b>Move to virtual and extend departure date</b> (+1 day by default, code Z001), or <b>Express Check-Out</b>.", "After the action, verify the date, reservation status and remaining list."],
        check: "Express Check-Out is permitted only when ALL folios are correctly invoiced and paid. Do not use virtual room Z001 to conceal an outstanding balance or other unresolved payment issue.", checkKind: "important" },
      { no: 3, title: "Event & Group reservations Limit Billing date", sub: "Billing deadline for events and group reservations", kind: "action", src: "Source SOP · page 2",
        img: "na2-events-groups.png", zoom: "na2-zoom-events-groups.png", step: "p3-limit-billing",
        steps: ["Open <b>Event &amp; Group reservations Limit Billing date</b>.", "Confirm that the event or group reservation has not yet been invoiced.", "Select the item and choose <b>Actions → Move limit billing date</b>.", "Verify the new deadline (+1 day by default) and refresh the result."],
        check: "This changes the Limit Billing Date, not automatically the Event End Date or group departure. If EMMA prevents a historic check-out reversal, do not force unrelated changes; escalate the case.", checkKind: "important" },
      { no: 4, title: "Day Guest Billing in Check-Out, not yet billed", sub: "Day-guest stays checked out but not yet invoiced", kind: "action", src: "Source SOP · page 2",
        img: "na2-dayguest.png", zoom: "na2-zoom-dayguest.png", step: "p4-dayguest",
        steps: ["Open <b>Day Guest Billing in Check-Out, not yet billed</b>.", "Select the relevant case and open the <b>Actions</b> menu.", "The SOP lists <b>DG Billing: Modify departure date</b> (+1 day by default) and <b>Automatic invoicing for amount due 0</b>.", "Verify the departure date and invoice state after any action."],
        check: "Do not automatically invoice a stay with an outstanding due amount or unclear postings / folio. The source SOP does not specify a complete financial-error resolution workflow.", checkKind: "important" },
      { no: 5, title: "Individual reservations in Check-Out, not yet billed", sub: "Individual check-outs with final invoicing pending", kind: "action", src: "Source SOP · page 3",
        img: "na2-individual.png", zoom: "na2-zoom-individual.png", step: "p5-individual",
        steps: ["Open <b>Individual reservations in Check-Out, not yet billed</b>.", "Check the exact reservation and Due Amount.", "Use <b>Automatic invoicing</b> ONLY if due amount = 0.", "Verify the invoice was generated correctly and the case cleared."],
        check: "A zero Due Amount does not replace a folio accuracy check. For uncertain balances, routing or payment records, confirm the facts before creating an invoice.", checkKind: "important" },
      { no: 6, title: "Invoices not yet paid", sub: "Invoices issued but awaiting payment", kind: "info", src: "Source SOP · page 3",
        img: "na2-invoices.png", step: "p6-invoices",
        steps: ["Open <b>Invoices not yet paid</b> and review the unpaid invoice list.", "The Night Audit app cannot directly process payment on this list.", "Select the <b>Reservation Number</b> to open Folio Management.", "Review the payment there and follow the applicable authorization procedure."],
        check: "This is NOT a Pay All command. Before a charge, identify the responsible payer (guest, company, OTA or VCC), the payment method and any required authorization.", checkKind: "info" },
      { no: 7, title: "Payment on Hold", sub: "Payments currently flagged as On Hold · listed under Optional in the app", kind: "info", src: "Source SOP · page 3",
        img: "na2-payments-hold.png", step: "p7-hold",
        steps: ["Open <b>Payment on Hold</b> and review the affected reservations.", "This is an information-only report: no direct NA app action is available.", "Refer each item to the appropriate payment module or responsible team.", "Record unresolved cases for the morning handover."],
        check: "The SOP does not provide a process to release or cancel a Payment on Hold. Do not issue a capture, refund or cancellation solely because this alert appears.", checkKind: "info" },
      { no: 8, title: "Remaining room move/change", sub: "Planned room moves or room changes still pending", kind: "info", src: "Source SOP · page 4",
        flow: [["Report", "Remaining room move/change"], ["Verify", "Room and planned change"], ["Handover", "FO / Housekeeping follow-up"]], step: "p8-room-move",
        steps: ["Open <b>Remaining room move/change: list of rooms</b>.", "Identify rooms with a pending move or planned change.", "This process is informative only in the Night Audit app.", "Verify the real status in the relevant system and inform FO / HSK."],
        check: "The SOP provides no screenshot or detailed editing steps for this list. Do not assume a room is vacant or available solely because a move has been scheduled.", checkKind: "info" },
      { no: 9, title: "Cancel/no-show reservations with pending charges", sub: "Cancelled / no-show bookings with unsettled charges", kind: "info", src: "Source SOP · page 4",
        img: "na2-cancel-noshow.png", step: "p9-cancel-noshow",
        steps: ["Open <b>Cancel/no-show reservations with pending charges</b>.", "Identify the reservation and the charges still pending.", "This report is informative but lets you navigate to the reservation.", "Review its payment terms and settle charges only under local procedure."],
        check: "A cancellation is not automatically an actual no-show. Verify guarantee, prepaid / OTA / VCC terms, the booking date, applicable conditions and approval before charging.", checkKind: "info" },
      { no: 10, title: "Locked reservations in EMMA TMS", sub: "Reservations locked in TMS and blocking Night Audit", kind: "info", src: "Source SOP · page 4",
        flow: [["Report", "Locked reservations"], ["Open EMMA TMS", "Exit the affected reservation"], ["Refresh", "Recheck Night Audit"]], step: "p10-locked",
        steps: ["Open <b>Locked reservations in EMMA TMS</b>.", "Read the reservation number and the transaction shown as locked.", "Open EMMA TMS and exit the affected reservation to release the lock.", "Refresh Night Audit and check if the obstruction was removed."],
        check: "If a colleague has the reservation open, ask them to exit it properly. Do not use unauthorized methods to terminate another user session.", checkKind: "info" },
      { no: 11, title: "POS Outlets not closed", sub: "POS outlets still open for the relevant business date", kind: "info", src: "Source SOP · page 5",
        flow: [["Report", "POS outlets not closed"], ["Outside Night Audit", "Close the outlet in POS"], ["Refresh", "Recheck Night Audit"]], step: "p11-pos",
        steps: ["Open <b>POS Outlets not closed</b> and identify the affected outlet.", "The NA app cannot close POS outlets directly.", "Contact the responsible outlet team for settlement and closure.", "Return to Night Audit after closure and refresh the checks."],
        check: "Do not claim Night Audit is complete while an outlet closure remains mandatory. The source SOP does not supply POS closure buttons or key sequences.", checkKind: "info" },
      { no: 12, title: "Events not Checked-In", sub: "Events whose check-in status has not been completed", kind: "info", src: "Source SOP · page 5",
        img: "na2-events-not-ci.png", step: "p12-events-ci",
        steps: ["Open <b>Events not Checked-In</b> and identify the exact Event ID.", "No direct action is available in NA: navigate to EMMA TMS.", "Open the event and verify its dates, status and whether it actually took place.", "Correct the status only when operational facts and authorization support it; refresh the report."],
        check: "Do not check in a tentative, offer or historical event just to clear a warning. If the event status is unclear, seek confirmation from Sales / M&amp;E or FOM.", checkKind: "info" },
      { no: 13, title: "Events not Checked-Out", sub: "Events still open or not checked out in EMMA TMS", kind: "info", src: "Source SOP · page 5",
        img: "na2-events-not-co.png", step: "p13-events-co",
        steps: ["Open <b>Events not Checked-Out</b> and identify the Event ID.", "The NA app does not check out the event: open the event in EMMA TMS.", "Review event date, status, billing and the current hotel date.", "Perform only changes allowed by EMMA and hotel procedure, then refresh."],
        check: "If TMS reports “Check-out cannot be cancelled, not in hotel date”, do not force a historical reversal or storno. Document and escalate to the FOM / GM.", checkKind: "info" }
    ],
    checklist: {
      title: "Before completing Night Audit",
      sub: "Practical shift checklist; additional operational controls are separate from the source overview.",
      items: [
        { id: "date", title: "Business date", text: "Use the actual hotel business date, not the dates shown in source screenshots." },
        { id: "mandatory", title: "Mandatory problems", text: "Review all flagged processes. Information-only lists must be resolved outside the NA app." },
        { id: "payments", title: "Payments and folios", text: "No Express Check-Out unless all folios are accurately invoiced and paid." },
        { id: "events", title: "Event billing", text: "Do not confuse Limit Billing Date with Event End Date; do not force a historical reversal." },
        { id: "locks", title: "Locks and POS", text: "Release locked reservations through TMS and have the proper outlet close open POS sessions." },
        { id: "proof", title: "Proof of completion", text: "Verify the real Night Audit completion message; document unresolved exceptions." },
        { id: "hotelkit", title: "Hotel Kit handover", text: "Attach required reports; FOM sign-off only from the FOM, GM sign-off only from the GM." }
      ],
      scope: "Source scope: functional overview only. Local filters, permissions and workflows not shown in the SOP require live verification."
    }
  }
};
