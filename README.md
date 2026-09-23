# Front Desk Control + Breakfast Live

Release: 2026-09-14-native-1

Breakfast Live is a native tab immediately after Night Audit (Alt+6). The original workstation modules remain in place. Changing application tabs hides panels without reloading the tablet connection.

- index.html: complete front-desk workstation, including Breakfast Live.
- breakfast-tablet.html: standalone guest tablet app, with bundled QR libraries.
- No guest lists, reservations, real checks, payment data or backups are included in this repository.
- The workstation processes selected reports locally in the browser. Its existing storage keys are unchanged.
- Breakfast Live reads that local report automatically. Only normalized room numbers, allowed breakfast statuses, a report date and generic source labels are sent to the paired tablet. Filenames and guest-identifying fields stay on the PC.
- Cloudflare is used for temporary WebRTC signaling, not for guest lists or checks. ICE servers are requested from the signaling worker (`/ice`, Cloudflare TURN). If that endpoint is unavailable, public STUN is used as a fallback; on networks that block device-to-device traffic, TURN is required.
- The tablet keeps its local list and log when disconnected. Re-pairing transfers its retained events in small, deduplicated batches. Other Front Desk data is not synchronized.
- Keep the PC browser and tablet page open, prevent the PC from sleeping, and test the hotel network before operational use. A refresh/restart requires pairing again.
- Staff settings and local data are per browser/origin. Updating the tablet file preserves its storage keys but changing browser/origin may start a separate workspace. Export existing logs before moving to a different origin. The staff PIN is a local UI lock, not a server authentication boundary.

## Daily use
1. Load the breakfast report in the normal Breakfast tab.
2. Open Breakfast Live and check the room count/report date.
3. Press Pair tablet. On the tablet, open Staff > Live connection > Scan & connect and photograph the PC QR once.
4. Wait for Connected and the confirmed room count. Return the tablet to guest mode.
5. Work in any workstation tab; leave this browser window open.

QR libraries: qrcode-generator 2.0.4 and jsQR 1.4.0, bundled locally; see THIRD-PARTY-NOTICES.txt for their licenses. One-scan pairing needs access to the existing signaling worker. Manual pairing remains available when signaling is unavailable; direct local network connectivity is still required.
