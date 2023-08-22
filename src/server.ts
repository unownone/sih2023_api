import { Hono } from "hono";
// import { serve } from "@hono/node-server";
import { getCurrentData } from "./data";
import { Env } from "./types";
const app = new Hono();

app.get("/", async (c) => c.jsonT(await getCurrentData()));

export default app;
