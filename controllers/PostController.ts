import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts";
import { AddPostValidator } from "../validators/PostValidator.ts";

const kv = await Deno.openKv()
const PostController = new Hono({ strict: false });

PostController.get("/", async (c: any) => {
  const posts = kv.list({ prefix: ["posts"] });
  const new_posts = []
  for await (const post of posts) {
    new_posts.push(post.value)
  }
  return c.json(new_posts);
});

PostController.get(":id", async (c: any) => {
  const { id } = c.req.param();
  const post = await kv.get(["posts", Number.parseInt(id)]);
  return c.json(post.value);
});

PostController.post("/", AddPostValidator, async (c: any) => {
  const { body } = c.req.valid("json");
  const unix = new Date().getTime();
  const post = { id: unix, ...body };

  await kv.set(["posts", post.id], post);
  return c.json({ message: "Post succesfully created", post: post });
});

export default PostController;
