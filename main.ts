import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts";
import PostController from "./controllers/PostController.ts";

const app = new Hono();

app.basePath("/api/v1")
app.route("/posts", PostController)

Deno.serve(app.fetch)