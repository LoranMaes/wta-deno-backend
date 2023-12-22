import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts";

const PostController = new Hono({ strict: false });

PostController.get(":id", async (c: any) => {
  const { id } = c.req.param();
  const post = { id, title: "Hello World" };
  return c.json(post);
});

export default PostController;
