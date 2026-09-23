/* LUME Night Audit — content.
   Everything staff read lives here; app.js only renders it.
   To change a procedure, edit the matching entry below. */
'use strict';

// SOP library (Full SOP tab). steps: [title, detail, search keywords]
const sections = [
  {
    id: "quick",
    title: "00 · Quick Runbook",
    subtitle: "Checklist për përdorim gjatë turnit",
    badge: "both",
    badgeText: "Checklist + Live",
    quick: true,
    intro: "Versioni i shkurtër. Shëno hapat gjatë turnit; progresi ruhet vetëm në këtë browser.",
    steps: [
      ["Kasse vom Spätdienst zählen + Sicherheitsrundgang", "Start of shift; receive handover and take responsibility for the night.", "start handover cash round"],
      ["Log into GXP", "Keep GXP active for cases and handover.", "gxp start"],
      ["Shift + F3 → House Status", "Check Arrivals / Departures and current house status.", "shift f3 house status arrivals departures"],
      ["Front Desk → Traces → FD → Search", "Resolve only completed traces; if unsure, leave unresolved.", "trace traces fd resolve search"],
      ["OOS / OOO control", "Review room inventory exceptions.", "rooms oos ooo"],
      ["A198 → Preview", "Check unrealistic rates and normal occupied rooms at 0.00; House Use may be 0.00.", "a198 rate check zero rate"],
      ["PM control + F&B Abrechnungen", "Do not start EOD until required Bar/F&B settlements are handed over. POS PMs are not extended.", "pm f&b abrechnung bar pos"],
      ["Minibar PM 9516", "Use Max Occupied Tonight as Qty; offset 10000 / 10010; balance 0.00; Check Out.", "minibar 9516 10000 10010"],
      ["Cover PM 9515", "Use PS101 breakfast guests + verified outlet counts; post 71049–71054; counter-post; balance 0.00; Check Out.", "cover 9515 ps101 71049 71050 71051 71052 71053 71054"],
      ["FreedomPay + D140 CC Check", "Compare by card type; Cashiers 100/101/102; IFC + ECOM; Negative Postings OFF.", "freedompay d140 credit card cc cashier 100 101 102 ifc ecom"],
      ["Kassenabmeldung + D140 Storno + Cash Count", "KK reconciliation; D140 Cashier 102 + Negative Postings ON; count Kasse 3.", "kassenabmeldung kk storno cash 102"],
      ["B184 Nationalitäten", "Complete missing data; exclude CXL / No Show as instructed.", "b184 nationality nationalitäten"],
      ["OPERA End of Day / Nachtlauf", "Country & State → Arrivals → Departures → C/O Zero POS PMs → Cashier 102 closure → Roll Business Date.", "eod nacht nachtluaf end of day c/o zero cashier 102"],
      ["Post-EOD reports", "E100, T122, %A136, P112, PS101, J146, R118 + VIP of the Day.", "reports e100 t122 a136 p112 ps101 j146 r118 vip"],
      ["Due Outs / VCC", "Read Comments/Alerts, inspect Billing window, confirm payer/coverage, then Payment.", "due outs vcc billing payment authorization"],
      ["Morning email package", "MOD, Kassenschnitt, Kassenprotokoll/F&B Abrechnung, Cover, Breakfast Forecast.", "email mod kassenschnitt kassenprotokoll cover breakfast forecast"]
    ]
  },
  {
    id: "start",
    title: "01 · Shift Takeover & Front Desk",
    subtitle: "Starti i natës, Traces dhe kontrollet bazë",
    badge: "check",
    badgeText: "Checkliste NEU",
    intro: "Këto janë kontrollet e fillimit të turnit para se të kalosh te financial pre-EOD.",
    steps: [
      ["Kasse vom Spätdienst zählen + Rundgang", "Count the Late Shift cash and complete the security round.", "cash late shift rundgang security"],
      ["Handover + GXP", "Receive Spätdienst handover and log into GXP.", "handover gxp"],
      ["Shift + F3", "House Status: arrivals, departures, occupancy information.", "shift f3 house status"],
      ["Front Desk → Traces → FD → Search", "Current LUME trainer rule. Resolve only when task is definitely completed.", "front desk traces fd resolve"],
      ["OOS / OOO", "Review Out of Service / Out of Order status.", "oos ooo room management"],
      ["Musik / Ordnung", "Check Front Desk, Lobby, Salon, Bibliothek.", "music lobby salon bibliothek"],
      ["Meldescheine / Emails", "Update/file registration forms and handle required emails.", "meldescheine email"],
      ["Downtime", "Print Downtime material; follow FIBS evacuation instruction where applicable.", "downtime fibs evacuation"]
    ]
  },
  {
    id: "gxp",
    title: "01A · GXP / Guest Experience",
    subtitle: "Cases, guest communication, Bonvoy context and handover",
    badge: "both",
    badgeText: "LUME + Marriott",
    intro: "Confirmed LUME Night: log into GXP at handover and use it for Night tasks assigned or handed over to you. The additional case/chat mechanics below come from LUME Front Office material and Marriott GXP guidance; exact Night ownership, response targets and property configuration follow current trainer/FOM instruction.",
    path: "EMPOWER: Guest Experiences (GXP) · authorized property access",
    steps: [
      ["Start of Night → GXP anmelden", "[Confirmed LUME Night] Log into GXP during Spätdienst handover and keep it available for the night.", "gxp login handover"],
      ["Review handed-over items", "Understand which guest issues, Cases or Follow Ups are explicitly handed over to Night before continuing the audit sequence.", "gxp cases handover"],
      ["Cases + guest requests", "[LUME FO reference] Front Office regularly checks GXP for Cases, new Bonvoy arrivals and guest requests. At Night, act on items owned by your shift or handed over; do not invent a new monitoring frequency.", "gxp cases guest requests"],
      ["Chat / CEC communication", "[Marriott GXP guidance] New chats appear as notifications; CEC cases appear in “GXP Customer Care Open Cases”. Respond/route according to the current property process. No unconfirmed LUME Night response-time target is added here.", "gxp chat cec customer care"],
      ["Follow Up status", "[Marriott GXP guidance] Use Follow Up when further employee or manager action is still required. Reading a Case is not the same as resolving it.", "gxp follow up"],
      ["Dispatch / Active status", "[Marriott GXP guidance] GXP supports dispatch groups and Active/Inactive user status. Night Audit should not change property dispatch rules or admin configuration without authorization.", "gxp dispatch active inactive"],
      ["Maintenance → Work Order", "[Marriott GXP guidance] A Case can become a Work Order for maintenance tracking. Use only LUME’s configured workflow; Transcendent integration at this property remains to be confirmed locally.", "gxp work order maintenance"],
      ["Bonvoy / Reviewed context", "[LUME FO reference] Late Shift checks new Bonvoy arrivals and marks reviewed next-day arrivals as “Reviewed” after the arrival check. Night continues this only when handed over or required by current instruction; do not duplicate completed work blindly.", "gxp bonvoy reviewed"],
      ["After EOD → %A136", "[Confirmed LUME Night] Review HSK Traces and enter the relevant required items into GXP. Do not assume OPERA synchronized them automatically.", "gxp a136 hsk traces"],
      ["Handover unresolved items", "Leave unresolved Cases / Follow Ups visible and hand over status, owner and next action. Do not close an item only to clear the list.", "gxp unresolved handover"]
    ]
  },
  {
    id: "rate",
    title: "02 · A198 Rate Check",
    subtitle: "Pre-EOD rate control",
    badge: "both",
    badgeText: "Checklist + Live",
    intro: "Qëllimi: të mos kalojë Room & Tax me rate të gabuar ose jo realist.",
    path: "Miscellaneous → Reports → A198 → Preview",
    steps: [
      ["Open A198 and Preview", "Use the business date being audited.", "a198 preview reports"],
      ["Scan every in-house rate", "Look for unrealistic values.", "rate check unrealistic"],
      ["Normal occupied room at 0.00 = investigate", "A normal occupied room should not run at 0.00 without a valid reason.", "zero rate occupied"],
      ["House Use may be 0.00", "Do not “fix” House Use solely because it is zero.", "house use zero"],
      ["If suspicious: investigate before changing", "Do not change a rate blindly; confirm reservation/rate arrangement.", "investigate rate do not guess"]
    ]
  },
  {
    id: "pm",
    title: "03 · PM Control & F&B Settlements",
    subtitle: "Çfarë duhet gati para Tagesabschluss",
    badge: "both",
    badgeText: "Checklist + Live",
    intro: "Live trainer instruction refines the checklist: applicable PMs have different handling; POS PMs are special.",
    steps: [
      ["Review PM accounts", "Some close, some extend one night, some stay untouched. Do not apply one rule to all PMs.", "pm accounts extend checkout"],
      ["POS PMs: do NOT extend", "They must be 0.00 and are handled in EOD with C/O Zero when applicable.", "pos pm zero c/o zero"],
      ["Wait for Bar/F&B Abrechnungen", "Do not start Tagesabschluss while required outlet settlements are missing.", "bar f&b abrechnung settlement"],
      ["Check Kellner Abrechnungen", "Examples in checklist: FBB, LPRF etc.", "fbb lprf waiter settlement"],
      ["Review final arrivals", "6 PM bookings, possible CXL, payment/card status, deposits and intended No-Shows.", "arrival 6pm cxl deposit no show"],
      ["No-Show room release", "Release only when appropriate; preserve VIP/Treatment/card exceptions.", "no show room unblock vip treatment"]
    ]
  },
  {
    id: "minibar",
    title: "04 · Minibar · PM 9516",
    subtitle: "Complimentary minibar correction",
    badge: "both",
    badgeText: "Checklist + Live Video",
    intro: "Ky është internal Minibar correction, jo guest minibar consumption.",
    path: "Shift + F3 → Max Occupied Tonight  |  Cashiering → Billing → PM 9516 → Post",
    steps: [
      ["Get Qty from Max Occupied Tonight", "Use the current night’s number; never reuse a training example such as 124.", "max occupied tonight qty 124"],
      ["Open PM 9516 → Post", "Work on the current Minibar daily PM.", "9516 billing post"],
      ["Find article 10050%", "After selection the posting row displays transaction code 10000.", "10050 article 10000"],
      ["Post 10000", "Displayed amount in training: -4.00 × Qty.", "10000 -4 minibar"],
      ["Counter-post 10010", "Displayed amount in training: +4.00 × the same Qty.", "10010 +4 minibar counter posting"],
      ["Check both Qty values match", "The two postings must use the same current room count.", "qty same count"],
      ["Balance must return to 0.00", "If not, stop and investigate.", "balance zero"],
      ["Close posting window → Check Out", "Use normal Check Out, not Check Out With Open Folio.", "checkout open folio"],
      ["File the Minibar invoice behind Stornos", "Folio can be retrieved via Cashiering → Cashier Functions → Folio History if needed.", "folio history invoice storno"]
    ]
  },
  {
    id: "cover",
    title: "05 · Cover · PM 9515",
    subtitle: "Daily F&B cover statistics",
    badge: "both",
    badgeText: "Checklist + Live Video",
    intro: "Breakfast included comes from PS101; outlet counts come from verified F&B sources/settlements.",
    path: "Cashiering → Billing → PM 9515 → Post",
    table: [
      ["71049", "COVER - BREAK OPERA"],
      ["71050", "COVER - BREAK F&B POS"],
      ["71051", "COVER - LPRF LUNCH"],
      ["71052", "COVER - LPRF DINNER"],
      ["71053", "COVER - IRD"],
      ["71054", "COVER - FBB"]
    ],
    steps: [
      ["Get PS101 breakfast guest count", "Use Persons / Total incl. in the demonstrated workflow, not the total in-house headcount.", "ps101 breakfast total incl persons"],
      ["Add verified F&B cover counts", "Use the actual business-date counts for Breakfast POS, LPRF Lunch/Dinner, IRD, FBB.", "f&b cover counts"],
      ["Post applicable 71049–71054 rows", "Guest count is entered in Qty; training showed Amount 1.00 / Window 1.", "71049 71050 71051 71052 71053 71054 qty"],
      ["Select the new postings", "Use only the postings that belong to this Cover workflow.", "select all cover postings"],
      ["Adjust Transaction → Adjust by Selected Postings", "Start the Cover counter-posting.", "adjust transaction"],
      ["Reason Code KOR-A", "Current demonstrated Cover adjustment reason.", "kor-a"],
      ["Percentage -100", "Counter-post the selected Cover entries.", "-100 percent"],
      ["Reason Text: Gegenbuchung", "Use the demonstrated reason text.", "gegenbuchung"],
      ["Balance must return to 0.00", "Verify before Check Out.", "balance zero cover"],
      ["Check Out PM 9515", "Current live workflow checks out the daily PM.", "9515 checkout"],
      ["Double-check Cover + send evidence", "Checklist requires double-check and a screenshot to AFOM.", "cover screenshot afom"]
    ]
  },
  {
    id: "cc",
    title: "06 · FreedomPay + D140 CC Reconciliation",
    subtitle: "Credit-card reconciliation by card type",
    badge: "both",
    badgeText: "Checklist + Live Video",
    intro: "Mos përdor një grand total të vetëm; krahaso llojet e kartave.",
    steps: [
      ["FreedomPay → Transaktionszusammenfassung nach Kartentyp", "Run report for the audit Business Date; export Excel.", "freedompay card type excel business date"],
      ["OPERA → Miscellaneous → Reports → D140", "Open D140 for the same audit date.", "d140 reports"],
      ["Cashiers = 100, 101, 102", "Credit-card reconciliation scope.", "cashier 100 101 102"],
      ["Transaction Codes lookup: IFC + ECOM", "Select the relevant current card transaction codes.", "ifc ecom visa mastercard amex ec unionpay"],
      ["Negative Postings Only = OFF", "This distinguishes CC reconciliation from D140 Storno.", "negative postings off"],
      ["Revenue = Gross", "Confirmed live parameter.", "gross revenue"],
      ["Group By = Transaction Code", "Confirmed live parameter.", "group by transaction code"],
      ["Sort Order = Chronological", "Confirmed live parameter.", "chronological sort"],
      ["Preview and compare by card type", "FreedomPay vs OPERA; do not force differences to zero.", "compare reconciliation card type balance"]
    ]
  },
  {
    id: "cash",
    title: "07 · Kassenabmeldung, D140 Storno & Cash",
    subtitle: "KK, Kasse 3 dhe negative postings",
    badge: "both",
    badgeText: "Checklist + Live Video",
    intro: "Kasse 3 count is done before EOD; Cashier 102 closure itself happens inside EOD.",
    path: "L:\\2.FNV_KASSENABMELDUNG\\Kassenabmeldung Neu.xlsx",
    steps: [
      ["Open sheet KK", "Use for card reconciliation.", "kk sheet kassenabmeldung"],
      ["Check Gesamt CC-FO / Gesamt CC-Freedompay / Oracle FO / Oracle LPRF&FBB / Gutschriften / Balance", "Grey cells/formulas must not be deleted.", "gesamt cc freedompay oracle lprf fbb gutschriften balance"],
      ["D140 Storno: Cashier 102", "Separate report use from CC reconciliation.", "d140 storno cashier 102"],
      ["Negative Postings Only = ON", "Transaction Code field was blank in demonstrated workflow.", "negative postings on"],
      ["Preview → Print → Sign", "Current LUME checklist control.", "preview print sign"],
      ["Count Kasse 3 / Cash", "Check Kassenstock, denominations, Petty Cash Notes, Drop Schicht 1/2/3, Drop Total, Drop Oracle, Differenz.", "cash count kasse 3 kassenstock petty cash drop oracle differenz"],
      ["Do not manually close Cashier 102 before EOD", "Automatic cashier closure is part of EOD.", "cashier 102 close eod"]
    ]
  },
  {
    id: "b184",
    title: "08 · B184 Nationalitäten",
    subtitle: "Country / nationality data control",
    badge: "check",
    badgeText: "Checkliste NEU",
    intro: "Before EOD, complete missing nationality data where supported by the actual guest/reservation record.",
    steps: [
      ["Run/check B184", "Use the current audit date and hotel process.", "b184 nationality"],
      ["Complete missing data only when known", "Never invent a nationality/country.", "missing nationality data"],
      ["Exclude CXL / No Show as instructed", "Follow current checklist scope.", "cxl no show exclude"]
    ]
  },
  {
    id: "eod",
    title: "09 · Nachtlauf / End Of Day",
    subtitle: "Normal live EOD flow in OPERA 5.6.25.20",
    badge: "live",
    badgeText: "Live Video Confirmed",
    intro: "Use the separate OPERA End of Day window for property FRANV. Do not interrupt Fiscal Program or Business Date Roll.",
    path: "OPERA End of Day [Version 5.6.25.20] → Property FRANV",
    steps: [
      ["Country and State Check", "OPERA lists incorrect/missing Country/State records; correct only what is known.", "country state check"],
      ["Arrivals not yet Checked In", "Remaining arrivals may be processed as NOSHOW after review; list does not have to be empty.", "arrivals not checked in no show"],
      ["Departures not Checked Out", "The live EOD list contains the due-out F&B POS PMs.", "departures not checked out pos pm"],
      ["Verify POS PMs = 0.00", "Do not extend these PMs.", "pos zero balance"],
      ["C/O Zero", "Use for applicable zero-balance POS PMs.", "c/o zero checkout zero"],
      ["Wait for Response from Fiscal Program", "Do not interrupt the fiscal interface.", "fiscal program wait"],
      ["Automatic closure of open cashiers", "EOD prompts for the night cashier.", "automatic closure cashiers"],
      ["Cashier ID 102 → Cashier Closure Summary / Shift Drop", "Confirms Kasse 3 closes inside EOD.", "cashier 102 closure summary shift drop"],
      ["Roll the Business Date", "OPERA broadcasts/logs out terminals; wait and do not start a competing EOD.", "roll business date terminals"],
      ["Allow remaining configured EOD steps to finish", "A changed date alone is not proof that the entire EOD is complete.", "posting room additional final reports completion"],
      ["If EOD stops: record date, stage, error, time", "Escalate; do not improvise support/database actions.", "eod error blocker escalate"]
    ]
  },
  {
    id: "reports",
    title: "10 · Post-EOD Reports",
    subtitle: "Raportet që përgatiten pas Nachtlauf",
    badge: "both",
    badgeText: "Checklist + Live Video",
    intro: "Use the new operational day where applicable; business-date examples from training are not fixed values.",
    steps: [
      ["E100 Trial Balance", "End Of Day → End Of Day Reports → E100 Trial Balance → Preview → print 2x → Tagesabschluss folder.", "e100 trial balance end of day reports"],
      ["T122 Vacant Rooms", "Miscellaneous → Reports → T122 → Status Vacant → Days → Number of Days Vacant = 3 → Room No → print 1x Technik + 1x HSK.", "t122 vacant rooms days 3 technik hsk"],
      ["%A136 HSK Traces", "Print; enter relevant traces in GXP as required.", "a136 hsk traces gxp"],
      ["P112 Departures", "Preview/print for HSK.", "p112 departures hsk"],
      ["PS101 Breakfast", "Print breakfast list for F&B; also provides breakfast guest count for Cover.", "ps101 breakfast f&b"],
      ["J146", "Checklist requires 2 copies for Technik + HSK. Exact title/parameters remain open.", "j146 technik hsk"],
      ["VIP of the Day", "Print from handover for HSK + Technik.", "vip of the day handover"],
      ["T134 Facility Task Details", "Seen live with DEPART - Full Departure Clean; do not treat it as J146 unless confirmed.", "t134 facility task details depart full departure clean"]
    ]
  },
  {
    id: "r118",
    title: "11 · R118 Breakfast Forecast",
    subtitle: "Package Forecast PDF",
    badge: "live",
    badgeText: "Live Video Confirmed",
    intro: "Generate the forecast, preview it, save PDF, then send it separately.",
    path: "Miscellaneous → Reports → R118 Package Forecast",
    steps: [
      ["Output = Summary", "Preview title: R118 Package Forecast - Summary.", "r118 summary"],
      ["Deduct = selected", "Confirmed live parameter.", "deduct"],
      ["Reservation Details = included", "Confirmed live setting.", "reservation details"],
      ["Sort Order = Room No", "Confirmed live parameter.", "room no sort"],
      ["Group By = Package Code", "Confirmed live parameter.", "package code"],
      ["Use current forecast date range + package codes", "Do not hard-code the training date range.", "forecast date package codes"],
      ["Preview", "Verify the output before saving.", "preview"],
      ["Save PDF to T:\\SCANS\\", "Naming convention: Breakfast Forecast [date].pdf.", "t scans breakfast forecast pdf"],
      ["Sending is a separate step", "Saving the PDF does not mean the email was sent.", "email send separate"]
    ]
  },
  {
    id: "postpm",
    title: "12 · New-Day PM Preparation",
    subtitle: "PM 9515 / PM 9516 after EOD",
    badge: "live",
    badgeText: "Live Result Confirmed",
    intro: "The result is confirmed; the exact copy/create command is not yet clear enough to hard-code.",
    steps: [
      ["Prepare new/current-day Minibar PM 9516", "Visible setup uses NORATE / 0.00.", "9516 new day norate zero"],
      ["Prepare new/current-day Cover PM 9515", "Visible setup uses NORATE / 0.00.", "9515 new day norate zero"],
      ["Do not invent the creation command", "Use the local demonstrated method or ask the trainer if the exact command is unclear.", "copy create reservation open point"]
    ]
  },
  {
    id: "vcc",
    title: "13 · Due Outs / VCC / Billing",
    subtitle: "Morning departure control",
    badge: "live",
    badgeText: "Live Workflow Confirmed",
    intro: "Rregulli kryesor: një card on file nuk do të thotë automatikisht që ajo duhet charged.",
    steps: [
      ["Open Due Out / In-House list", "Work one reservation at a time.", "due out in house"],
      ["Read Comments / Alerts", "Check payment and billing instructions before touching the folio.", "comments alerts payment instructions"],
      ["Open Billing", "Inspect windows and transaction details.", "billing windows"],
      ["Confirm payer + VCC coverage + routing", "Know what the card is allowed to cover.", "payer vcc routing coverage"],
      ["Select correct Billing window", "Do not charge the wrong payer/window.", "window payment"],
      ["Payment only when confirmed", "Use existing card/VCC only when the setup/instructions support it.", "payment card vcc"],
      ["Wait for Authorization in Progress", "Verify the result; do not assume success.", "authorization in progress"],
      ["If failed/unclear: stop and hand over/escalate", "Refunds, routing changes, partial coverage and corrections are not guesswork.", "failed card refund correction escalate"]
    ]
  },
  {
    id: "email",
    title: "14 · Morning Emails & Distribution",
    subtitle: "Email package after Night Audit",
    badge: "both",
    badgeText: "Checklist + Live Video",
    intro: "Recipient examples below are confirmed from the training video/checklist. Always attach the current-date file.",
    steps: [
      ["Cover", "Recipient shown: Schneider, Sven · Subject: Cover · attach current Cover Statistik workbook.", "email cover sven schneider"],
      ["Breakfast Forecast", "Distribution list: 02. Breakfast Forecast · Subject: Breakfast Forecast · attach current PDF.", "email breakfast forecast"],
      ["Kassenprotokoll / F&B Abrechnung", "Recipient shown: Schneider, Sven · Subject: Kassenprotokoll · attach current PDF; checklist also requires F&B Abrechnung package.", "email kassenprotokoll f&b abrechnung sven"],
      ["Kassenschnitt", "Checklist explicitly requires scanned CC Kassenschnitt; distribution names Sven + Melanie.", "email kassenschnitt sven melanie"],
      ["MOD", "Distribution list: 1. MOD Report · Subject: MOD · if no entry: “Guten Morgen, gestern gab es keinen MOD Report Eintrag …”.", "email mod report"],
      ["Confirm attachments before Send", "Saving/scanning is not the same as sending.", "attachment verify send"]
    ]
  },
  {
    id: "special",
    title: "15 · Scheduled / Special Task",
    subtitle: "Detyrë me ditë/orë specifike",
    badge: "check",
    badgeText: "Checkliste NEU",
    intro: "Ky hap nuk vlen çdo natë.",
    steps: [
      ["Sunday night / Wednesday night at 05:45", "Put the black waste bin outside + complete the round.", "sunday wednesday 05:45 black waste bin rundgang"]
    ]
  },
  {
    id: "open",
    title: "16 · Open Points / Do Not Guess",
    subtitle: "Gjërat që ende duhen konfirmuar",
    badge: "open",
    badgeText: "Open / Confirm",
    intro: "Këto pika nuk duhen “plotësuar” me supozime nga OPERA generic.",
    steps: [
      ["J146 exact title + parameter set", "Checklist use is confirmed; exact report details remain open.", "j146 open"],
      ["Exact copy/create command for PM 9515 / 9516 after EOD", "Result is known; exact click command remains open.", "pm create copy open"],
      ["Exact long-running PM list", "Which PMs stay vs extend is not fully enumerated.", "long running pm extend"],
      ["Exceptional VCC handling", "Failed authorization, partial coverage, routing changes, refunds/corrections require confirmation.", "vcc failed authorization partial refund routing"],
      ["Unusual EOD blockers", "Escalate unknown errors; do not use improvised support/database actions.", "eod blocker error"],
      ["Exact names of partially visible EOD steps", "Weather..., Posting Room..., Run Additional... remain partially legible only.", "weather posting room additional"],
      ["T134 standing role", "Seen live; relationship to the formal report pack is not yet confirmed.", "t134 open"]
    ]
  },
  {
    id: "context",
    title: "17 · LUME / Marriott Operating Context",
    subtitle: "Reference rules that help interpret Night decisions",
    badge: "both",
    badgeText: "Operational reference",
    intro: "Reference layer only. It makes the Control Center more informative but never overrides Checkliste Nachtdienst NEU, current live trainer instruction, Accounting/FOM approval or the exact OPERA workflow.",
    steps: [
      ["Exact PMS in use", "LUME currently uses OPERA PMS Version 5.6.25.20, property FRANV. Do not use OPERA Cloud or OPERA Xpress navigation as the current LUME click path.", "opera 5.6.25.20 franv"],
      ["Bonvoy recognition", "Recognize Bonvoy membership in guest-facing arrival/check-in work and follow the current Marriott/LUME tier-benefit rules.", "bonvoy recognition"],
      ["Marriott 15/5 service rule", "Use the 15/5 service behavior for guest contact. It is not authorization for refunds, postings, points or compensation.", "15 5 service"],
      ["Cashless transition", "Project reference: LUME plans to become fully cashless from 01.10.2026. Until the cutover is implemented and confirmed, current cash controls remain operationally relevant. At transition, follow the newest FOM/Accounting instruction.", "cashless october 2026"],
      ["Financial uncertainty = stop", "For posting, refund, routing, settlement, adjustment, correction or unclear VCC coverage, do not guess. Confirm with trainer/FOM/Accounting.", "financial stop"]
    ]
  }
];

