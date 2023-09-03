import { Hono } from "hono";
// import { serve } from "@hono/node-server";
import { Env } from "./types";
import { getAllProblemStatements } from "./db/handlers/probStmt";
import telegram_bot from "./telegram";
const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
  const data = await getAllProblemStatements(c.env.CACHE_DB);
  return c.json(data);
});

// async function getTelegramHandler() {
//   const web = await telegram_bot.({
//     domain: "sih.ikr.one",
//     path: "/telegram/webhook",
//     secret_token: process.env.BOT_TOKEN!,
//   });
// }

// app.use("/telegram");
export default app;
