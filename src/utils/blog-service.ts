import { Blog } from "@/types";
import { promises as fs } from "fs";
import path from "path";
import grayMatter from "gray-matter";
import { dateDescSort } from "./sorting";
import readingTime from "reading-time";
import { CONTENT_DIR } from "@/constants";
import { getAllSlugs } from "./getAllSlugs";
import { getAuthors } from "./getAuthors";
import { getTags } from "./getTags";

export const BLOG_DIR = path.join(CONTENT_DIR, "blogs");

export const getBlogUrlFromSlug = (slug: string) => {
  return path.join(BLOG_DIR, `${slug}.mdx`);
};

export const getAllBlogSlugs = async () => {
  return getAllSlugs(BLOG_DIR);
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  const slugs = await getAllBlogSlugs();

  const blogs = await Promise.all(
    slugs.map(async (slug) => await getBlogFromSlug(slug))
  );

  return blogs
    .filter((blog) => !!blog)
    .sort((a, b) => dateDescSort(a.meta.date, b.meta.date));
};

export const getBlogFromSlug = async (
  slug: string,
  includeReadNext: boolean = false
): Promise<Blog | null> => {
  try {
    const content = await fs.readFile(getBlogUrlFromSlug(slug), "utf-8");
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
        readNext:
          includeReadNext && matter.data?.readNext
            ? await getBlogsFromSlugList(matter.data.readNext)
            : [],
        readingTime: await readingTime(content),
      },
    } as Blog;
  } catch {
    return null;
  }
};

export const getBlogsFromSlugList = async (
  slugs: string[]
): Promise<Blog[]> => {
  return (
    await Promise.all(slugs.map(async (slug) => await getBlogFromSlug(slug)))
  ).filter((blog) => !!blog);
};

export const getBlogsFromTag = async (tag: string): Promise<Blog[]> => {
  return (await getAllBlogs()).filter(
    (item) => !!item.meta.tags.find((t) => t.slug === tag)
  );
};
