import { authors } from "@/data";

export const getAuthors = (authorSlugs: string[]) => {
  return authorSlugs
    .map((author) => authors.find((a) => a.slug === author) || null)
    .filter((author) => !!author);
};