// Search answers (Ask / Search tab and HOW drawer). Order breaks ties in search ranking.
const allCards = [
  {
    id: "d140overview",
    title: "D140 - two different LUME workflows",
    code: "D140",
    sectionId: "cc",
    status: "both",
    aliases: ["d140", "what is d140", "where do i use d140", "d140 report"],
    keywords: "d140 cc reconciliation freedompay storno negative postings cashier 102 two uses",
    summary: "At LUME, D140 is used in two different ways. Choose the workflow by purpose; do not mix the filters.",
    path: "Miscellaneous > Reports > D140",
    steps: [
      "CC reconciliation: Cashiers 100, 101, 102; select relevant IFC + ECOM transaction codes; Negative Postings Only = OFF; Revenue = Gross; Group By = Transaction Code; Sort = Chronological; Preview; compare with FreedomPay by card type.",
      "Storno control: Cashier 102; Transaction Code blank in the demonstrated workflow; Negative Postings Only = ON; Revenue = Gross; Group By = Transaction Code; Sort = Chronological; Preview; print/sign."
    ],
    checks: ["Before Preview, confirm which D140 purpose you are running: CC reconciliation or Storno."],
    stop: [
      "Do not reuse the IFC/ECOM filters for the Storno report and do not use Negative Postings Only for the full CC reconciliation."
    ]
  },
  {
    id: "downtime",
    title: "Print Downtime report",
    code: "%Down",
    sectionId: "start",
    status: "check",
    aliases: [
      "downtime",
      "print downtime",
      "downtime report",
      "%down",
      "system downtime",
      "system outage report",
      "downtime ausdrucken",
      "downtime drucken",
      "wie drucke ich downtime",
      "how do i print downtime",
      "si printoj downtime"
    ],
    keywords: "miscellaneous reports downtime print preview fibs evacuation",
    summary: "Confirmed LUME path: use Miscellaneous > Reports > %Down. The exact parameter screen has not yet been captured, so do not invent filters.",
    path: "Miscellaneous > Reports > %Down",
    steps: [
      "Open Miscellaneous.",
      "Open Reports.",
      "Search/select %Down.",
      "Use the current LUME report screen to preview/print the Downtime pack.",
      "File/use the Downtime material according to the Night checklist; during an evacuation follow the LUME FIBS instruction."
    ],
    checks: ["Correct property FRANV and correct business/operational date before printing."],
    stop: [
      "Exact %Down parameter fields are not yet documented in the training evidence. If a parameter is unclear, do not guess."
    ]
  },
  {
    id: "trace",
    title: "Review / resolve Front Desk Trace",
    code: "Trace / FD",
    sectionId: "start",
    status: "live",
    aliases: [
      "trace",
      "traces",
      "resolve trace",
      "close trace",
      "front desk trace",
      "fd trace",
      "trace resolven",
      "trace erledigen",
      "how do i resolve a trace",
      "wie resolve ich einen trace",
      "si mbyll trace"
    ],
    keywords: "front desk traces fd search resolve unresolved completed",
    summary: "LUME trainer rule: filter Front Desk traces with FD and resolve only tasks that are actually completed.",
    path: "Front Desk > Traces > FD > Search",
    steps: [
      "Open Front Desk > Traces.",
      "Select/use FD as the department/filter.",
      "Click Search.",
      "Open/review the relevant Trace.",
      "Resolve it only when the underlying task is definitely completed.",
      "If you are not sure, leave it unresolved and hand it over."
    ],
    checks: ["Resolved status must reflect real completion, not merely that the Trace was read."],
    stop: ["Do not resolve a Trace just to clear the list."]
  },
  {
    id: "house",
    title: "Open House Status",
    code: "Shift + F3",
    sectionId: "start",
    status: "both",
    aliases: [
      "house status",
      "shift f3",
      "max occupied tonight",
      "arrivals departures house status",
      "how do i open house status",
      "hausstatus"
    ],
    keywords: "shift f3 house status arrivals departures max occupied tonight minibar room count",
    summary: "Shift + F3 is the LUME quick access used for House Status and the Minibar room-count source.",
    path: "Shift + F3",
    steps: [
      "Press Shift + F3.",
      "Review House Status, arrivals and departures.",
      "For Minibar, read Max Occupied Tonight and use that current value as the Qty."
    ],
    checks: ["Use the current night value; never reuse the training example 124 as a fixed number."],
    stop: []
  },
  {
    id: "a198",
    title: "A198 Rate Check",
    code: "A198",
    sectionId: "rate",
    status: "both",
    aliases: [
      "a198",
      "rate check",
      "guest in house rate check",
      "unrealistic rate",
      "zero rate",
      "how do i run a198",
      "how to check rates"
    ],
    keywords: "miscellaneous reports a198 preview unrealistic rate zero room house use",
    summary: "Run A198 before EOD and investigate unrealistic rates or normal occupied rooms at 0.00.",
    path: "Miscellaneous > Reports > A198 > Preview",
    steps: [
      "Open Miscellaneous > Reports.",
      "Search/open A198.",
      "Click Preview.",
      "Review the in-house room rates.",
      "Investigate any unrealistic rate.",
      "Investigate any normal occupied room at 0.00.",
      "Do not treat House Use at 0.00 as an automatic error."
    ],
    checks: ["The report should not contain an unexplained unrealistic/zero rate before EOD."],
    stop: ["Do not change a rate blindly; confirm the reservation/rate reason first."]
  },
  {
    id: "settlements",
    title: "F&B settlements before EOD",
    code: "Abrechnungen",
    sectionId: "pm",
    status: "live",
    aliases: [
      "abrechnung",
      "abrechnungen",
      "bar settlement",
      "f&b settlement",
      "wait for bar",
      "can i start eod before bar closes",
      "kellner abrechnung"
    ],
    keywords: "bar f&b settlements kellner fbb lprf tagesabschluss wait missing settlement",
    summary: "Do not start Tagesabschluss until the required Bar/F&B settlements have been handed over.",
    path: "Pre-EOD control",
    steps: [
      "Confirm Bar and relevant F&B outlets are closed for the business day.",
      "Collect the required Kellner Abrechnungen (for example FBB / LPRF as applicable).",
      "Complete the related CC/cash/tip checks.",
      "Only continue to Tagesabschluss when the required settlements are available."
    ],
    checks: ["All required outlet settlements for the day are present before EOD."],
    stop: ["If an expected Abrechnung is missing, wait; do not start Tagesabschluss."]
  },
  {
    id: "minibar",
    title: "Minibar PM 9516",
    code: "9516",
    sectionId: "minibar",
    status: "both",
    aliases: [
      "9516",
      "minibar",
      "minibar pm",
      "minibar correction",
      "10000",
      "10010",
      "how do i do minibar",
      "minibar posting"
    ],
    keywords: "shift f3 max occupied tonight 9516 10050 10000 10010 post qty balance checkout stornos",
    summary: "Use Max Occupied Tonight as Qty, post the two offsetting Minibar lines, confirm 0.00, then Check Out PM 9516.",
    path: "Shift + F3 -> Max Occupied Tonight; then Cashiering > Billing > PM 9516 > Post",
    steps: [
      "Press Shift + F3 and note Max Occupied Tonight.",
      "Open Cashiering > Billing and open PM 9516.",
      "Click Post.",
      "Search/select article 10050%; the resulting transaction line displays code 10000.",
      "Post code 10000 with Amount -4.00 and Qty = Max Occupied Tonight.",
      "Post code 10010 with Amount +4.00 and the same Qty.",
      "Use the current room-count wording in Supplement.",
      "Return to Billing and verify Balance = 0.00.",
      "Choose Check Out (not Check Out With Open Folio).",
      "File the Minibar invoice behind the Stornos."
    ],
    checks: [
      "Qty is identical on both lines; the two totals offset; PM balance is 0.00; status becomes CHECKED OUT."
    ],
    stop: [
      "Do not use old PM 9600 in place of current Minibar PM 9516.",
      "If the PM already contains unexpected entries or does not return to 0.00, stop and confirm before further posting."
    ]
  },
  {
    id: "cover",
    title: "Cover PM 9515",
    code: "9515",
    sectionId: "cover",
    status: "both",
    aliases: [
      "9515",
      "cover",
      "cover statistic",
      "cover statistik",
      "cover daily",
      "how do i do cover",
      "71049",
      "71050",
      "71051",
      "71052",
      "71053",
      "71054"
    ],
    keywords: "ps101 breakfast guests f&b pos lunch dinner ird fbb post adjust transaction kor-a gegenbuchung -100 checkout",
    summary: "Post the verified daily Cover quantities to PM 9515, counter-post with KOR-A / -100% / Gegenbuchung, confirm 0.00, then Check Out.",
    path: "Cashiering > Billing > PM 9515 - COVER DAILY F&B",
    steps: [
      "Get the PS101 breakfast included guest count for the business day.",
      "Collect the verified F&B outlet cover counts.",
      "Open PM 9515 in Cashiering > Billing and click Post.",
      "Use 71049 COVER - BREAK OPERA for the PS101 included breakfast count.",
      "Use 71050 COVER - BREAK F&B POS for the breakfast POS count.",
      "Use 71051 COVER - LPRF LUNCH.",
      "Use 71052 COVER - LPRF DINNER.",
      "Use 71053 COVER - IRD.",
      "Use 71054 COVER - FBB.",
      "Enter the verified count in Qty for each applicable line.",
      "Select the newly posted Cover transactions.",
      "Choose Adjust Transaction > Adjust by Selected Postings.",
      "Reason Code = KOR-A.",
      "Percentage = -100.",
      "Reason Text = Gegenbuchung.",
      "Confirm the counter-postings and Balance = 0.00.",
      "Check Out PM 9515.",
      "Double-check Cover totals and prepare the required Cover evidence/screenshot for AFOM."
    ],
    checks: [
      "PS101 breakfast count is included; all outlet counts match the day evidence; PM balance is 0.00."
    ],
    stop: [
      "Do not reuse the old PM 9404 process as the current account. If a count source is unclear, confirm it before posting."
    ]
  },
  {
    id: "d140cc",
    title: "D140 credit-card reconciliation",
    code: "D140 CC",
    sectionId: "cc",
    status: "both",
    aliases: [
      "d140",
      "d140 cc",
      "credit card reconciliation",
      "freedompay d140",
      "ifc ecom",
      "how do i reconcile cards",
      "card check"
    ],
    keywords: "d140 freedompay transaction summary card type cashier 100 101 102 ifc ecom gross transaction code chronological preview",
    summary: "For CC reconciliation, compare FreedomPay with OPERA D140 by card type. This is different from the D140 Storno report.",
    path: "FreedomPay: Reports > Transaktionszusammenfassung nach Kartentyp; OPERA: Miscellaneous > Reports > D140",
    steps: [
      "In FreedomPay run Transaktionszusammenfassung nach Kartentyp.",
      "Export format = Excel.",
      "Business Date = the audit date.",
      "In OPERA open Miscellaneous > Reports > D140.",
      "From Date / To Date = audit date.",
      "Select Cashiers 100, 101 and 102.",
      "In Transaction Codes select the relevant IFC codes and the relevant ECOM codes.",
      "Negative Postings Only = OFF.",
      "Revenue = Gross.",
      "Group By = Transaction Code.",
      "Sort Order = Chronological.",
      "Preview D140.",
      "Compare FreedomPay and OPERA totals by card type, not only by grand total.",
      "Transfer/check the values in Kassenabmeldung > KK."
    ],
    checks: [
      "The card-type comparison is explained and reconciled; Balance is not forced by changing source figures."
    ],
    stop: ["Do not use the Storno filter (Negative Postings Only) for the full CC reconciliation."]
  },
  {
    id: "d140storno",
    title: "D140 Storno / negative postings",
    code: "D140 Storno / 102",
    sectionId: "cash",
    status: "both",
    aliases: [
      "d140 storno",
      "negative postings",
      "cashier 102 negative",
      "storno report",
      "stornoreport",
      "how do i print stornos"
    ],
    keywords: "d140 cashier 102 negative postings only print sign transaction code blank",
    summary: "The Storno use of D140 is a separate report from the CC reconciliation.",
    path: "Miscellaneous > Reports > D140",
    steps: [
      "Open D140.",
      "Set From/To to the audit date.",
      "Cashier = 102.",
      "Leave Transaction Code blank in the demonstrated workflow.",
      "Turn Negative Postings Only = ON.",
      "Revenue = Gross.",
      "Group By = Transaction Code.",
      "Sort Order = Chronological.",
      "Preview.",
      "Print and sign according to the current LUME checklist."
    ],
    checks: ["Cashier 102 and Negative Postings Only are selected."],
    stop: ["Do not leave the IFC/ECOM transaction-code filter from the CC reconciliation in place."]
  },
  {
    id: "kk",
    title: "Kassenabmeldung / KK reconciliation",
    code: "KK",
    sectionId: "cash",
    status: "live",
    aliases: [
      "kk",
      "kassenabmeldung",
      "kassenabmeldung neu",
      "card reconciliation excel",
      "balance kk",
      "where is kassenabmeldung"
    ],
    keywords: "l drive 2 fnv kassenabmeldung kk gesamt cc freedompay oracle f&b balance grey cells formulas",
    summary: "Use the KK sheet to compare the card totals from FreedomPay and OPERA. Do not overwrite grey/formula cells.",
    path: "L:\\2.FNV_KASSENABMELDUNG\\Kassenabmeldung Neu.xlsx -> sheet KK",
    steps: [
      "Open Kassenabmeldung Neu.xlsx from the Reception shared drive.",
      "Open sheet KK.",
      "Enter/check the current FreedomPay and OPERA values in the appropriate input areas.",
      "Review Gesamt CC-FO, Gesamt CC-Freedompay, Oracle FO, Oracle LPRF&FBB, Gutschriften im minus and Balance.",
      "Investigate any difference."
    ],
    checks: ["Balance is supported by the source reports; grey/formula cells remain intact."],
    stop: ["Never change a source value or formula just to make Balance = 0.00."]
  },
  {
    id: "cashcount",
    title: "Count Kasse 3 / Cash",
    code: "Kasse 3 / 102",
    sectionId: "cash",
    status: "both",
    aliases: [
      "cash count",
      "kasse 3",
      "count cash",
      "cashier 102 cash",
      "kassenstock",
      "drop oracle",
      "how do i count kasse"
    ],
    keywords: "cash count kassenstock denominations petty cash drop schicht 1 2 3 drop total drop oracle differenz cashier 102",
    summary: "Count and reconcile the night cash before EOD; Cashier 102 is closed by the EOD routine.",
    path: "Kassenabmeldung Neu.xlsx -> Cash count",
    steps: [
      "Open the Cash count sheet.",
      "Enter/count each cash denomination.",
      "Review Kassenstock.",
      "Review Petty Cash Notes.",
      "Review Drop Schicht 1 / 2 / 3 and Drop Total.",
      "Review Drop Oracle and Differenz.",
      "Complete date/name/control/signature fields as required.",
      "Do not manually close Cashier 102 before EOD; the EOD routine performs the closure."
    ],
    checks: ["Cash and drop differences are understood/documented before EOD."],
    stop: ["If a difference cannot be explained, do not force the workbook to zero; escalate/handover."]
  },
  {
    id: "b184",
    title: "B184 Nationalitaeten",
    code: "B184",
    sectionId: "b184",
    status: "check",
    aliases: [
      "b184",
      "nationality",
      "nationalitaeten",
      "country nationality",
      "missing nationality",
      "how do i do b184"
    ],
    keywords: "b184 nationality country missing data cxl no show",
    summary: "Before EOD, complete missing nationality data when it is supported by the actual guest/reservation record.",
    path: "LUME report/control B184",
    steps: [
      "Run/check B184 for the audit date.",
      "Review missing nationality/country data.",
      "Complete only data that is actually known from the guest/reservation record.",
      "Exclude CXL / No Show as instructed."
    ],
    checks: ["No invented nationality data; CXL/No Show excluded per LUME checklist."],
    stop: ["If the nationality/country is not known, do not guess."]
  },
  {
    id: "eodstart",
    title: "Start Nachtlauf / End Of Day",
    code: "EOD",
    sectionId: "eod",
    status: "live",
    aliases: [
      "eod",
      "end of day",
      "night audit",
      "nachtlauf",
      "tagesabschluss",
      "start nacht audit",
      "how do i start eod",
      "how do i run night audit"
    ],
    keywords: "opera end of day 5.6.25.20 franv country state arrivals departures cashiers roll business date final reports",
    summary: "Use the separate OPERA End of Day 5.6.25.20 window after the required pre-EOD controls and settlements are ready.",
    path: "OPERA End of Day [Version 5.6.25.20] -> Property FRANV",
    steps: [
      "Confirm required Bar/F&B settlements are present.",
      "Confirm Cover and Minibar are completed.",
      "Confirm POS PMs are not extended and should be 0.00.",
      "Open OPERA End of Day and log in with your own authorized credentials.",
      "Process Country and State Check.",
      "Review Arrivals not yet Checked In.",
      "Process Departures not Checked Out / applicable POS PMs.",
      "Allow Automatic closure of open cashiers for Cashier 102.",
      "Allow Roll the Business Date to complete.",
      "Let the remaining configured EOD procedures/reports finish.",
      "Check for final completion/errors."
    ],
    checks: ["Do not treat a changed business date alone as proof that EOD fully finished."],
    stop: [
      "If an unfamiliar EOD blocker/error appears, record business date, stage, error and time; escalate instead of improvising."
    ]
  },
  {
    id: "noshoweod",
    title: "Remaining arrivals during EOD / No-Show",
    code: "Arrivals not yet Checked In",
    sectionId: "eod",
    status: "live",
    aliases: [
      "remaining arrivals",
      "arrivals not checked in",
      "no show eod",
      "noshow night audit",
      "do arrivals need to be zero",
      "can i run eod with arrivals"
    ],
    keywords: "arrivals not yet checked in noshow deposit 6 pm cxl reviewed eod",
    summary: "The Arrivals list does not have to be empty. Remaining arrivals must be reviewed and intentionally allowed to process as No-Show when appropriate.",
    path: "EOD -> Arrivals not yet Checked In",
    steps: [
      "Review each remaining arrival before EOD.",
      "Check 6 PM / CXL / card / deposit context and current LUME instruction.",
      "During EOD review Arrivals not yet Checked In.",
      "Allow only the appropriate reviewed reservations to process as NOSHOW."
    ],
    checks: ["Every remaining arrival has been intentionally reviewed."],
    stop: ["Do not create a blanket rule to cancel/check in every remaining arrival."]
  },
  {
    id: "pospm",
    title: "Zero-balance POS PMs in EOD",
    code: "C/O Zero",
    sectionId: "eod",
    status: "live",
    aliases: [
      "c/o zero",
      "pos pm",
      "pos accounts",
      "departures not checked out",
      "zero balance pm",
      "how do i close pos pm"
    ],
    keywords: "9501 9503 9504 9505 9506 9507 9508 9509 9510 9511 9512 pos cash mastercard visa amex diners jcb discover unionpay ec voucher maestro due out 0.00 fiscal program",
    summary: "The LUME POS PMs must not be extended. In EOD, applicable Due Out POS PMs at 0.00 are processed with C/O Zero.",
    path: "EOD -> Departures not Checked Out",
    steps: [
      "Open/review Departures not Checked Out.",
      "Identify the applicable F&B POS PM accounts.",
      "Verify each applicable PM has Balance = 0.00.",
      "Use C/O Zero.",
      "Wait while OPERA shows Waiting for Response from Fiscal Program.",
      "Allow the process to finish before continuing."
    ],
    checks: ["POS PMs are Due Out and 0.00 before C/O Zero."],
    stop: ["Do not extend POS PM accounts. Do not use C/O Zero on an unexplained non-zero balance."]
  },
  {
    id: "cashier102",
    title: "Cashier 102 closure inside EOD",
    code: "102",
    sectionId: "eod",
    status: "live",
    aliases: [
      "cashier 102",
      "close cashier 102",
      "automatic closure of open cashiers",
      "shift drop",
      "kasse 3 closure",
      "how do i close night cashier"
    ],
    keywords: "automatic closure cashier closure summary 102 shift drop eod",
    summary: "Cashier 102 is closed inside the EOD routine; do not add a separate manual pre-EOD closure.",
    path: "EOD -> Automatic closure of open cashiers",
    steps: [
      "When EOD prompts for cashier, use Cashier ID 102.",
      "Review Cashier Closure Summary - 102.",
      "Continue through Cashier Closure - 102 / Shift Drop.",
      "Verify the figures against the completed cash controls."
    ],
    checks: ["Cashier closure values agree with the cash-count work."],
    stop: ["If figures do not agree, investigate/escalate; do not force the closure data."]
  },
  {
    id: "roll",
    title: "Roll the Business Date",
    code: "Roll the Business Date",
    sectionId: "eod",
    status: "live",
    aliases: [
      "roll business date",
      "business date",
      "change business date",
      "date roll",
      "how does opera change date"
    ],
    keywords: "roll business date terminals logout broadcast wait eod",
    summary: "OPERA rolls the business date during EOD and broadcasts/logs out terminals. Wait and do not interrupt it.",
    path: "EOD -> Roll the Business Date",
    steps: [
      "Let EOD reach Roll the Business Date.",
      "Read the OPERA message to terminals.",
      "Wait while terminals are logged out / the date roll processes.",
      "Continue only after the step completes."
    ],
    checks: ["Business date changes and EOD continues to remaining configured steps."],
    stop: ["Do not interrupt the date roll or start a competing EOD session."]
  },
  {
    id: "e100",
    title: "Print E100 Trial Balance",
    code: "E100",
    sectionId: "reports",
    status: "live",
    aliases: [
      "e100",
      "trial balance",
      "print e100",
      "where is e100",
      "how do i print e100",
      "end of day reports trial balance"
    ],
    keywords: "end of day end of day reports e100 trial_balance preview print 2 copies tagesabschluss folder",
    summary: "E100 is the Trial Balance report used after EOD. Print two copies and file them with the Tagesabschluss cover sheet.",
    path: "End Of Day -> End Of Day Reports -> E100 Trial Balance",
    steps: [
      "Open End Of Day.",
      "Open End Of Day Reports.",
      "Select E100 Trial Balance (REP Name shown: trial_balance).",
      "Click Preview and verify the audited business date.",
      "Print 2 copies.",
      "File them with the Tagesabschluss cover sheet."
    ],
    checks: ["Correct audited business date; 2 copies printed and filed."],
    stop: []
  },
  {
    id: "t122",
    title: "Print T122 Vacant Rooms",
    code: "T122",
    sectionId: "reports",
    status: "live",
    aliases: [
      "t122",
      "vacant rooms",
      "number of days vacant 3",
      "print t122",
      "how do i print vacant rooms"
    ],
    keywords: "miscellaneous reports t122 vacant days number of days vacant 3 room no technik hsk",
    summary: "T122 is printed post-EOD with Status Vacant and Number of Days Vacant = 3.",
    path: "Miscellaneous -> Reports -> T122 Vacant Rooms",
    steps: [
      "Open T122 Vacant Rooms.",
      "Set Status = Vacant.",
      "Use Days.",
      "Set Number of Days Vacant = 3.",
      "Sort by Room No.",
      "Preview.",
      "Print 2 copies: 1 for Technik and 1 for HSK Reports."
    ],
    checks: ["Vacant + 3 days + Room No sorting; two copies."],
    stop: []
  },
  {
    id: "a136",
    title: "Print %A136 HSK Traces",
    code: "%A136",
    sectionId: "reports",
    status: "check",
    aliases: ["a136", "%a136", "hsk traces", "housekeeping traces report", "print hsk traces"],
    keywords: "a136 hsk traces print gxp housekeeping",
    summary: "Print the HSK Trace report and enter the relevant items into GXP as required by the LUME checklist.",
    path: "Post-EOD report workflow -> %A136 HSK Traces",
    steps: [
      "Open the %A136 HSK Traces report.",
      "Print the report for the operational day.",
      "Review the relevant HSK Traces.",
      "Enter the required Traces into GXP."
    ],
    checks: ["Do not assume OPERA automatically synchronized the Trace to GXP."],
    stop: ["Exact parameter screen is not yet fully documented; do not invent filters if unclear."]
  },
  {
    id: "p112",
    title: "Print P112 Departures",
    code: "P112",
    sectionId: "reports",
    status: "live",
    aliases: ["p112", "departures report", "departure list hsk", "print p112", "departes"],
    keywords: "miscellaneous reports p112 departures due out room no hsk print",
    summary: "P112 is the post-EOD departure list printed for Housekeeping.",
    path: "Miscellaneous -> Reports -> P112 Departures",
    steps: [
      "Open P112 Departures.",
      "Use the new operational day.",
      "Preview the departure list.",
      "Print it for HSK."
    ],
    checks: ["Use the correct operational day; protect guest privacy in general documentation."],
    stop: ["Do not hard-code the training-date filter as a permanent value."]
  },
  {
    id: "ps101",
    title: "PS101 Breakfast list / count",
    code: "PS101",
    sectionId: "reports",
    status: "both",
    aliases: [
      "ps101",
      "breakfast list",
      "breakfast guest count",
      "breakfast guests",
      "fruhstucksliste",
      "fruehstuecksliste"
    ],
    keywords: "ps101 outlook breakfast f&b total incl cover print",
    summary: "PS101 serves two Night Audit needs: the included breakfast guest count for Cover and the breakfast list printed for F&B.",
    path: "PS101 delivered via Outlook / current LUME workflow",
    steps: [
      "Open the current PS101 breakfast report/list.",
      "For Cover, use the applicable included breakfast guest count (training demonstrated Persons / Total incl.).",
      "After EOD, print the breakfast list for F&B."
    ],
    checks: ["Use guest count, not breakfast cash takings, for the Cover input."],
    stop: ["Do not reuse the training example count 83 as a fixed value."]
  },
  {
    id: "j146",
    title: "J146 report",
    code: "J146",
    sectionId: "reports",
    status: "open",
    aliases: ["j146", "print j146", "technik hsk report"],
    keywords: "j146 2 copies technik hsk exact title parameters open",
    summary: "The current LUME checklist requires J146 2x for Technik + HSK, but the exact full report title/parameter set is still not confirmed.",
    path: "Post-EOD report pack",
    steps: [
      "Locate J146 in the current report list.",
      "Use the locally confirmed parameters.",
      "Print 2 copies: Technik + HSK."
    ],
    checks: ["Two copies distributed correctly."],
    stop: [
      "Exact title/parameters are still open. If the screen is unclear, ask the trainer rather than guessing."
    ]
  },
  {
    id: "r118",
    title: "R118 Breakfast Forecast",
    code: "R118",
    sectionId: "r118",
    status: "live",
    aliases: [
      "r118",
      "breakfast forecast",
      "package forecast",
      "print breakfast forecast",
      "save breakfast forecast",
      "how do i make breakfast forecast"
    ],
    keywords: "miscellaneous reports r118 package forecast summary deduct reservation details room no package code preview t scans pdf",
    summary: "Generate R118 Package Forecast - Summary, preview it, save the current PDF to the SCANS folder, then send it separately.",
    path: "Miscellaneous -> Reports -> R118 Package Forecast",
    steps: [
      "Open R118 Package Forecast.",
      "Output = Summary.",
      "Deduct = selected.",
      "Include Reservation Details.",
      "Sort Order = Room No.",
      "Group By = Package Code.",
      "Use the correct forecast date range and current package-code selection.",
      "Click Preview and verify the report.",
      "Save PDF to T:\\SCANS\\.",
      "Use filename Breakfast Forecast [date].pdf.",
      "Send the saved PDF in the separate Breakfast Forecast email."
    ],
    checks: ["Correct date range/package codes; PDF saved; sending confirmed separately."],
    stop: ["Do not hard-code the example training date range."]
  },
  {
    id: "folio9516",
    title: "Find Minibar invoice / folio after checkout",
    code: "Folio History / 9516",
    sectionId: "minibar",
    status: "live",
    aliases: [
      "minibar invoice",
      "minibar folio",
      "folio history 9516",
      "find minibar invoice",
      "where is minibar invoice"
    ],
    keywords: "cashiering cashier functions folio history room 9516 checkout folio invoice stornos",
    summary: "Use Folio History to retrieve the already checked-out Minibar PM 9516 folio.",
    path: "Cashiering -> Cashier Functions -> Folio History",
    steps: [
      "Open Cashiering > Cashier Functions > Folio History.",
      "Search Room/PM 9516.",
      "Use the applicable date and Check Out context.",
      "Open/use Folio for the existing invoice.",
      "File the Minibar invoice behind the Stornos as required."
    ],
    checks: ["Folio belongs to PM 9516 and the correct business date."],
    stop: []
  },
  {
    id: "newpm",
    title: "Prepare new-day Cover / Minibar PMs",
    code: "9515 / 9516 new day",
    sectionId: "postpm",
    status: "open",
    aliases: [
      "new day pm",
      "recreate pm 9515",
      "recreate pm 9516",
      "prepare cover pm",
      "prepare minibar pm",
      "norate"
    ],
    keywords: "post eod new business day pm 9515 9516 norate zero rate create copy command open",
    summary: "After EOD the live training prepares the current-day Cover and Minibar PM reservations at NORATE / 0.00; the exact copy/create command is not yet safe to hard-code.",
    path: "Post-EOD PM maintenance",
    steps: [
      "Locate the prior checked-out daily PM record.",
      "Prepare the new/current-business-day PM 9515 Cover reservation at NORATE / 0.00.",
      "Prepare the new/current-business-day PM 9516 Minibar reservation at NORATE / 0.00.",
      "Verify the current business-day dates and zero rate."
    ],
    checks: ["Correct PM number, current business-day dates, NORATE / 0.00."],
    stop: ["The exact create/copy button sequence remains unconfirmed. If unsure, ask the trainer."]
  },
  {
    id: "vcc",
    title: "Due Out / VCC payment control",
    code: "VCC",
    sectionId: "vcc",
    status: "live",
    aliases: [
      "vcc",
      "virtual credit card",
      "due out payment",
      "charge vcc",
      "billing window",
      "authorization in progress",
      "how do i charge vcc",
      "how do i check vcc"
    ],
    keywords: "due out in house comments alerts billing payer routing coverage payment card authorization failed handover",
    summary: "Review each departure individually. Confirm payer, routing and VCC coverage before using Payment.",
    path: "Due Out / In-House list -> Comments/Alerts -> Billing -> correct Window -> Payment",
    steps: [
      "Open the Due Out / In-House list.",
      "Select one reservation.",
      "Read Comments / Alerts / payment instructions.",
      "Open Billing.",
      "Inspect the billing windows and charges.",
      "Confirm who pays and what the VCC/card is allowed to cover.",
      "Select the correct Billing window.",
      "Use Payment only when the setup/instructions support it.",
      "Wait for Authorization in Progress and verify the result.",
      "Return to the Due Out list and continue one reservation at a time."
    ],
    checks: ["Correct payer, correct window, correct coverage, authorization result verified."],
    stop: [
      "Do not charge a card just because it is present. Failed authorization, partial coverage, routing changes, refunds and corrections require confirmation/escalation."
    ]
  },
  {
    id: "emailcover",
    title: "Send Cover email",
    code: "Cover email",
    sectionId: "email",
    status: "live",
    aliases: ["send cover email", "cover email", "email cover", "who gets cover", "cover recipient"],
    keywords: "schneider sven subject cover attachment cover statistik workbook",
    summary: "Training video shows the Cover workbook sent to Schneider, Sven with subject Cover.",
    path: "Outlook / LUME Front Office mailbox",
    steps: [
      "Create the Cover email.",
      "Recipient shown in training: Schneider, Sven.",
      "Subject = Cover.",
      "Attach the current Cover Statistik workbook.",
      "Verify the attachment/date.",
      "Send."
    ],
    checks: ["Correct current-day workbook attached."],
    stop: [
      "Keep separately required AFOM Cover screenshot/evidence if the current checklist still requires it."
    ]
  },
  {
    id: "emailforecast",
    title: "Send Breakfast Forecast email",
    code: "02. Breakfast Forecast",
    sectionId: "email",
    status: "live",
    aliases: [
      "send breakfast forecast email",
      "breakfast forecast email",
      "02 breakfast forecast",
      "who gets breakfast forecast"
    ],
    keywords: "distribution list 02 breakfast forecast subject attachment pdf t scans",
    summary: "Send the current R118 PDF to distribution list 02. Breakfast Forecast.",
    path: "Outlook / LUME Front Office mailbox",
    steps: [
      "Create the Breakfast Forecast email.",
      "Recipient/distribution list = 02. Breakfast Forecast.",
      "Subject = Breakfast Forecast.",
      "Attach Breakfast Forecast [date].pdf from T:\\SCANS\\.",
      "Verify the date/attachment.",
      "Send."
    ],
    checks: ["Correct current PDF attached and email actually sent."],
    stop: []
  },
  {
    id: "emailcash",
    title: "Send Kassenprotokoll / F&B Abrechnung email",
    code: "Kassenprotokoll",
    sectionId: "email",
    status: "both",
    aliases: [
      "kassenprotokoll email",
      "send kassenprotokoll",
      "f&b abrechnung email",
      "who gets kassenprotokoll"
    ],
    keywords: "schneider sven subject kassenprotokoll attachment pdf f&b abrechnung",
    summary: "Training shows Kassenprotokoll sent to Schneider, Sven; current checklist also requires the F&B Abrechnung package.",
    path: "Outlook / LUME Front Office mailbox",
    steps: [
      "Create the Kassenprotokoll / F&B Abrechnung email.",
      "Recipient shown in training: Schneider, Sven.",
      "Subject shown = Kassenprotokoll.",
      "Attach the current Kassenprotokoll PDF and the current required F&B Abrechnung package according to LUME workflow.",
      "Verify all attachments.",
      "Send."
    ],
    checks: ["Current-date documents attached; no missing settlement package."],
    stop: ["Do not infer extra recipients beyond the current confirmed distribution."]
  },
  {
    id: "emailmod",
    title: "Send MOD email",
    code: "1. MOD Report",
    sectionId: "email",
    status: "live",
    aliases: ["mod email", "send mod", "mod report email", "no mod entry", "1 mod report"],
    keywords: "distribution list 1 mod report subject mod guten morgen keinen mod report eintrag",
    summary: "Send the MOD email to the 1. MOD Report distribution list and describe the actual night.",
    path: "Outlook / LUME Front Office mailbox",
    steps: [
      "Create the MOD email.",
      "Distribution list = 1. MOD Report.",
      "Subject = MOD.",
      "If there was no MOD entry, use the confirmed no-entry wording from training.",
      "If there was an incident/entry, write the actual night result instead.",
      "Keep the standard Night Manager signature.",
      "Send."
    ],
    checks: ["Message reflects the real night; do not use the no-entry text if there was an incident."],
    stop: []
  },
  {
    id: "kassenschnittmail",
    title: "Send CC Kassenschnitt",
    code: "Kassenschnitt",
    sectionId: "email",
    status: "check",
    aliases: ["kassenschnitt", "send kassenschnitt", "cc kassenschnitt", "who gets kassenschnitt"],
    keywords: "scan cc settlements sven melanie email current checklist",
    summary: "The current LUME checklist requires the CC Kassenschnitt to be scanned and sent; the documented distribution names Sven + Melanie.",
    path: "Scan current CC Kassenschnitt -> Outlook",
    steps: [
      "Scan the CC Kassenschnitt / required F&B card settlement documents.",
      "Verify the full day package is complete.",
      "Send according to the current LUME distribution; checklist names Sven + Melanie."
    ],
    checks: ["Complete current-day CC settlement package scanned and sent."],
    stop: ["Do not include unnecessary cardholder/card-number data in general SOP notes."]
  },
  {
    id: "waste",
    title: "Black waste bin scheduled task",
    code: "05:45",
    sectionId: "special",
    status: "check",
    aliases: ["black waste bin", "mulltonne", "muelltonne", "05:45", "sunday wednesday task", "waste bin"],
    keywords: "sunday night wednesday night 05:45 black waste bin rundgang",
    summary: "This is a scheduled LUME Night checklist task, not an every-night task.",
    path: "Sunday night / Wednesday night at 05:45",
    steps: [
      "At 05:45 on the applicable Sunday-night / Wednesday-night shift, put the black waste bin outside.",
      "Complete the related round."
    ],
    checks: ["Only apply on the scheduled nights."],
    stop: []
  },
  {
    id: "minibarzero",
    title: "Minibar PM 9516 is not 0.00",
    code: "9516 balance",
    sectionId: "minibar",
    status: "both",
    aliases: [
      "minibar not zero",
      "minibar balance not zero",
      "9516 not zero",
      "minibar nicht null",
      "minibar 0.00 problem",
      "minibar nuk eshte zero"
    ],
    keywords: "9516 balance difference unexpected entries 10000 10010 qty",
    summary: "Do not add an arbitrary correction. Re-check Qty and the two demonstrated offsetting lines, then stop if the balance is still not 0.00.",
    path: "Cashiering > Billing > PM 9516",
    steps: [
      "Verify the current Max Occupied Tonight count used as Qty.",
      "Verify both Minibar lines use the same Qty.",
      "Verify 10000 is the negative line and 10010 the positive counter-line in the demonstrated setup.",
      "Check for unexpected existing transactions on PM 9516.",
      "If the balance still is not 0.00, stop and confirm with trainer/FOM/Accounting before any further posting."
    ],
    checks: ["No unexplained posting remains; balance reaches 0.00 only through the confirmed entries."],
    stop: ["Never create an unsupported adjustment only to force the PM to zero."]
  },
  {
    id: "coverzero",
    title: "Cover PM 9515 is not 0.00",
    code: "9515 balance",
    sectionId: "cover",
    status: "both",
    aliases: [
      "cover not zero",
      "cover balance not zero",
      "9515 not zero",
      "cover nicht null",
      "cover nuk eshte zero"
    ],
    keywords: "9515 balance kor-a -100 gegenbuchung selected postings",
    summary: "Re-check the selected Cover postings and the KOR-A / -100% / Gegenbuchung adjustment. Stop if the balance remains unexplained.",
    path: "Cashiering > Billing > PM 9515",
    steps: [
      "Verify the posted Qty values match PS101 and the verified F&B counts.",
      "Verify only the intended Cover postings were selected for adjustment.",
      "Verify Reason Code KOR-A, Percentage -100 and Reason Text Gegenbuchung.",
      "Review the resulting counter-postings and balance.",
      "If the balance is still not 0.00 or an unfamiliar entry exists, stop and confirm before further adjustment."
    ],
    checks: ["Daily Cover quantities and counter-postings match; balance is 0.00."],
    stop: ["Do not repeat adjustments blindly or use old PM 9404 handling to clear the current PM."]
  },
  {
    id: "ccdiff",
    title: "FreedomPay and D140 do not match",
    code: "CC difference",
    sectionId: "cc",
    status: "both",
    aliases: [
      "freedompay d140 mismatch",
      "d140 difference",
      "card reconciliation difference",
      "cc not matching",
      "freedompay passt nicht",
      "karta nuk perputhen"
    ],
    keywords: "freedompay d140 mismatch difference card type cashier ifc ecom",
    summary: "Do not change workbook values to force zero. Re-check date, cashiers, IFC/ECOM selection and each card type.",
    path: "FreedomPay + OPERA D140 + Kassenabmeldung KK",
    steps: [
      "Confirm FreedomPay Business Date equals the OPERA D140 From/To date.",
      "Confirm D140 Cashiers 100, 101 and 102 are selected for CC reconciliation.",
      "Confirm relevant IFC + ECOM transaction codes are included.",
      "Confirm Negative Postings Only is OFF for the CC version.",
      "Compare values by card type, not only the grand total.",
      "Re-check KK input against the source reports.",
      "If the difference remains unexplained, stop and hand over/escalate."
    ],
    checks: ["Difference is explained by source evidence; workbook formulas remain untouched."],
    stop: ["Never edit a source value or grey/formula cell merely to make Balance = 0.00."]
  },
  {
    id: "cashdiff",
    title: "Cash / Drop difference is unexplained",
    code: "Cash difference",
    sectionId: "cash",
    status: "both",
    aliases: [
      "cash difference",
      "drop oracle difference",
      "kasse differenz",
      "cash does not match",
      "kasse passt nicht",
      "diference kasse"
    ],
    keywords: "cash count drop oracle differenz kassenstock petty cash",
    summary: "Re-count and re-check the documented inputs. An unexplained cash/drop difference is a stop condition, not a value to overwrite.",
    path: "Kassenabmeldung Neu.xlsx > Cash count",
    steps: [
      "Re-count physical denominations.",
      "Re-check Kassenstock and Petty Cash Notes.",
      "Re-check Drop Schicht 1/2/3, Drop Total and Drop Oracle inputs.",
      "Verify the correct business date and source paperwork.",
      "If the difference remains unexplained, document and escalate/handover."
    ],
    checks: ["The difference is supported/explained; no formula or source figure was overwritten."],
    stop: ["Do not manipulate Drop Oracle, cash values or formulas to create a zero difference."]
  },
  {
    id: "vccfailed",
    title: "VCC / card authorization failed or coverage is unclear",
    code: "VCC problem",
    sectionId: "vcc",
    status: "live",
    aliases: [
      "vcc declined",
      "authorization failed",
      "vcc not working",
      "partial vcc",
      "vcc coverage unclear",
      "karte abgelehnt",
      "vcc geht nicht",
      "vcc deshton"
    ],
    keywords: "vcc authorization failed declined coverage routing payer billing window refund correction",
    summary: "Stop before trying another financial action. Re-check comments, payer, routing and coverage, then hand over/escalate if the intended payment action is not confirmed.",
    path: "Due Out > Comments/Alerts > Billing > correct Window > Payment",
    steps: [
      "Read Comments / Alerts / payment instructions again.",
      "Confirm the correct payer and billing window.",
      "Confirm exactly what the VCC/card covers.",
      "Verify the authorization result.",
      "If authorization failed, coverage is partial or routing needs changing, do not improvise a refund/transfer/correction.",
      "Record the issue and hand over/escalate to the authorized trainer/FOM/Accounting route."
    ],
    checks: ["No unsupported card charge, routing change, refund or correction was made."],
    stop: ["A card being present is not authority to charge it."]
  },
  {
    id: "eoderror",
    title: "End Of Day is stuck or shows an unfamiliar error",
    code: "EOD error",
    sectionId: "eod",
    status: "live",
    aliases: [
      "eod error",
      "night audit stuck",
      "nachtlauf error",
      "tagesabschluss fehler",
      "eod blocker",
      "nachtlauf geht nicht",
      "nachtlauf problem"
    ],
    keywords: "end of day error blocker stage business date time fiscal program roll business date",
    summary: "Do not bypass an unfamiliar EOD blocker. Record the exact state and escalate.",
    path: "OPERA End of Day 5.6.25.20",
    steps: [
      "Note the current Business Date.",
      "Note the exact EOD stage.",
      "Copy the exact error/warning text.",
      "Note the time.",
      "Wait if OPERA is legitimately processing Fiscal Program / Cashier Closure / Business Date Roll.",
      "If it is an unfamiliar blocker, stop and escalate rather than attempting unsupported support/database actions."
    ],
    checks: ["The issue is documented clearly for the next authorized person/support path."],
    stop: ["Do not start a competing EOD session or interrupt the date roll/fiscal processing."]
  },
  {
    id: "missingabrechnung",
    title: "A required Bar/F&B Abrechnung is missing",
    code: "Missing Abrechnung",
    sectionId: "pm",
    status: "live",
    aliases: [
      "abrechnung missing",
      "bar not closed",
      "f&b settlement missing",
      "abrechnung fehlt",
      "fehlt abrechnung",
      "mungon abrechnung"
    ],
    keywords: "missing bar f&b settlement tagesabschluss wait",
    summary: "Wait. The live LUME trainer instruction says Tagesabschluss must not start until the required Bar/F&B settlements are handed over.",
    path: "Pre-EOD control",
    steps: [
      "Confirm which Bar/F&B settlement is still missing.",
      "Do not start Tagesabschluss.",
      "Follow up with the responsible outlet/shift.",
      "Continue the remaining safe preparatory tasks while waiting.",
      "Proceed only when the required settlement package is available."
    ],
    checks: ["Required outlet settlements are present before EOD."],
    stop: ["Do not bypass the missing Abrechnung."]
  },
  {
    id: "arrivalopen",
    title: "Arrivals are still open before / during EOD",
    code: "Remaining arrivals",
    sectionId: "eod",
    status: "live",
    aliases: [
      "arrivals still open",
      "still have arrivals",
      "can i start eod with arrivals",
      "anreisen offen",
      "anreise noch offen",
      "kam arrivals"
    ],
    keywords: "remaining arrivals 6pm cxl deposit no show eod",
    summary: "Remaining arrivals do not automatically block EOD. They must be reviewed so that any intended No-Show handling is deliberate.",
    path: "Pre-EOD final arrivals + EOD > Arrivals not yet Checked In",
    steps: [
      "Review remaining 6 PM / late arrivals.",
      "Check CXL status, card/payment setup and deposits.",
      "Apply the current LUME rule for intentional No-Shows; do not cancel blindly.",
      "Unblock No-Show rooms only when appropriate, preserving VIP/Treatment/card exceptions.",
      "During EOD review Arrivals not yet Checked In before continuing."
    ],
    checks: ["Every remaining arrival has been reviewed and its intended handling is understood."],
    stop: [
      "Do not create a blanket rule that the arrivals list must be empty, and do not guess a financial/no-show action."
    ]
  },
  {
    id: "gxpnight",
    title: "GXP during Night Audit",
    code: "GXP",
    sectionId: "gxp",
    status: "mixed",
    aliases: [
      "gxp",
      "empower gxp",
      "gxp night",
      "gxp cases",
      "bonvoy gxp",
      "how do i use gxp",
      "si perdor gxp",
      "wie nutze ich gxp"
    ],
    keywords: "gxp cases chat cec follow up dispatch bonvoy reviewed a136 hsk handover guest requests",
    summary: "At LUME Night Audit, GXP is part of handover and guest-experience follow-up. Log in at shift takeover, work Night-owned / handed-over items, and after EOD enter the relevant %A136 HSK Traces into GXP. Marriott guidance explains case/chat/CEC/Follow Up mechanics but does not create new LUME Night ownership by itself.",
    path: "EMPOWER: Guest Experiences (GXP) · authorized property access",
    steps: [
      "Log into GXP during Spätdienst handover.",
      "Review open items handed over to Night and guest communication that requires action during your shift.",
      "For a Case, verify issue, owner/current status and next action before changing status.",
      "For chat/CEC, respond or route according to the current property/Marriott process.",
      "Use Follow Up when more employee/manager action is required.",
      "For maintenance, use Work Order only through the configured property process.",
      "Treat Bonvoy “Reviewed” handling as Front Office context; continue it at Night only when handed over / required.",
      "After EOD, enter relevant %A136 HSK Traces into GXP.",
      "Hand over unresolved Cases / Follow Ups clearly instead of closing them to clear the list."
    ],
    checks: ["Case status reflects reality; unresolved items have a clear owner/next action."],
    stop: [
      "Do not change GXP admin/dispatch configuration, promise compensation or close unresolved Cases without authority."
    ]
  },
  {
    id: "gxpcec",
    title: "GXP · CEC Case",
    code: "CEC",
    sectionId: "gxp",
    status: "mixed",
    aliases: ["cec", "cec case", "gxp customer care open cases", "customer care open cases"],
    keywords: "gxp cec customer care open cases case takeover respond escalate",
    summary: "Marriott GXP guidance places CEC cases in “GXP Customer Care Open Cases”. Follow the current property / Marriott Case Takeover process when the case belongs to Night.",
    path: "GXP → GXP Customer Care Open Cases",
    steps: [
      "Read the full Case/context.",
      "Confirm whether Night owns it or it needs dispatch/escalation.",
      "Respond or route through the current property process.",
      "Use Follow Up when further action remains.",
      "Hand over unresolved ownership/next action."
    ],
    checks: ["CEC Case is not left unowned when Night is the designated owner."],
    stop: ["Do not invent compensation or a LUME-specific response-time promise."]
  },
  {
    id: "gxpworkorder",
    title: "GXP · Case vs Work Order",
    code: "Work Order",
    sectionId: "gxp",
    status: "mixed",
    aliases: ["work order", "gxp work order", "maintenance case"],
    keywords: "gxp work order maintenance engineering transcendent",
    summary: "GXP supports Work Orders for maintenance tracking. Use the property-configured workflow only; LUME’s exact Transcendent integration status is not confirmed here.",
    path: "GXP Case → Work Order (when applicable)",
    steps: [
      "Confirm it is a maintenance/engineering issue.",
      "Use the current LUME-configured Case/Work Order process.",
      "Route to the responsible function when authorized.",
      "Keep guest-facing Case status and handover aligned with actual repair progress."
    ],
    checks: ["Issue remains traceable until repair/follow-up is complete."],
    stop: ["Do not assume an integration or recurring Work Order setup not confirmed for LUME."]
  },
  {
    id: "operaversion",
    title: "Current LUME PMS",
    code: "OPERA 5.6.25.20",
    sectionId: "context",
    status: "mixed",
    aliases: ["opera version", "which opera", "opera cloud", "opera xpress", "franv"],
    keywords: "opera pms 5.6.25.20 franv cloud xpress",
    summary: "Current confirmed LUME system: OPERA PMS Version 5.6.25.20, property FRANV. Cloud/Xpress instructions are not current LUME click paths.",
    path: "OPERA PMS 5.6.25.20 · FRANV",
    steps: [
      "Use the OPERA 5.6.25.20 paths in this Control Center.",
      "After a future Cloud migration, build a separate confirmed workflow from the new live screens."
    ],
    checks: ["Live system/version matches the procedure."],
    stop: ["Do not mix OPERA Cloud/Xpress navigation into the current SOP."]
  },
  {
    id: "cashlesscontext",
    title: "LUME cashless transition",
    code: "01.10.2026",
    sectionId: "context",
    status: "mixed",
    aliases: ["cashless", "01.10.2026", "1 october 2026"],
    keywords: "lume cashless transition october 2026 cash kasse",
    summary: "Project reference: LUME plans to become fully cashless from 01.10.2026. Until management confirms the cutover is active, current cash-count/Kassenabmeldung workflow remains relevant.",
    path: "Operational transition · newest FOM / Accounting instruction wins",
    steps: [
      "Before cutover, follow current cash controls.",
      "At/after cutover, confirm the newest LUME instruction before removing cash-related Night steps."
    ],
    checks: ["Procedure matches the live operating date and current management instruction."],
    stop: ["Do not skip cash controls early just because the future date is known."]
  },
  {
    id: "service155",
    title: "Marriott 15/5 service rule",
    code: "15/5",
    sectionId: "context",
    status: "mixed",
    aliases: ["15/5", "15 5 rule", "marriott 15/5"],
    keywords: "marriott service guest recognition 15 5",
    summary: "Use the 15/5 rule as guest-facing service behavior. It does not authorize a financial action.",
    path: "Guest-facing service behavior",
    steps: [
      "Apply the current LUME/Marriott 15/5 behavior naturally.",
      "For compensation, refunds, points or postings, follow the separate authorization rule."
    ],
    checks: ["Service behavior and financial authority are not confused."],
    stop: ["15/5 is not authorization for compensation or posting changes."]
  },
  {
    id: "t134",
    title: "T134 Facility Task Details",
    code: "T134",
    sectionId: "reports",
    status: "open",
    aliases: ["t134", "facility task details", "t134 facility task details", "depart full departure clean"],
    keywords: "t134 facility task details depart full departure clean standing role report pack open",
    summary: "T134 Facility Task Details was seen during live training, but its standing role in the formal LUME Night report package is not yet confirmed.",
    path: "Post-EOD reports · exact standing use remains open",
    steps: [
      "Recognize T134 as Facility Task Details.",
      "Treat the demonstrated DEPART - Full Departure Clean screen as orientation only.",
      "Use T134 during Night Audit only when the current checklist or trainer explicitly requires it."
    ],
    checks: ["T134 has not been substituted for J146 or added to the report pack by assumption."],
    stop: [
      "Do not treat T134 as J146 and do not invent a nightly distribution rule. Confirm its standing role with the trainer/FOM."
    ]
  },
  {
    id: "oldpms",
    title: "Old PM accounts 9404 / 9600",
    code: "9404 / 9600",
    sectionId: "postpm",
    status: "open",
    aliases: ["9404", "pm 9404", "old pm 9404", "9600", "pm 9600", "old pm 9600", "9404 9600"],
    keywords: "old legacy pm accounts 9404 9600 current 9515 cover 9516 minibar do not use replace substitute",
    summary: "PM 9404 and PM 9600 are old references. They must not be used in place of the current daily Cover PM 9515 and Minibar PM 9516.",
    path: "Current daily PMs: Cover 9515 · Minibar 9516",
    steps: [
      "For Cover, use the current PM 9515 workflow.",
      "For Minibar, use the current PM 9516 workflow.",
      "If an old document or screen points to PM 9404 or PM 9600, stop and confirm before posting."
    ],
    checks: [
      "The active account is the current authorized PM 9515 or PM 9516 for the correct business date."
    ],
    stop: ["Do not post, extend, copy or check out PM 9404/9600 as substitutes for PM 9515/9516."]
  }
];

