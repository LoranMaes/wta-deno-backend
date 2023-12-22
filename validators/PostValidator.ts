import { validator } from "https://deno.land/x/hono@v3.11.8/mod.ts";
import Post from "../interfaces/Post.ts";

const AddPostValidator = validator("json", (value, c) => {
    const body = value as Post
    return { body: body }
})

export {
    AddPostValidator
}