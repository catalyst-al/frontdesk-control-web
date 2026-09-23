/*
 * /ice route as deployed to the parkinn-breakfast-signaling Worker.
 *
 * Placed inside fetch(request, env), after the /health route and before the
 * /pair routes. Uses the Worker's reply() helper (CORS + Cache-Control:
 * no-store) and its PAIRING KV binding for a per-IP rate limit.
 *
 * Worker secrets: TURN_KEY_ID, TURN_KEY_API_TOKEN (Cloudflare Realtime TURN key).
 * Top-level constants in the Worker:
 *   const ICE_TTL_SECONDS = 86400;
 *   const ICE_WINDOW_SECONDS = 600;
 *   const ICE_MAX_PER_WINDOW = 30;
 */
// TURN/STUN servers for WebRTC (Cloudflare Realtime TURN)
if (
  request.method === "GET" &&
  url.pathname === "/ice"
) {
  if (!env.TURN_KEY_ID || !env.TURN_KEY_API_TOKEN) {
    return reply({
      ok: false,
      error: "TURN not configured"
    }, 503);
  }

  // Per-IP rate limit (approximate, KV is eventually consistent)
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const windowId = Math.floor(Date.now() / (ICE_WINDOW_SECONDS * 1000));
  const rlKey = `ice-rl:${ip}:${windowId}`;
  const used = parseInt(await env.PAIRING.get(rlKey) || "0", 10);

  if (used >= ICE_MAX_PER_WINDOW) {
    return reply({
      ok: false,
      error: "Too many requests"
    }, 429);
  }

  await env.PAIRING.put(rlKey, String(used + 1), {
    expirationTtl: ICE_WINDOW_SECONDS * 2
  });

  const response = await fetch(
    `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate-ice-servers`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.TURN_KEY_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ttl: ICE_TTL_SECONDS })
    }
  );

  if (!response.ok) {
    return reply({
      ok: false,
      error: "TURN unavailable"
    }, 502);
  }

  const data = await response.json();

  if (!Array.isArray(data.iceServers) || data.iceServers.length === 0) {
    return reply({
      ok: false,
      error: "TURN response invalid"
    }, 502);
  }

  return reply({
    ok: true,
    iceServers: data.iceServers
  });
}