// Run Night checklist. answerId opens a card; sectionId opens the SOP section.
// Progress is saved per position (lume-v3-run-<index>): inserting a step shifts saved ticks.
const guidedRun = [
  {
    phase: "START OF NIGHT",
    title: "Kasse vom Spätdienst zählen + Rundgang machen",
    detail: "Take over the Late Shift cash and complete the security round.",
    sectionId: "start",
    source: "check"
  },
  {
    phase: "START OF NIGHT",
    title: "Übergabe mit Spätdienst + GXP anmelden",
    detail: "Receive Spätdienst handover and log into GXP. Work only Night-owned / handed-over items; use HOW for LUME + Marriott GXP logic.",
    source: "both",
    answerId: "gxpnight"
  },
  {
    phase: "START OF NIGHT",
    title: "Hausstand: Shift + F3",
    detail: "Review arrivals, departures and current House Status.",
    answerId: "house",
    source: "both"
  },
  {
    phase: "START OF NIGHT",
    title: "Traces bearbeiten + OOS/OOO Kontrolle",
    detail: "FD → Search; resolve only tasks that are definitely complete.",
    answerId: "trace",
    source: "both"
  },
  {
    phase: "START OF NIGHT",
    title: "Musik / Ordnung prüfen",
    detail: "Empfang, Lobby, Salon und Bibliothek.",
    sectionId: "start",
    source: "check"
  },
  {
    phase: "START OF NIGHT",
    title: "Meldescheine updaten + abheften / Mails bearbeiten",
    detail: "Complete the required registration-form and email work.",
    sectionId: "start",
    source: "check"
  },
  {
    phase: "START OF NIGHT",
    title: "Downtime drucken",
    detail: "Miscellaneous → Reports → %Down; FIBS only according to evacuation instruction.",
    answerId: "downtime",
    source: "check"
  },
  {
    phase: "BEFORE EOD",
    title: "A198 Guests in House - Rate Check",
    detail: "Check unrealistic rates; normal occupied 0.00 requires investigation.",
    answerId: "a198",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "PM Kontrolle + Verlängerung",
    detail: "POS PMs are not extended and must be 0.00; other PM handling depends on category.",
    sectionId: "pm",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "Kellner Abrechnungen prüfen",
    detail: "FBB, LPRF etc.; required settlements must be present before EOD.",
    answerId: "settlements",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "Letzte Anreisen prüfen",
    detail: "6 PM, possible CXL, card/payment, deposit, intended No-Show and room release exceptions.",
    answerId: "arrivalopen",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "CC Kassenschnitt scannen",
    detail: "Send according to current LUME distribution; checklist names Sven + Melanie.",
    answerId: "kassenschnittmail",
    source: "check"
  },
  {
    phase: "BEFORE EOD",
    title: "CC Check: FreedomPay + OPERA D140",
    detail: "All relevant cashiers + IFC/ECOM; reconcile by card type.",
    answerId: "d140cc",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "Minibar PM 9516",
    detail: "Use Max Occupied Tonight, 10000 / 10010, balance 0.00, Check Out, invoice behind Stornos.",
    answerId: "minibar",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "Cover PM 9515",
    detail: "PS101 + F&B covers, 71049-71054, KOR-A / -100 / Gegenbuchung, screenshot to AFOM.",
    answerId: "cover",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "D140 Stornoreport",
    detail: "Negative Postings Only + Cashier 102 → preview / print / sign.",
    answerId: "d140storno",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "Kasse 3 zählen",
    detail: "Count only before EOD; Cashier 102 closes automatically inside EOD.",
    answerId: "cashcount",
    source: "both"
  },
  {
    phase: "BEFORE EOD",
    title: "B184 Nationalitäten",
    detail: "Complete missing data when known; no CXL / No Show.",
    answerId: "b184",
    source: "check"
  },
  {
    phase: "BEFORE EOD",
    title: "Nachtlauf starten",
    detail: "Use the live EOD sequence. PM handling follows the demonstrated current categories, not a blanket checkout rule.",
    answerId: "eodstart",
    source: "both"
  },
  {
    phase: "AFTER EOD",
    title: "E100 Trial Balance",
    detail: "End Of Day Reports → E100 → Preview → print 2x → Tagesabschluss mappe.",
    answerId: "e100",
    source: "both"
  },
  {
    phase: "AFTER EOD",
    title: "T122 Vacant Rooms",
    detail: "Vacant → Days → Number of Days Vacant 3 → Room No; 1x Technik + 1x HSK.",
    answerId: "t122",
    source: "both"
  },
  {
    phase: "AFTER EOD",
    title: "%A136 HSK Traces",
    detail: "Print and enter relevant Traces in GXP (e.g. Towels).",
    answerId: "a136",
    source: "check"
  },
  {
    phase: "AFTER EOD",
    title: "HSK Listen + P112 Departures",
    detail: "Print P112 Departures for HSK.",
    answerId: "p112",
    source: "both"
  },
  {
    phase: "AFTER EOD",
    title: "PS101 Frühstücksliste",
    detail: "Comes via Outlook; print for F&B.",
    answerId: "ps101",
    source: "both"
  },
  {
    phase: "AFTER EOD",
    title: "J146 2x + VIP of the Day",
    detail: "J146 → Technik + HSK; VIP of the Day from handover → HSK + Technik.",
    answerId: "j146",
    source: "check"
  },
  {
    phase: "AFTER EOD",
    title: "Scheduled 05:45 task",
    detail: "Sunday night / Wednesday night only: schwarze Mülltonne rausstellen + Rundgang.",
    answerId: "waste",
    source: "check",
    time: "05:45 · Sun/Wed night"
  },
  {
    phase: "AFTER EOD",
    title: "Morning report / email package",
    detail: "MOD, Kassenschnitt, Kassenprotokoll/F&B Abrechnung, F&B Cover + R118 Breakfast Forecast.",
    sectionId: "email",
    source: "both"
  },
  {
    phase: "AFTER EOD",
    title: "Abreisen Check: VCC + Übergabe",
    detail: "Review Due Outs one by one, confirm payer/coverage, then prepare handover.",
    answerId: "vcc",
    source: "both"
  }
];

