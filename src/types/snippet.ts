import { Author } from "./author";
import { Tag } from "./tag";

export type Snippet = {
  meta: SnippetMeta;
  slug: string;
  content?: string;
};

export type SnippetMeta = {
  title: string;
  description: string;
  date: string;
  tags: Tag[];
  authors: Author[];
  keywords?: string;
};
