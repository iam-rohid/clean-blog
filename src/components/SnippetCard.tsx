import React, { FC, useMemo } from "react";
import moment from "moment";
import Link from "next/link";
import { Snippet } from "@/types";

type Props = {
  data: Snippet;
};

const SnippetCard: FC<Props> = ({
  data: {
    meta: { title, date, description },
    slug,
  },
}) => {
  const href = useMemo(() => `/snippets/${slug}`, [slug]);

  return (
    <article className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-600">
      <div className="p-4 space-y-2">
        <Link href={href}>
          <a>
            <h3 className="font-medium text-lg">{title}</h3>
          </a>
        </Link>
        <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <p className="space-x-2 text-gray-600 dark:text-gray-400">
          <span>{moment(date).format("MMMM DD, YYYY")}</span>
        </p>
      </div>
    </article>
  );
};

export default SnippetCard;
