# Front Desk Control + Breakfast Live

Release: 2026-09-23-turn-support-1

Breakfast Live is a native tab (Alt+6). The original workstation modules remain in place. Changing application tabs hides panels without reloading the tablet connection.

## Navigation
The sections sit in a left sidebar, grouped as **Shift** (Breakfast, Handover), **Front desk** (Invoice address, Events), **SOP** (Check-in / out, Night Audit, Night Audit 2.0), **Project** (Breakfast Live) and **Team** (Access). Each item shows its badge and its Alt key; **Alt+M** or the arrow folds the sidebar to icons (remembered in this browser). In a half-screen window (700 to 1099px) the sidebar stays beside the content folded to icons; the arrow or Alt+M opens it over the content until a section is chosen (Escape or a click outside closes it). Below 700px the sidebar becomes a scrollable strip at the top. Keyboard: Alt+1 Breakfast, Alt+2 Handover, Alt+5 Night Audit, Alt+6 Breakfast Live, Alt+7 Events, Alt+8 Check-in / out, Alt+0 Night Audit 2.0, Alt+A Access, Alt+I Invoice address.

Registration, VCC and Group are retired: they are no longer in the menu or on a shortcut, and a browser that last had one of them open starts on Breakfast. Their code stays in the file, dormant, and data they saved in a browser is left as it is (still part of **Back up this shift**). The sections below that describe them are kept for reference.

## Access
The **Access** tab (Alt+A) is the editable list of the desk's logins: system, which window / where, user, password, note and the date of the last change. It replaces the printed credentials sheet.

