import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const botUserAgents = [
    "googlebot",
    "bingbot",
    "yandex",
    "baiduspider",
    "duckduckbot",
    "slurp"
  ];

  const userAgent = (req.headers["user-agent"] || "").toLowerCase();
  const isBot = botUserAgents.some(bot => userAgent.includes(bot));

  if (isBot) {
    try {
      const prerenderUrl = "https://service.prerender.io/";
      const targetUrl = "https://pickcoloers.xyz" + req.url;

      const snapshot = await fetch(prerenderUrl + targetUrl, {
        headers: { "X-Prerender-Token": process.env.PRERENDER_TOKEN }
      });

      const html = await snapshot.text();
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(html);
    } catch (err) {
      res.status(500).send("Prerender request failed.");
    }
  } else {
    try {
      const filePath = path.join(process.cwd(), "index.html");
      const html = fs.readFileSync(filePath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(html);
    } catch (err) {
      res.status(500).send("Error loading index.html");
    }
  }
}
