import { tags } from "@/data";

export const getTags = (tagSlugs: string[]) => {
  return tagSlugs
    .map((slug) => tags.find((tag) => tag.slug === slug) || null)
    .filter((tag) => !!tag);
};
