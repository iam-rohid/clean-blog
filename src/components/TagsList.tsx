import Link from "next/link";
import { useMemo } from "react";
import { Tag } from "@/types";

const TagsList = ({ tags, selected }: { tags: Tag[]; selected?: string }) => {
  return (
    <ul className="flex items-center justify-center gap-2 flex-wrap">
      {tags.map((tag) => (
        <TagItem tag={tag} key={tag.slug} selected={selected} />
      ))}
    </ul>
  );
};
const TagItem = ({ tag, selected }: { tag: Tag; selected?: string }) => {
  const isSelected = useMemo(() => tag.slug === selected, [tag, selected]);
  const itemCount = useMemo(
    () => tag.blogs.length + tag.snippets.length,
    [tag]
  );
  return (
    <li
      className={`flex items-center rounded-full  ${
        isSelected
          ? "bg-primary-500 text-gray-100"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      <Link href={`/tags/${tag.slug}`}>
        <a className="px-3.5 py-1.5 h-full">
          <p className="space-x-2">
            <span>{tag.name}</span>
            <span className="opacity-50">{itemCount}</span>
          </p>
        </a>
      </Link>
    </li>
  );
};
export default TagsList;
