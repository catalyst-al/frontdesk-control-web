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

## Daily use
1. Load the breakfast report in the normal Breakfast tab.
   - Optional, any time: under VIP / Premium / Club, upload yesterday's VIP / arrivals list (PDF). Rooms with a loyalty level are marked automatically. VIP guests get breakfast even when they are not in the F&B report (green "VIP — breakfast included"); Premium (room upgrade only) and Club are shown with their level but get no breakfast. Rooms marked by hand take priority, and a new list replaces the previous one. Rows whose stay does not cover the breakfast day are greyed out and ignored.
2. Open Breakfast Live and check the room count/report date.
3. Press Pair tablet. On the tablet, open Staff > Live connection > Scan & connect and photograph the PC QR once.
4. Wait for Connected and the confirmed room count. Return the tablet to guest mode.
5. Work in any workstation tab; leave this browser window open.

QR libraries: qrcode-generator 2.0.4 and jsQR 1.4.0, bundled locally; see THIRD-PARTY-NOTICES.txt for their licenses. One-scan pairing needs access to the existing signaling worker. Manual pairing remains available when signaling is unavailable; direct local network connectivity is still required.
