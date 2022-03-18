import { promises as fs } from "fs";

export const getAllSlugs = async (dir: string) => {
  const files = await fs.readdir(dir, { withFileTypes: true });
  return files
    .filter((file) => file.isFile && file.name.endsWith(".mdx"))
    .map((file) => file.name.replace(".mdx", ""));
};
