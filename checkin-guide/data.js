/* Check-in Guide — content.
   Source material: SAP (TMS) screenshots from the front desk, step by step, and the
   Front Office SOPs 4.7 On the day rates, 4.8 Early Arrivals, 4.9 Gastanreise,
   4.10 Check-in procedure and 4.10 Credit Card Authorisation und Barzahlung.
   The guide grows as new screenshots arrive; add the next steps at the end of `steps`.
   No guest names, reservation numbers, room numbers, contact data or card data are stored
   here; all screenshots were redacted before being added. */
window.CIG = {

  phases: [
    { id: "find",   no: "A", title: "Find the arrival",  sub: "House status → Arrivals expected → Check In" },
    { id: "screen", no: "B", title: "Check-in screen",   sub: "Remarks, room" },
    { id: "billing", no: "C", title: "Billing",          sub: "Billing Information, Modify header, bill to" },
    { id: "extras",  no: "D", title: "Extras",           sub: "Breakfast, parking and other stay options" },
    { id: "folio",   no: "E", title: "Folio & payment",  sub: "Folio maintenance, Create invoice, Payment Gateway" },
    { id: "key",     no: "F", title: "Key card",         sub: "Record key, encoder, hand over" }
  ],

  rules: [
    { icon: "card", title: "Card authorisation",
      text: "Read the guest's card with <b>Chip&amp;Pin</b>. The amount is all nights <b>+ €50 per night</b> for extras. Show it on the display and tell the guest it is <b>not a charge</b>." },
    { icon: "cash", title: "No card → cash or direct bill",
      text: "Cash: the full stay <b>+ €50 per night</b> is paid at check-in. No deposit for extras → the account is set to <b>No-Post</b>. Direct bill needs no card only when <b>everything</b> goes a/c." },
    { icon: "form", title: "Registration form complete",
      text: "First and last name, home address, passport no. (non-German guests), <b>Business or Leisure</b> (Frankfurt tourism tax) and signature. In a double room one person's full details are enough." },
    { icon: "stop", title: "Floor only, never the room number",
      text: "When you hand over the key card, say the <b>floor</b>, not the room number. VIP arrivals: complete discretion, no information about a guest leaves the desk." }
  ],

  steps: [
    /* ---------------- A. FIND THE ARRIVAL ---------------- */
    { id: "house-status", phase: "find", title: "Open House status",
      lead: "Every check-in starts from House status.",
      where: "SAP Easy Access <b>TMS_All</b> → Favorites → <b>House status</b>",
      how: [
        "In <b>SAP Easy Access</b> find <b>House status</b> in the Favorites list.",
        "<b>Double-click</b> House status."
      ],
      check: "The screen <b>PI Frankfurt Airport – HOUSE STATUS</b> opens with today's date.",
      imgs: [
        { src: "ci-favourites.png", cap: "Favorites → double-click <b>House status</b>." }
      ] },

    { id: "arrivals", phase: "find", title: "Open the expected arrivals",
      lead: "The number next to Arrivals Expected opens the list of today's arrivals.",
      where: "House status → tab <b>Activity</b> → line <b>Arrivals Expected</b>",
      how: [
        "Check the <b>Date</b> at the top: it must be today.",
        "In the line <b>Arrivals Expected</b>, <b>double-click the number</b> under <b>Room</b>."
      ],
      check: "The list <b>Arrivals Expected</b> opens: name, reservation, room, meal plan, adults/children, arrival, departure, room type, company/channel.",
      imgs: [
        { src: "ci-house-status.png", cap: "Line <b>Arrivals Expected</b> → double-click the number in the <b>Room</b> column." }
      ] },

    { id: "select", phase: "find", title: "Select the reservation and press Check In",
      lead: "Find the guest in the list and open the check-in for that reservation.",
      where: "Arrivals Expected (list)",
      how: [
        "Find the guest: the list is sorted by <b>Guest or Group's name</b>.",
        "Compare <b>arrival</b>, <b>departure</b>, <b>adults / children</b> and <b>room type</b> with what the guest tells you.",
        "Select the <b>whole line</b>: click the grey box at the very left of the line.",
        "Press <b>Check In</b>."
      ],
      check: "The screen <b>DEFRAAIR. Check In.</b> opens with the guest's name in the title.",
      stop: "Two guests with the same or a similar name? Open the right one by comparing the dates and the company/channel (<b>Name 1</b>), not just the name.",
      imgs: [
        { src: "ci-arrivals.png", cap: "Arrivals Expected: select the whole line (grey box on the left), then <b>Check In</b>. Names, reservation and room numbers are covered." }
      ] },

    /* ---------------- B. CHECK-IN SCREEN ---------------- */
    { id: "enter", phase: "screen", title: "Press Enter to open the screen for editing",
      lead: "The check-in screen first opens read-only. Enter makes it editable.",
      where: "DEFRAAIR. Check In. → tab <b>General Data</b>",
      how: [
        "Read the reservation first: <b>Arrival</b>, <b>Nights</b>, <b>Depart.</b>, <b>RoomType</b>, <b>Guests</b>, <b>Meal Plan</b> in the guest list (BB = with breakfast, RO = room only).",
        "Read the <b>Remarks</b> on the right (for example how the stay is paid).",
        "Press <kbd>Enter</kbd>.",
        "Now the fields can be written in, including the <b>Remarks</b>, and the toolbar appears at the top: <b>Welcome Card</b>, <b>Assign room</b>, <b>Save without check-in</b>, <b>Check-in in queue</b>."
      ],
      check: "The toolbar with <b>Assign room</b> and <b>Check-in in queue</b> is visible at the top.",
      imgs: [
        { src: "ci-screen.png", cap: "Check-in screen as it opens — read-only, no toolbar yet." },
        { src: "ci-screen-edit.png", cap: "After <kbd>Enter</kbd>: fields editable, toolbar at the top." }
      ] },

    { id: "room", phase: "screen", title: "Select the room",
      lead: "Give the guest a room of the booked room type.",
      where: "Check-in screen → field <b>Room</b> (yellow)",
      how: [
        "Click in the yellow field <b>Room</b>.",
        "Choose a room of the booked <b>RoomType</b>.",
        "Upgrade? Tell the guest that they receive an upgrade."
      ],
      check: "The room number is in the <b>Room</b> field.",
      tip: "Guest arrives before the room is ready (early arrival)? Use <b>Check-in in queue</b>: the guest has registered and paid, and you can see how long they have been waiting. Call Housekeeping to clean that room first.",
      imgs: [
        { src: "ci-screen-edit.png", cap: "Yellow field <b>Room</b>. The toolbar also has <b>Assign room</b> and <b>Check-in in queue</b>." }
      ] }
,

    /* ---------------- C. BILLING ---------------- */
    { id: "billing-info", phase: "billing", title: "Open Billing Information",
      lead: "Here you see who pays and on which rate.",
      where: "Reservation screen → tab <b>*Billing Information</b>",
      how: [
        "Click the tab <b>*Billing Information</b> (next to General Data).",
        "Look at <b>Client information</b> (Receiver, Holder, Payer), <b>Contract</b> and <b>Rate</b>, <b>Card information</b> and <b>Pre-authorization</b>."
      ],
      check: "You know who pays: the guest, a company or a travel agent.",
      imgs: [
        { src: "ci-billing.png", cap: "Tab <b>*Billing Information</b>: Client information, Contract / Rate, Card information, Pre-authorization." }
      ] },

    { id: "modify-header", phase: "billing", title: "Press Modify header",
      lead: "Opens the reservation for changes.",
      where: "Toolbar at the top → <b>pencil</b> icon (second icon)",
      how: [
        "Click the <b>pencil</b> icon <img class='ico' src='img/ci-modify-icon.png' alt='Modify header icon'> — <b>Modify header</b> — in the toolbar.",
        "The icon stays pressed and the fields can be changed."
      ],
      check: "The pencil icon is pressed and the <b>Room</b> field is yellow.",
      imgs: [
        { src: "ci-modify-header.png", cap: "After the click: pencil pressed, the fields can be changed." }
      ] },

    { id: "bill-to", phase: "billing", title: "Bill to: company or guest",
      lead: "Decide who the invoice is made out to.",
      where: "Column <b>Bill to</b> <img class='ico ico-lg' src='img/ci-bill-to.png' alt='Bill to column'>",
      how: [
        "<b>The guest asks for an invoice to a company:</b> open the name search. The window <b>Restrict Value Range</b> opens on the tab <b>Companies</b>.",
        "Type the company name in <b>Name</b> and press the <b>green tick</b> or <kbd>Enter</kbd>. Choose the company from the list — its client number is written in <b>Bill to</b>.",
        "<b>Nothing requested:</b> type the code <code>100</code> (GUEST, DIRECT) and press <kbd>Enter</kbd>, or <code>400</code> (Generic Company) and <kbd>Enter</kbd>, and go to the next step."
      ],
      check: "<b>Bill to</b> shows the company's client number, or <code>100</code> / <code>400</code>.",
      tip: "<code>100</code> = <b>GUEST, DIRECT</b> (the same as <b>Client: 100</b> at the top of the reservation). <code>400</code> = <b>Generic Company</b>.",
      imgs: [
        { src: "ci-company-search.png", cap: "<b>Restrict Value Range</b> → tab <b>Companies</b>: company name in <b>Name</b>, then the green tick or Enter." }
      ] }
,

    /* ---------------- D. EXTRAS ---------------- */
    { id: "stay-options", phase: "extras", title: "Add breakfast, parking or another extra",
      lead: "Only when the guest wants something that is not in the rate — for example breakfast or parking.",
      where: "Toolbar at the top → <b>Stay options</b> icon <img class='ico' src='img/ci-stay-icon.png' alt='Stay options icon'>",
      how: [
        "After the bill to (100 / 400), click the <b>Stay options</b> icon in the toolbar.",
        "The list of extras opens: code, description, price and price type (<b>Per Pax</b> = per person, <b>Per room</b>).",
        "Find the line: breakfast = <code>FB_BB</code> <b>Upsell – Breakfast</b> (€17 per person); parking = <code>OR_PRKG</code> <b>Parking</b> (€25 per night).",
        "On that line, click the <b>second box</b> on the right. The line turns <b>green</b>.",
        "The extra is added to <b>Folio maintenance</b>."
      ],
      check: "The line is green and the extra appears in <b>Folio maintenance</b>.",
      tip: "Prices in the list (October 2026): <b>Breakfast €17 per person</b>, <b>Parking €25 per night</b>, Extra bed €25, Early check-in €25, Welcome gift €15, Pet €8, Welcome drink / cocktail €7.50, Transportation €6 per person. Always check the price shown in the list.",
      stop: "Tell the guest the price before you add it, and that breakfast is charged per person. For breakfast use <b>FB_BB</b> — not WUFB_BRFS or FB_BBOA.",
      imgs: [
        { src: "ci-stay-toolbar.png", cap: "Reservation toolbar: the <b>Stay options</b> icon (star)." },
        { src: "ci-stay-breakfast.png", cap: "Breakfast: line <b>FB_BB – Upsell – Breakfast</b>, €17 per person." },
        { src: "ci-stay-parking.png", cap: "Parking: line <b>OR_PRKG – Parking</b>, €25 per night." },
        { src: "ci-stay-options.png", cap: "Stay options: a chosen extra is <b>green</b> with the second box ticked (top line)." },
        { src: "ci-stay-options-2.png", cap: "Further down the list: welcome drink, pet, parking, transport, welcome gift, extra bed, early check-in." }
      ] }
,

    /* ---------------- E. FOLIO & PAYMENT ---------------- */
    { id: "folio", phase: "folio", title: "Open Folio maintenance",
      lead: "All charges of the stay, split into folios F1 – F4.",
      where: "Reservation toolbar → <b>Folio maintenance</b> icon <img class='ico' src='img/ci-folio-icon.png' alt='Folio maintenance icon'>",
      how: [
        "Click the <b>Folio maintenance</b> icon in the reservation toolbar.",
        "The screen <b>DEFRAAIR. Modify items of all folios</b> opens.",
        "At the top: Main Client, arrival / departure, room type and the total of each folio (<b>F1</b>, <b>F2</b>, <b>F3</b>, <b>F4</b>).",
        "Below: every charge per night — for example <b>Bed and Breakfast</b> and <b>Touristic Tax</b> — with the total in the yellow line."
      ],
      check: "The charges and the total in <b>F1</b> match the booking: nights, rate and the extras you added.",
      imgs: [
        { src: "ci-folio-toolbar.png", cap: "Reservation toolbar: the <b>Folio maintenance</b> icon (third from the left in this picture)." },
        { src: "ci-folio.png", cap: "<b>Modify items of all folios</b>: F1 with room and tourist tax per night and the total. Name, reservation and voucher are covered." }
      ] },

    { id: "create-invoice", phase: "folio", title: "Take payment only with Create invoice",
      lead: "Payment is done only through Create invoice.",
      where: "Folio maintenance → toolbar of the folio (<b>F1</b>) → <b>Create invoice</b> <img class='ico' src='img/ci-invoice-icon.png' alt='Create invoice icon'>",
      how: [
        "In the toolbar of the folio that is paid (usually <b>F1</b>), find the orange icons on the right.",
        "Click <b>Create invoice</b> — the first orange icon."
      ],
      stop: "Take the payment <b>only</b> with <b>Create invoice</b>, never in another way.",
      imgs: [
        { src: "ci-folio-f1-toolbar.png", cap: "Folio F1 toolbar: <b>Create invoice</b> is the first of the orange icons." }
      ] }
,

    { id: "invoice-email", phase: "folio", title: "Invoice by e-mail / print → Continue",
      lead: "After Create invoice a small window asks about e-mail and printing.",
      where: "Window <b>Print and/or send invoice by e-mail</b>",
      how: [
        "The window offers Reservation E-mail, Other E-mail, No E-mail and Print.",
        "Click the <b>green tick</b> (Continue)."
      ],
      check: "The screen <b>Till movements</b> opens.",
      imgs: [
        { src: "ci-invoice-email.png", cap: "<b>Print and/or send invoice by e-mail</b> → green tick (Continue)." }
      ] },

    { id: "till", phase: "folio", title: "Choose the till",
      lead: "The payment is booked on a till (Till Identifier).",
      where: "<b>Till movements (Starting image)</b> → <b>Till Identifier</b>",
      how: [
        "In <b>Till Identifier</b> choose <code>FD128</code> — the till for our company.",
        "Press <kbd>Enter</kbd>."
      ],
      check: "<b>Invoice payment movements</b> opens: Operation Type <b>Invoice payment</b>, the invoice, folio, customer and <b>Total Amount</b>.",
      note: "The screenshots show another till (FD136); always choose <b>FD128</b>.",
      imgs: [
        { src: "ci-till.png", cap: "<b>Till movements</b>: Till Identifier, then Enter." },
        { src: "ci-payment.png", cap: "<b>Invoice payment movements</b>: total amount, still open under <b>Differences</b>. Staff name, invoice and reservation are covered." }
      ] },

    { id: "payment-gateway", phase: "folio", title: "Payment method: always Payment Gateway",
      lead: "Every card payment goes through Payment Gateway.",
      where: "Invoice payment movements → column <b>Payment method</b>",
      how: [
        "Click the arrow in the first line under <b>Payment method</b>.",
        "Choose <b>Payment Gateway</b> — always, not JCB, Visa, Mastercard or another card from the list.",
        "The amount moves to <b>Accrued</b> and <b>Differences</b> becomes <b>0,00</b>."
      ],
      check: "Payment method <b>Payment Gateway</b>, <b>Differences 0,00</b>.",
      stop: "Do not choose a card type from the list. The payment method is <b>always Payment Gateway</b>.",
      imgs: [
        { src: "ci-payment-method.png", cap: "The list of payment methods → <b>Payment Gateway</b>." },
        { src: "ci-payment-gateway.png", cap: "Payment Gateway chosen: Accrued 371,00, Differences 0,00." }
      ] },

    { id: "save-charge", phase: "folio", title: "Save and charge: PinPad or card on the reservation",
      lead: "After Save the window TMSforPay. Gateway payment asks how the card is charged.",
      where: "Invoice payment movements → <b>Save</b> (disk icon at the top) → <b>TMSforPay. Gateway payment</b>",
      how: [
        "Press <b>Save</b>. The window <b>TMSforPay. Gateway payment</b> opens with the amount.",
        "<b>Charge via PinPad</b> — the guest pays now, at the desk, on the card terminal.",
        "<b>Import data from reservation</b> — a <b>VCC</b> or the guest's <b>credit card</b> is attached to the reservation and the guest has approved that this card is charged. The window <b>Selection the card</b> shows the cards on the reservation: choose the right one.",
        "Confirm with the <b>green tick</b>."
      ],
      stop: "<b>VCC</b>: charge only a virtual card whose holder name is the <b>company</b> — for example <b>Booking.com</b>, <b>Agoda</b>, <b>Ctrip</b> (in the card list: <i>Bookingcom Agent</i>). If the name on the card is not the company, do not charge it; ask the manager on duty.",
      tip: "<b>VCC:</b> the guest pays only the <b>tourist tax (CT)</b> — <b>€2 per person per night</b>. Everything else goes on the VCC.",
      imgs: [
        { src: "ci-gateway-pinpad.png", cap: "<b>Charge via PinPad</b>: the guest pays on the terminal at the desk." },
        { src: "ci-gateway-import.png", cap: "<b>Import data from reservation</b>: charge the card attached to the reservation." },
        { src: "ci-select-card.png", cap: "<b>Selection the card</b>: the cards on the reservation (numbers covered). A Booking.com VCC shows as <i>Bookingcom Agent</i>." }
      ] },

    { id: "paid-check", phase: "folio", title: "Check the folio: red = paid",
      lead: "Back in Folio maintenance the status light shows whether a line is paid.",
      where: "Folio maintenance → column <b>Stat…</b> (status)",
      how: [
        "Look at the status lights in the first column of the folio.",
        "<b>Red</b> = paid.",
        "<b>Green</b> = still open, not paid yet."
      ],
      check: "Every line that had to be paid is <b>red</b>.",
      tip: "Example with a VCC: only the <b>Touristic Tax</b> (TTAX, €2 per person per night) is in the guest's folio, and it is red — paid.",
      imgs: [
        { src: "ci-folio-status.png", cap: "Status light <b>red</b> = paid. Name, room, invoice number covered." }
      ] },

    { id: "back", phase: "folio", title: "Press Back",
      lead: "Return from the folio to the check-in screen.",
      where: "Toolbar at the top → <b>Back</b> (green arrow) <img class='ico ico-lg' src='img/ci-back-toolbar.png' alt='SAP toolbar with the Back button'>",
      how: [
        "Press <b>Back</b> — the green round arrow in the top toolbar.",
        "The check-in screen of the reservation is shown again."
      ],
      check: "You are on the check-in screen; the room is in the <b>Room</b> field." },

    /* ---------------- F. KEY CARD ---------------- */
    { id: "record-key", phase: "key", title: "Record key",
      lead: "Write the key card for the room.",
      where: "Check-in screen → toolbar → <b>Record key</b> <img class='ico' src='img/ci-record-key-icon.png' alt='Record key icon'>",
      how: [
        "Click <b>Record key</b> in the toolbar of the check-in screen.",
        "The window <b>Key recording process</b> opens: reservation, arrival and departure, key validity (<b>Valid from</b>, <b>Valid. End date</b>, <b>Valid. End time</b>) and the room under <b>Rooms using Key</b>.",
        "Check that the end date is the <b>departure date</b>."
      ],
      check: "<b>Rooms using Key</b> shows the guest's room and the validity ends on the departure day.",
      imgs: [
        { src: "ci-record-key-toolbar.png", cap: "Check-in screen with a room: <b>Record key</b> is the fourth icon (pressed). Name, reservation, client number and room are covered." },
        { src: "ci-key-recording.png", cap: "<b>Key recording process</b>: validity until the departure day 12:00, the room under <b>Rooms using Key</b>." }
      ] },

    { id: "encode-key", phase: "key", title: "Save, encode the card and hand it over",
      lead: "The card is written on the black key encoder.",
      where: "Key recording process → <b>Save</b> (disk icon, bottom right) → black key encoder",
      how: [
        "Press <b>Save</b> (disk icon at the bottom right).",
        "Put the key card on the <b>black encoder</b>.",
        "Give the card to the guest with their name: say the <b>floor</b>, never the room number."
      ],
      check: "The card is written and the guest has it."
    }
  ],

  /* Special cases from the Front Office SOPs (4.7 – 4.10). */
  cases: [
    { q: "Guest arrives early (before 15:00)",
      a: "Check-in is from <b>15:00</b>. If a room is available, check in earlier. Otherwise give a room that is still dirty and ask Housekeeping to clean it first. The guest can already fill in the registration form and settle the payment; then put the reservation <b>in queue</b>. Luggage goes to the luggage room with a <b>luggage tag</b>." },
    { q: "Guest pays cash",
      a: "The full stay is paid at check-in, plus <b>€50 per night</b> as deposit for extras. The guest receives a payment confirmation from the system. If the guest does not want to leave a deposit, the account is set to <b>No-Post</b>: nothing can be charged to the room (restaurant, outlets, phone)." },
    { q: "Company or travel agent pays the room",
      a: "If the company's or agent's card pays the nights, authorise only the nights on it. Authorise the guest's own card only for possible extras. <b>Direct bill</b> needs no card only when <b>all</b> charges go to the account." },
    { q: "Guest has a voucher",
      a: "Check what the voucher includes: room with breakfast, room only, welcome drink. It is prepaid at the travel agency. Keep the voucher in the cost-coverage folder (Kostenübernahme); at departure it is sent to the agency with the invoice checked out to direct bill. A copy stays with the copy of the invoice in your cashier closing." },
    { q: "Booking with a VCC (Booking.com, Agoda, Ctrip …)",
      a: "The guest pays only the <b>tourist tax (CT)</b>: <b>€2 per person per night</b>. Everything else is charged to the VCC. Charge only a VCC whose holder name is the company." },
    { q: "Final bill will be higher than the authorisation",
      a: "During the stay check whether the guest's charges have gone over the authorised amount. If yes, authorise a further amount according to hotel policy." },
    { q: "Radisson Rewards member",
      a: "Full attention, thank them for being a member and explain their benefits in the hotel. <b>Gold</b> and <b>Concierge</b>: welcome letter and welcome gift. Every Rewards arrival gets a bottle of water." },
    { q: "VIP arrival",
      a: "Complete discretion. No information about a guest leaves the desk. Never ask for an autograph." },
    { q: "Walk-in or rate question",
      a: "Offer the highest rate first, before lower rates. A special rate depends on today's availability, the time of day and availability at Frankfurt Airport and City. An unsold room is lost forever — never send a guest away; if you are unsure, ask the FOM, SM or DM." },
    { q: "Guest asks you to park the car",
      a: "Staff never drive a guest's car into or out of the garage. You may help the guest, but never sit at the wheel." }
  ],

  /* What to say — SOP 4.9 Gastanreise. */
  phrases: [
    { when: "Welcome",
      de: "Herzlich willkommen im Park Inn Frankfurt Airport. Wie darf ich Ihnen behilflich sein?",
      en: "Welcome to the Park Inn Frankfurt Airport. How may I help you?" },
    { when: "Guest had to wait",
      de: "Herzlich willkommen im Park Inn Frankfurt Airport. Entschuldigen Sie, dass Sie warten mussten. Wie darf ich Ihnen behilflich sein?",
      en: "Welcome to the Park Inn Frankfurt Airport. I am sorry to keep you waiting. How may I help you?" },
    { when: "Confirm the booking",
      de: "Herr / Frau NAME, Ihre Buchung ist für X Personen und X Nächte. Möchten Sie ein Raucher- oder Nichtraucherzimmer?",
      en: "Mr / Ms NAME, your booking is for X people for X nights. Do you prefer a smoking or non-smoking room?" },
    { when: "Payment",
      de: "Wie möchten Sie die Rechnung begleichen, in bar oder mit Kreditkarte? Dürfte ich die Kreditkarte bitte im System einlesen?",
      en: "How would you like to settle your bill, by cash or by credit card? May I take your credit card, please?" },
    { when: "Card authorisation",
      de: "Das ist nur eine Autorisierung, keine Abbuchung. Der Betrag wird bei der Abreise wieder freigegeben.",
      en: "This is only an authorisation, not a charge. The amount is released when you check out." }
  ]
};