// Codes tab: [code, description]
const codes = [
  ["A198", "Guests in House - Rate Check"],
  ["D140", "CC reconciliation / Storno"],
  ["B184", "Nationalitäten"],
  ["E100", "Trial Balance"],
  ["T122", "Vacant Rooms"],
  ["%A136", "HSK Traces"],
  ["P112", "Departures"],
  ["PS101", "Breakfast"],
  ["J146", "Report - parameters partly open"],
  ["R118", "Breakfast Forecast"],
  ["9515", "Cover PM"],
  ["9516", "Minibar PM"],
  ["102", "Night Cashier"],
  ["%Down", "Downtime"],
  ["C/O Zero", "POS PM checkout in EOD"],
  ["KK", "Kassenabmeldung reconciliation"],
  ["GXP", "Cases / guest communication / CEC / Follow Up"],
  ["T134", "Facility Task Details - standing role open"],
  ["9404 / 9600", "Old PMs - do not substitute"]
];

// Problem tab: [button label, search query]
const problems = [
  ["Minibar is not 0.00", "minibar is not zero"],
  ["Cover is not 0.00", "cover is not zero"],
  ["FreedomPay ≠ D140", "freedompay d140 mismatch"],
  ["Cash / Drop difference", "cash difference"],
  ["Abrechnung missing", "abrechnung missing"],
  ["Arrivals still open", "arrivals still open before eod"],
  ["VCC declined / unclear", "vcc authorization failed"],
  ["EOD error / stuck", "eod error"]
];