- The site carries the list **only encrypted**, in `access-vault.js` (AES-256-GCM, key derived from the **site key** with PBKDF2-SHA256, 600 000 rounds). The site key is never in this repository; the desk keeps it. On a PC that does not have the list yet, the tab asks for the site key once and loads the list into this browser (`parkInnAccess_v1`, included in **Back up this shift**).
- After that the tab opens with the fixed desk PIN. It locks when another section is opened, after five minutes without use and with **Lock**. The PIN is a screen lock for the desk, not a security boundary.
- Edit a login (&#9998;) whenever a password or e-mail changes; the change is saved on this PC at once. **Save for all PCs** encrypts the list again with the site key and downloads a new `access-vault.js`: replace the file in this repository with it, and every PC is offered the new list (a PC with its own unsaved changes is warned before they are replaced).
- Passwords are masked; the eye reveals one, **Show passwords** all of them for two minutes. **Copy** puts the user or password on the clipboard.
- **Print sheet** (or Ctrl+P on this tab) prints every login on one A4 sheet in the layout of the "Current Access Credentials" PDF: one card per system, logins of the same system (FIORI first / second window) side by side, alternatives separated by OR.
- **Export / Import** still move the list as a plain JSON file (`{ "entries": [ { "system", "label", "user", "password", "note" } ] }`); such files hold the passwords in clear text and are never committed.

- index.html: complete front-desk workstation, including Breakfast Live.
- breakfast-tablet.html: standalone guest tablet app, with bundled QR libraries.
- No guest lists, reservations, real checks, payment data or backups are included in this repository.
- The workstation processes selected reports locally in the browser. Its existing storage keys are unchanged.
- Breakfast Live reads that local report automatically, plus the in-house VIP rooms (sent as room number + INCLUDED only). Only normalized room numbers, allowed breakfast statuses, a report date and generic source labels are sent to the paired tablet. Filenames and guest-identifying fields stay on the PC.
- Cloudflare is used for temporary WebRTC signaling, not for guest lists or checks. The workstation and tablet request ICE servers from the signaling worker's `/ice` route. If that route is unavailable, they fall back to public STUN; hotel networks that block direct device connections may require TURN.
- The `parkinn-breakfast-signaling` Worker is managed outside this repository. `cloudflare/worker-ice-snippet.js` is the `/ice` route deployed to it: it calls Cloudflare Realtime TURN with the `TURN_KEY_ID` and `TURN_KEY_API_TOKEN` Worker secrets, returns `{ ok, iceServers }` with 24-hour credentials, and is rate-limited per IP (30 requests per 10 minutes, via the `PAIRING` KV namespace).
- The tablet keeps its local list and log when disconnected. Re-pairing transfers its retained events in small, deduplicated batches. Other Front Desk data is not synchronized.
- Keep the PC browser and tablet page open, prevent the PC from sleeping, and test the hotel network before operational use. A refresh/restart requires pairing again.
- Staff settings and local data are per browser/origin. Updating the tablet file preserves its storage keys but changing browser/origin may start a separate workspace. Export existing logs before moving to a different origin. The staff PIN is a local UI lock, not a server authentication boundary.

## Print and Save PDF on the SOPs
Every SOP has **Print** and **Save PDF**: the Check-in / out guide, the Night Audit Guidebook, Night Audit 2.0 (the step guide, or the Visual SOP when that view is open) and the two SAP guides in the Breakfast tab (breakfast report, VIP list). **Save PDF** opens the same print window with the file name already set (for example `SOP Check-in Check-out 18.11.2026`, taken from the page title by Chrome and Edge) and a hint to choose **Save as PDF** or **Microsoft Print to PDF** as the printer; the browser writes the file. The shared helper is `sop-pdf.js`; it makes no network calls.

## Night Audit Guidebook
`night-audit-guide/` is a step-by-step Night Audit guide for DEFRAAIR (hotelkit End of Day checklist, SAP reports, the Night Audit run, no-shows, departures not billed) with redacted screenshots.

- Open it from **Night Audit → Guidebook — step by step**, from the **How?** button on a workflow control, or directly at `night-audit-guide/index.html`.
- Every date in the guide follows the business date: the business date for most reports, the current date (business date + 1) for Trial Balance, Breakfast, VIP and Wake-up.
- Ticked steps are stored per business date in this browser only. The guide makes no network calls.
- Content lives in `night-audit-guide/data.js`; screenshots in `night-audit-guide/img/`. Screenshots must have guest names, reservation numbers, contact data and amounts removed before they are added.

## Night Audit 2.0
The **Night Audit 2.0** tab (Alt+0, right after Night Audit) shows `night-audit-2/`, a step-by-step guide to the new Night Audit app in EMMA v2 (Fiori), built from the Radisson SOP "EMMA v2 (Fiori) | New Night Audit functions". It can also be opened directly at `night-audit-2/index.html`.

- **Step by step**: A. open Fiori from the desktop icon and sign in (first window: the front-office user; second window: your own TMS user ID and password, both kept in the Access tab), then the app (business date, the Processes list with blue counters and green ticks, tick the line → Actions); B. the five processes solved in the app (Expected arrivals not Checked-In: express check-in, change arrival date, no-show; Expected departures not Checked-Out: move to virtual Z001 or express check-out; Events & Groups limit billing date; Day-Guest billing; Individual reservations not yet billed: automatic invoicing for amount due 0); C. the eight informative processes solved in TMS / Folio Management / POS (invoices not paid, payments on hold, room moves, cancel/no-show charges, locked reservations, POS outlets, events not checked in / out); D. Execute Night Audit. Each step has the screenshot of its screen and Actions menu, a check, and a "watch out" where money is involved.
- **All 13 processes** is the one-page overview (mandatory/optional, actions in the app, where it is solved); **Questions** answers what changed and what to do when an action is refused.
- **Visual SOP** reproduces the DEFRAAIR visual guide "EMMA v2 (Fiori) – New Night Audit functions" (16 pages) page by page: cover, quick reference, the 13 process pages with the source screenshot or workflow, Steps / Check boxes and a link to the matching step, and the "Before completing Night Audit" checklist, tickable per night. It was checked against the Radisson source SOP before it was added; the managers named in the document are written as FOM / GM here.
- Every step can be ticked **Done tonight**. Ticks belong to the business date (the Night Audit tab's date when opened from the workstation, otherwise the night from 12:00 to 12:00) and are stored in this browser only; **Reset night** clears them.
- Content lives in `night-audit-2/data.js`; screenshots in `night-audit-2/img/`. They come from the SOP (Radisson Blu demo hotels; the screens are the same for DEFRAAIR) with guest and company names, reservation / invoice / event numbers, amounts and staff names blurred. New screenshots must be redacted the same way before they are added. Statements that are our own reading of the screenshots, not the SOP, are marked as notes in the steps.
- The page makes no network calls.

## Events
The **Events** tab (Alt+7) reads the DEFRAAIR "Event weekly planning" PDF and shows, for each day of that week, which function rooms are booked, for which group, how many people and when.

- Getting the PDF from SAP: House status → Event weekly planning → Print → Output Device `locl` → Microsoft Print to PDF. The button **How to get this PDF from SAP** in the tab shows these steps with screenshots from `events-guide/`, in which group names, booking files and staff names are covered. New screenshots must be redacted the same way before they are added.
- Upload the PDF in the tab. It is read in this browser with the built-in PDF reader; nothing is uploaded, and the PDF itself is not stored or committed.
- The parsed bookings (group, status, booking file, event type, people, times, room, organizer, main customer) are kept in this browser until **Clear** or a new week is loaded. They are part of **Back up this shift**.
- Per day: groups, people (each booking counted once, even when it moves between rooms), rooms in use, first start and last end, a timeline per room, and each group's schedule with its organizer. Today also shows what is running now and what starts next.
- **Check** lists a group whose number of people differs between its rooms on the same day, and bookings without a people/time line. **Print day** prints the selected day.
- Creator, Follow Up and 2nd Agent are read but not shown.

## Check-in / Check-out
The **Check-in / out** tab (Alt+8) shows `checkin-guide/`, a step-by-step check-in and check-out guide for DEFRAAIR in SAP (TMS). It can also be opened directly at `checkin-guide/index.html`.

- **Step by step**: House status → Arrivals Expected → select the reservation → Check In → Enter → room → Billing Information → Modify header → bill to → stay options (breakfast, parking) → Folio maintenance → Create invoice → till → Payment Gateway → Save (PinPad or card on the reservation) → folio paid (red) → Back → Record key → encode the card; check-out: Check-out → room → folio all red → chequered flag, each with its screenshot. The guide grows as further screenshots arrive.
- **Special cases** and **What to say** summarise the Front Office SOPs 4.7 – 4.10 (on-the-day rates, early arrivals, guest arrival, registration form). Payment follows the current practice: everything is paid at check-in, by card only (no cash); a VCC covers only the booking, the guest pays the tourist tax and extras.
- Content lives in `checkin-guide/data.js`; screenshots in `checkin-guide/img/`. Screenshots must have guest names, reservation numbers, room numbers, contact data, company names, staff names, invoice numbers, client numbers and card digits covered before they are added.
- The page makes no network calls. Only the display choice (one step / all steps, last step open) is stored in this browser.
- `checkin-guide/SOP_FO-CICO_Check-in_Check-out.pdf` is the same procedure as a German SOP (FO-CICO v1.5, draft for FOM approval), opened with **SOP (PDF)** in the guide. When the guide's steps or rules change, update the PDF as well.

## Registration
The **Registration** tab (Alt+9) is the hotel registration card (Meldeschein): reception fills it in at the desk and prints it for the guest to sign; colleagues enter the cards in SAP later.

- The form has every field of the SAP registration card. Room, first name, last name and e-mail are needed before a card shows as **Ready**; salutation, names, company and e-mail are grouped at the top as the main details. Leisure / Business (with the employer, for the Frankfurt tourism contribution) is ticked at the desk; the Radisson Rewards and marketing boxes are left for the guest.
- **Save** (Enter or Ctrl+S) keeps the card under its room number in the list on the left. Saving the same guest, room and arrival date again updates that card. Three digits are enough for the room (423 → 0423), eight for a date (06101990 → 06.10.1990).
- **Print for signature** (or Ctrl+P on this tab) prints the card on one A4 page in the layout of the SAP card. **Print all** prints every card shown in the list, one page each; **Download Excel** saves them as an .xlsx file in which every cell is text, so 0423, "+49 …" and long document numbers stay as typed.
- Colleagues tick **In SAP** once a card is entered; the tab badge counts the cards not yet in SAP.
- Optional: drop the registration card printed from SAP to PDF (Microsoft Print to PDF) on **SAP card (PDF)** to fill name, company, country, e-mail, room, dates, guests, reservation and payment. A PDF with several cards adds them all. The PDF is read in this browser and not stored.
- Cards are kept in this browser only, are part of **Back up this shift**, and are deleted automatically 3 days after check-out (60 days after saving at the latest). A card that is being typed survives a reload. The card the guest signed stays the original; printouts and downloaded lists carry passport data and stay on hotel equipment.

## Invoice address
The **Invoice address** tab (Alt+I) corrects, completes or replaces the address on an invoice printed from SAP to PDF (Microsoft Print to PDF), and prints it or saves it as a new PDF. It reads English and German invoices (Fiscal information / Postal address, Steuerinformation / Adresse).

- Drop the invoice PDF on the tab. Its address appears on the left, line by line: add a line (for example the VAT / NIPT number), change or delete any line, or replace it all with a typed or **saved company**. The invoice changes only where the text differs from what it shows; a changed field is marked green and **as on invoice** puts the original back.
- **Same address in both blocks** writes one address under both headings; untick it to give Fiscal information and Postal address different text. A new address typed before an invoice is loaded is kept and used; corrections made to one invoice are not carried to the next.
- The change is made on every page. The old address is removed from the PDF, not only covered, so programs that read the PDF text find only the new one. The new lines are written in Helvetica at the size of the old ones. When the address has more lines than before, the lines under it (Party, Reservation / Voucher, Copy) move down as they are; if there is not enough room, the address lines are set closer and the tab says so.
- The preview marks the changed area with a green box (not printed); **Show original** compares with the PDF as loaded. **Print** (or Ctrl+P on this tab) prints the pages full size; **Save PDF** downloads `<invoice>_<company>.pdf`.
- The PDF is read and written in this browser and not stored. **Save this company** keeps the address in this browser (`parkInnInvoiceFirms_v1`, part of **Back up this shift**).
- The PDF writer is pdf-lib 1.17.1 (MIT), bundled in `index.html` and started the first time the tab writes a PDF; see THIRD-PARTY-NOTICES.txt.

## LUME Night Audit
`lume-night-audit/` is the Night Audit control center for LUME Boutique Hotel (OPERA PMS): Run Night checklist, Ask / Search, Codes, Problem / Unsure, Visual Guides and the Full SOP. Open `lume-night-audit/index.html` directly.

- Run Night ticks are stored per night in this browser only. A night runs from 12:00 to 12:00, so a new night starts empty; nights older than a week are removed.
- **Print summary** on Run Night prints one page for the handover: every step with its tick time, the steps still open and a signature line.
- Content lives in `lume-night-audit/data.js`; `app.js` only renders it. Screenshots are in `lume-night-audit/images/` and must contain no guest names, reservation numbers, card data or credentials. Export blurry screenshots again from the original source rather than enhancing them in the browser.
- The page makes no network calls.
- After editing `data.js`, run `node lume-night-audit/check-data.js`. It reports broken card, section, visual guide and image references, unused images, and Codes / Problem buttons that find no answer.
- Keyboard: arrow keys move between tabs; screenshots open with Enter or Space; the help drawer and the zoomed screenshot keep Tab inside and close with Esc, returning focus to where it was.

## Daily use
1. Load the breakfast report in the normal Breakfast tab.
   - Getting the report from SAP: **How to get this report from SAP** under the upload button shows the steps with screenshots from `breakfast-guide/`: `/CCSHT/RC_SI_003` + Enter → F&B Services Forecast with today's date (not changed) → Execute → Print → Output Device `locl` → Microsoft Print to PDF → save as `Breakfast` in Downloads → Upload breakfast report. Guest names and the hotel's printer names are covered in the screenshots; new screenshots must be redacted the same way before they are added.
   - Optional, any time: under VIP / Premium / Club, upload yesterday's VIP / arrivals list (PDF). Rooms with a loyalty level are marked automatically. VIP guests get breakfast even when they are not in the F&B report (green "VIP — breakfast included"); Premium (room upgrade only) and Club are shown with their level but get no breakfast. Rooms marked by hand take priority, and a new list replaces the previous one. Rows whose stay does not cover the breakfast day are greyed out and ignored.
   - Getting the VIP list from SAP: **How to get the VIP list from SAP** under the VIP upload shows the steps with screenshots from `vip-guide/`: House status → previous day (◀) → In-house (Check-ins) → Choose Layout `/YANBU` → Print → `locl` → Microsoft Print to PDF → save as `VIP` in Downloads → Upload VIP / arrivals list. This in-house list holds every guest in house with the loyalty level (VIP column R1 Club, R2 Premium, R3 VIP), also those who arrived on earlier days; the status line then says "in-house" with the span of arrival dates. Guest names, companies and reservation numbers are covered in the screenshots.
2. Open Breakfast Live and check the room count/report date.
3. Press Pair tablet. On the tablet, open Staff > Live connection > Scan & connect and photograph the PC QR once.
4. Wait for Connected and the confirmed room count. Return the tablet to guest mode.
5. Work in any workstation tab; leave this browser window open.

QR libraries: qrcode-generator 2.0.4 and jsQR 1.4.0, bundled locally; see THIRD-PARTY-NOTICES.txt for their licenses. One-scan pairing needs access to the existing signaling worker. Manual pairing remains available when signaling is unavailable; direct local network connectivity is still required.
