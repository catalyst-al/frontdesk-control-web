// Add to the "parkinn-breakfast-signaling" Worker, inside fetch(request, env),
// before the existing /pair routes. Use the same CORS headers the Worker already uses.
// Cloudflare secrets: TURN_KEY_ID and TURN_KEY_API_TOKEN (Realtime -> TURN -> Create key).

if (url.pathname === "/ice" && request.method === "GET") {
  const r = await fetch(
    `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.TURN_KEY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ttl: 3600 }),
    }
  );
  if (!r.ok) return json({ error: "TURN unavailable" }, 502); // json() = existing CORS helper
  const data = await r.json();
  // Cloudflare may return iceServers as a single object or as an array.
  const ice = Array.isArray(data.iceServers) ? data.iceServers : [data.iceServers];
  return json({ iceServers: ice });
}
