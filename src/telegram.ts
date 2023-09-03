import { Telegraf } from "telegraf";
import { getCurrentData } from "./data";

const hook_path = "/telegram/webhook";
const welcomeMessage = `Welcome to SIH2023 status Bot`;

const last = new Date();

const bot = new Telegraf(process.env.BOT_TOKEN!);
if (process.env.NODE_ENV === "production") {
  bot.telegram.setWebhook(`https://${process.env.HOST}${hook_path}`);
}

bot.start((ctx) => ctx.reply(welcomeMessage));

bot.help((ctx) => ctx.reply("use /status to get status"));

bot.command("status", async (ctx) => {
  await ctx.reply("Getting current data...");
  const data = await getCurrentData();
  await ctx.reply("Got Data...");
  await ctx.reply(JSON.stringify(data, null, 2));
  //   ctx.editMessageText(`Got a total of ${data.length} problem statements`);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
