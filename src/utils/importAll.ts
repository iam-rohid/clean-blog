export function importAll(r) {
  return r
    .keys()
    .filter((filename) => filename.startsWith("."))
    .map((fileName) => ({
      slug: fileName.substr(2).replace(/\/index\.mdx$/, ""),
      module: r(fileName),
    }));
}
