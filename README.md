# Front Desk Control + Breakfast Live

Release: 2026-09-23-turn-support-1

Breakfast Live is a native tab immediately after Night Audit (Alt+6). The original workstation modules remain in place. Changing application tabs hides panels without reloading the tablet connection.

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

## Night Audit Guidebook
`night-audit-guide/` is a step-by-step Night Audit guide for DEFRAAIR (hotelkit End of Day checklist, SAP reports, the Night Audit run, no-shows, departures not billed) with redacted screenshots.

- Open it from **Night Audit → Guidebook — step by step**, from the **How?** button on a workflow control, or directly at `night-audit-guide/index.html`.
- Every date in the guide follows the business date: the business date for most reports, the current date (business date + 1) for Trial Balance, Breakfast, VIP and Wake-up.
- Ticked steps are stored per business date in this browser only. The guide makes no network calls.
- Content lives in `night-audit-guide/data.js`; screenshots in `night-audit-guide/img/`. Screenshots must have guest names, reservation numbers, contact data and amounts removed before they are added.

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
   - Optional, any time: under VIP / Premium / Club, upload yesterday's VIP / arrivals list (PDF). Rooms with a loyalty level are marked automatically. VIP guests get breakfast even when they are not in the F&B report (green "VIP — breakfast included"); Premium (room upgrade only) and Club are shown with their level but get no breakfast. Rooms marked by hand take priority, and a new list replaces the previous one. Rows whose stay does not cover the breakfast day are greyed out and ignored.
2. Open Breakfast Live and check the room count/report date.
3. Press Pair tablet. On the tablet, open Staff > Live connection > Scan & connect and photograph the PC QR once.
4. Wait for Connected and the confirmed room count. Return the tablet to guest mode.
5. Work in any workstation tab; leave this browser window open.

QR libraries: qrcode-generator 2.0.4 and jsQR 1.4.0, bundled locally; see THIRD-PARTY-NOTICES.txt for their licenses. One-scan pairing needs access to the existing signaling worker. Manual pairing remains available when signaling is unavailable; direct local network connectivity is still required.
