import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts";
import { AddPostValidator } from "../validators/PostValidator.ts";

const kv = await Deno.openKv()
const PostController = new Hono({ strict: false });

PostController.get("/", (c: any) => {
  const posts = kv.list({ prefix: ["posts"] });
  return c.json(posts);
});

PostController.get(":id", async (c: any) => {
  const { id } = c.req.param();
  const post = await kv.get(["posts", id]);
  return c.json(post);
});

PostController.post("/", AddPostValidator, async (c: any) => {
  const { body } = c.req.valid("json");
  const unix = new Date().getTime();
  const post = { id: unix, ...body };

  await kv.set(["posts", post.id], post);
  return c.json({ message: "Post succesfully created", post: post });
});

export default PostController;
