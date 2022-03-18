import { Blog } from "./blog";
import { Snippet } from "./snippet";

export type Tag = {
  name: string;
  slug: string;
  blogs?: Blog[];
  snippets?: Snippet[];
};
