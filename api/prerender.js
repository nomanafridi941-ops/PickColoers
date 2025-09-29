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

      if (!snapshot.ok) throw new Error("Prerender service failed");

      const html = await snapshot.text();
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(html);
    } catch (err) {
      console.error("Prerender error:", err);
      res.status(500).send("Prerender request failed.");
    }
  } else {
    try {
      const filePath = path.join(process.cwd(), "index.html");
      const html = fs.readFileSync(filePath, "utf-8");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(html);
    } catch (err) {
      console.error("File error:", err);
      res.status(500).send("Error loading index.html");
    }
  }
}