const phaseMap = {
  start: "START OF NIGHT",
  rate: "BEFORE EOD",
  pm: "BEFORE EOD",
  minibar: "BEFORE EOD",
  cover: "BEFORE EOD",
  cc: "BEFORE EOD",
  cash: "BEFORE EOD",
  b184: "BEFORE EOD",
  eod: "EOD / NACHTLAUF",
  reports: "AFTER EOD",
  r118: "AFTER EOD",
  postpm: "AFTER EOD",
  vcc: "AFTER EOD",
  email: "AFTER EOD",
  special: "AFTER EOD",
  open: "OPEN / CONFIRM",
  gxp: "START OF NIGHT",
  context: "REFERENCE"
};

const badgeClass = {both: "b-both", check: "b-check", live: "b-live", open: "b-open", mixed: "b-both"};
const badgeLabel = {
  both: "Checklist + Live",
  check: "Checkliste NEU",
  live: "Live Training",
  open: "Open / Confirm",
  mixed: "LUME + Marriott"
};

// Screenshot guides. Files in images/ load only when shown.
const visualGuides = [
  {
    id: "vg-start",
    title: "OPERA Orientation · Front Desk & Menu",
    phase: "START OF NIGHT",
    refIds: ["trace"],
    summary: "Recognize the main OPERA screen, Front Desk module and the left menu before starting House Status, Traces and arrivals work.",
    images: [
      {
        src: "images/start-1.jpg",
        caption: "OPERA PMS 5.6.25.20 top toolbar — Front Desk, Cashiering, Rooms Management, End Of Day, Miscellaneous and other modules."
      },
      {
        src: "images/start-2.jpg",
        caption: "Front Desk left menu — Arrivals, In House Guests, Accounts, Room Assignment, Messages, Traces, Wake-up Calls, Awards."
      },
      {
        src: "images/start-3.jpg",
        caption: "Arrivals screen example. Use this as orientation; the Night SOP tells you when the screen is required."
      }
    ]
  },
  {
    id: "vg-cover",
    title: "Cover PM 9515 · complete visual sequence",
    phase: "BEFORE EOD",
    refIds: ["cover"],
    summary: "Visual sequence from PS101 breakfast count to Cover posting, adjustment and final 0.00 checkout.",
    images: [
      {
        src: "images/cover-1.jpg",
        caption: "PS101 summary — the training example used Persons / Total incl. for breakfast included in rate."
      },
      {
        src: "images/cover-2.jpg",
        caption: "PM 9515 Transaction Posting — six Cover entries using the verified daily counts."
      },
      {
        src: "images/cover-3.jpg",
        caption: "Select the newly posted Cover lines and choose Adjust Transaction."
      },
      {
        src: "images/cover-4.jpg",
        caption: "Adjustment example: Reason Code KOR-A, Percentage -100, Reason Text Gegenbuchung."
      },
      {
        src: "images/cover-5.jpg",
        caption: "Expected end state — PM 9515 checked out with Balance 0.00."
      }
    ]
  },
  {
    id: "vg-minibar",
    title: "Minibar PM 9516 · complete visual sequence",
    phase: "BEFORE EOD",
    refIds: ["minibar", "foliohistory"],
    summary: "Visual sequence for current Minibar posting, counter-posting, normal checkout and final 0.00 result.",
    images: [
      {
        src: "images/minibar-1.jpg",
        caption: "Articles lookup / Minibar context. Training searches 10050%; the resulting posting line displays 10000."
      },
      {
        src: "images/minibar-2.jpg",
        caption: "Two Minibar entries — 10000 negative and 10010 positive with the same Qty."
      },
      {
        src: "images/minibar-3.jpg",
        caption: "Check Out Options — normal Check Out selected, not Check Out With Open Folio."
      },
      {
        src: "images/minibar-4.jpg",
        caption: "Expected result — PM 9516 CHECKED OUT and Balance 0.00."
      }
    ]
  },
  {
    id: "vg-pmextend",
    title: "PM extension · live example",
    phase: "BEFORE EOD",
    refIds: ["pm"],
    summary: "Shows how the trainer opened Reservation from Billing Options and extended an applicable PM. This is not a rule to extend every PM.",
    images: [
      {
        src: "images/pmextend-1.jpg",
        caption: "Billing Options → Reservation used to reach the PM reservation details."
      },
      {
        src: "images/pmextend-2.jpg",
        caption: "Example PM after extension — Nights and Departure changed for that specific account."
      },
      {
        src: "images/pmextend-3.jpg",
        caption: "Second PM extension example. Apply only to the correct PM category."
      }
    ]
  },
  {
    id: "vg-d140cc",
    title: "FreedomPay → D140 CC Check → KK",
    phase: "BEFORE EOD",
    refIds: ["d140cc", "cashcount"],
    summary: "The visual chain for card reconciliation: run FreedomPay, configure D140 for card codes, compare totals, then check the KK workbook.",
    images: [
      {
        src: "images/d140cc-1.jpg",
        caption: "FreedomPay report status — Transaktionszusammenfassung nach Kartentyp completed and available as Excel."
      },
      {
        src: "images/d140cc-2.jpg",
        caption: "FreedomPay Excel export — card transactions grouped by card type."
      },
      {
        src: "images/d140cc-3.jpg",
        caption: "D140 parameter screen for the CC check. Use the written SOP for the exact cashier/code selection."
      },
      {
        src: "images/d140cc-4.jpg",
        caption: "Transaction Code lookup example with Description = ECOM. IFC is searched separately."
      },
      {
        src: "images/d140cc-5.jpg",
        caption: "Kassenabmeldung Neu.xlsx — KK sheet used to compare FreedomPay and OPERA values."
      }
    ]
  },
  {
    id: "vg-d140storno",
    title: "D140 Storno · Negative Postings",
    phase: "BEFORE EOD",
    refIds: ["d140storno"],
    summary: "Separate D140 use for Storno control. Do not mix these filters with the CC reconciliation version.",
    images: [
      {
        src: "images/d140storno-1.jpg",
        caption: "D140 Storno parameter example — Cashier 102 and Negative Postings Only."
      }
    ]
  },
  {
    id: "vg-eod",
    title: "Nachtlauf / End Of Day · POS PMs and Cashier 102",
    phase: "EOD / NACHTLAUF",
    refIds: ["eodstart", "eodpos", "cashier102", "rolldate"],
    summary: "Key live-training screens inside the EOD routine: POS PM zero-balance control and Cashier 102 closure.",
    images: [
      {
        src: "images/eod-1.jpg",
        caption: "Departures not Checked Out — F&B POS PM accounts shown DUE OUT with Balance 0.00."
      },
      {src: "images/eod-2.jpg", caption: "Cashier Closure Summary - 102 during End Of Day."},
      {
        src: "images/eod-3.jpg",
        caption: "Cashier Closure - 102 / Shift Drop. In the training example the visible figures were 0.00."
      }
    ]
  },
  {
    id: "vg-e100",
    title: "E100 Trial Balance · End Of Day Reports",
    phase: "AFTER EOD",
    refIds: ["e100"],
    summary: "How to recognize E100 in End Of Day Reports and the Trial Balance output that is printed twice.",
    images: [
      {src: "images/e100-1.jpg", caption: "End Of Day Reports list — E100 Trial Balance selected."},
      {src: "images/e100-2.jpg", caption: "E100 Trial Balance output example."}
    ]
  },
  {
    id: "vg-t122",
    title: "T122 Vacant Rooms · print flow",
    phase: "AFTER EOD",
    refIds: ["t122"],
    summary: "Visual example of T122 Vacant Rooms at print stage. Exact filter values remain in the written SOP.",
    images: [{src: "images/t122-1.jpg", caption: "T122 Vacant Rooms output with print dialog."}]
  },
  {
    id: "vg-p112",
    title: "P112 Departures · HSK list",
    phase: "AFTER EOD",
    refIds: ["p112"],
    summary: "Visual example of the P112 departures list used for Housekeeping.",
    images: [{src: "images/p112-1.jpg", caption: "P112 Departures report example."}]
  },
  {
    id: "vg-hsk",
    title: "Housekeeping / Facility reports · orientation",
    phase: "AFTER EOD",
    refIds: [],
    summary: "Visual orientation for the Housekeeping report stage. This does not redefine J146; exact J146 title/parameters remain open.",
    images: [
      {
        src: "images/hsk-1.jpg",
        caption: "T134 Facility Task Details example — shown in training as a separate report."
      }
    ]
  },
  {
    id: "vg-r118",
    title: "R118 Breakfast Forecast · Save to SCANS",
    phase: "AFTER EOD",
    refIds: ["r118"],
    summary: "Visual reminder of the final save location after previewing R118 Package Forecast - Summary.",
    images: [
      {
        src: "images/r118-1.jpg",
        caption: "Save As path shown in training — T:\\SCANS\\ for the Breakfast Forecast PDF."
      }
    ]
  },
  {
    id: "vg-vcc",
    title: "Due Outs / VCC · Billing orientation",
    phase: "AFTER EOD",
    refIds: ["vcc"],
    summary: "Redacted visual orientation for the Billing windows. Always verify Comments, payer, routing and VCC coverage before Payment.",
    images: [
      {
        src: "images/vcc-1.jpg",
        caption: "Redacted Billing example — inspect the correct window and charges before using Payment."
      }
    ]
  },
  {
    id: "vg-email",
    title: "Morning Email Package · Outlook attachments",
    phase: "AFTER EOD",
    refIds: ["email", "ps101", "kassenschnittmail"],
    summary: "Visual reminder of the attachment workflow used for the morning reporting package.",
    images: [
      {
        src: "images/email-1.jpg",
        caption: "Outlook attachment picker example during the morning email workflow."
      },
      {
        src: "images/email-2.jpg",
        caption: "Attachment list example with Breakfast Forecast and audit package files."
      }
    ]
  }
];

