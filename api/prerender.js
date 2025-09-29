export default async function handler(req, res) {
  const botUserAgents = [
    "googlebot",
    "bingbot",
    "yandex",
    "baiduspider",
    "duckduckbot",
    "slurp"
  ];

  const userAgent = (req.headers['user-agent'] || "").toLowerCase();
  const isBot = botUserAgents.some(bot => userAgent.includes(bot));

  if (isBot) {
    const prerenderUrl = "https://service.prerender.io/";
    const targetUrl = "https://pickcoloers.xyz" + req.url;
    const snapshot = await fetch(prerenderUrl + targetUrl, {
      headers: { 'X-Prerender-Token': process.env.PRERENDER_TOKEN }
    });
    const html = await snapshot.text();
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } else {
    res.status(200).sendFile("PickColors.html", { root: "./" });
  }
}
