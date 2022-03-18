import { ReadTimeResults } from "reading-time";
import { Author } from "./author";
import { Tag } from "./tag";

export type Blog = {
  meta: BlogMeta;
  slug: string;
  content?: string;
};

export type BlogMeta = {
  private: boolean;
  title: string;
  description: string;
  date: string;
  authors: Author[];
  tags?: Tag[];
  cover: StaticImageData | string;
  readingTime: ReadTimeResults;
  keywords?: string;
  readNext: Blog[];
  featured?: boolean;
};
