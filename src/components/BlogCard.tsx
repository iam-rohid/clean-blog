import React, { FC, useMemo } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types";

type Props = {
  data: Blog;
};

const BlogCard: FC<Props> = ({
  data: {
    meta: { title, date, authors, cover, description, readingTime },
    slug,
  },
}) => {
  const href = useMemo(() => `/blog/${slug}`, [slug]);

  return (
    <article className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-600">
      <Link href={href}>
        <a className="relative w-full block aspect-video overflow-hidden">
          <Image src={cover} layout="fill" objectFit="cover" alt={title} />
        </a>
      </Link>
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
          <span>{readingTime.text}</span>
        </p>
      </div>
    </article>
  );
};

export default BlogCard;
