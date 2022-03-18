import { tags } from "@/data";
import { getBlogsFromTag } from "./blog-service";
import { Tag } from "@/types";
import { getSnippetsFromTag } from "./snippet-service";

export const getAllTags = async (): Promise<Tag[]> => {
  return Promise.all(
    tags.map(async (tag) => {
      const blogs = await getBlogsFromTag(tag.slug);
      const snippets = await getSnippetsFromTag(tag.slug);
      return {
        ...tag,
        blogs,
        snippets,
      };
    })
  );
};

export const getTagBySlug = async (slug: string): Promise<Tag> => {
  const tag = tags.find((t) => t.slug === slug);
  const blogs = await getBlogsFromTag(slug);
  const snippets = await getSnippetsFromTag(tag.slug);
  return {
    ...tag,
    blogs,
    snippets,
  };
};
