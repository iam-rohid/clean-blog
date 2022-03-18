import { Snippet } from "@/types";
import { promises as fs } from "fs";
import path from "path";
import { dateDescSort } from "./sorting";
import grayMatter from "gray-matter";
import { CONTENT_DIR } from "@/constants";
import { getAllSlugs } from "./getAllSlugs";
import { getAuthors } from "./getAuthors";
import { getTags } from "./getTags";

const SNIPPETS_DIR = path.join(CONTENT_DIR, "snippets");

export const getSnippetUrlFromSlug = (slug: string) => {
  return path.join(SNIPPETS_DIR, `${slug}.mdx`);
};

export const getAllSnippetSlugs = async () => {
  return getAllSlugs(SNIPPETS_DIR);
};

export const getAllSnippets = async (): Promise<Snippet[]> => {
  const slugs = await getAllSnippetSlugs();

  const snippets = await Promise.all<Snippet>(
    slugs.map(async (slug) => await getSnippetFromSlug(slug))
  );

  return snippets
    .filter((blog) => !!blog)
    .sort((a, b) => dateDescSort(a.meta.date, b.meta.date));
};

export const getSnippetFromSlug = async (
  slug: string
): Promise<Snippet | null> => {
  try {
    const content = await fs.readFile(getSnippetUrlFromSlug(slug), "utf-8");
    const matter = await grayMatter(content);
    if (matter.data.private) {
      return null;
    }
    return {
      slug: slug,
      content: matter.content,
      meta: {
        ...matter.data,
        date: new Date(matter.data.date).toISOString(),
        tags: matter.data?.tags ? getTags(matter.data.tags) : [],
        authors: matter.data?.authors ? getAuthors(matter.data.authors) : [],
      },
    } as Snippet;
  } catch {
    return null;
  }
};

export const getSnippetsFromSlugList = async (
  slugs: string[]
): Promise<Snippet[]> => {
  return (
    await Promise.all(slugs.map(async (slug) => await getSnippetFromSlug(slug)))
  ).filter((snippet) => !!snippet);
};

export const getSnippetsFromTag = async (tag: string): Promise<Snippet[]> => {
  return (await getAllSnippets()).filter(
    (item) => !!item.meta.tags.find((t) => t.slug === tag)
  );
};
