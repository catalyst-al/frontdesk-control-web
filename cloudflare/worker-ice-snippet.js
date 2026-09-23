/*
 * Add this route inside the existing fetch(request, env) handler, after `url`
 * is created and before the existing /pair routes.
 *
 * The existing json() helper must return CORS headers and Cache-Control:
 * no-store. Configure TURN_KEY_ID and TURN_KEY_API_TOKEN as Worker secrets.
 * Add the Worker’s access and rate-limit controls before exposing this route.
 */
if (url.pathname === "/ice" && request.method === "GET") {
  const response = await fetch(
    `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate-ice-servers`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.TURN_KEY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ttl: 86400 }),
    }
  );

  if (!response.ok) {
    return json({ error: "TURN unavailable" }, 502);
  }

  const data = await response.json();
  if (!Array.isArray(data.iceServers) || data.iceServers.length === 0) {
    return json({ error: "TURN response invalid" }, 502);
  }

  return json({ iceServers: data.iceServers });
}