// Screenshots linked to each card / SOP section: ref -> [[guideId, [image indexes]]]
const visualLinks = {
  trace: [["vg-start", [1]]],
  pm: [["vg-pmextend", [0, 1, 2]]],
  cover: [["vg-cover", [0, 1, 2, 3, 4]]],
  ps101: [["vg-cover", [0]]],
  minibar: [["vg-minibar", [0, 1, 2, 3]]],
  d140cc: [["vg-d140cc", [0, 1, 2, 3, 4]]],
  d140storno: [["vg-d140storno", [0]]],
  eodstart: [["vg-eod", [0, 1, 2]]],
  e100: [["vg-e100", [0, 1]]],
  t122: [["vg-t122", [0]]],
  p112: [["vg-p112", [0]]],
  r118: [["vg-r118", [0]]],
  vcc: [["vg-vcc", [0]]],
  email: [["vg-email", [0, 1]]],
  kassenschnittmail: [["vg-email", [0, 1]]],
  cc: [["vg-d140cc", [0, 1, 2, 3, 4]]],
  eod: [["vg-eod", [0, 1, 2]]],
  reports: [["vg-e100", [0, 1]], ["vg-t122", [0]], ["vg-p112", [0]]]
};

// Search vocabulary
const STOPWORDS = new Set("how do i to where is are what can should please show me tell find open print run use the a an and or of for in on at from with does did my we you ich wie wo was kann soll bitte zeig mir finden oeffnen drucken ausdrucken mache macht man gehe geht der die das den dem des ein eine einer einen im am zum zur und oder von mit auf bei fuer fur si ku eshte jane bej behet mund te lutem ma mi un une ne ta".split(/\s+/));
const SYNSETS = [
  ["print", "druck", "drucken", "ausdrucken", "printo"],
  ["downtime", "%down", "systemausfall", "outage"],
  ["trace", "traces", "resolve", "resolven", "erledigen", "close"],
  ["night", "nachtlauf", "tagesabschluss", "eod", "audit"],
  ["cash", "kasse", "cashier", "kassenstock"],
  ["breakfast", "fruhstuck", "fruehstueck", "morgenmad"],
  ["forecast", "prognose"],
  ["minibar", "9516"],
  ["cover", "9515"],
  ["trial", "balance", "e100"],
  ["vacant", "t122"],
  ["departure", "departures", "departes", "p112", "dueout", "due", "out"],
  ["vcc", "virtual", "credit", "card"],
  ["storno", "negative", "postings"],
  ["nationality", "nationalitaet", "nationalitaten", "nationalitaeten", "b184"],
  ["email", "mail", "send", "senden", "schicken", "dergo"],
  ["report", "bericht", "liste"],
  ["payment", "zahlung", "bezahlen", "charge"],
  ["room", "zimmer"],
  ["arrival", "arrivals", "anreise", "anreisen"]
];
