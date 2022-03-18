import { BlogMeta } from "@/types";
import { getAllBlogSlugs, getBlogFromSlug } from "@/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import moment from "moment";
import Container from "@/components/Container";
import Page from "@/components/Page";
import Pre from "@/components/Pre";
import Code from "@/components/Code";
import Anchor from "@/components/Anchor";
import Link from "next/link";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";
import PostGrid from "@/components/PostGrid";
import BlogCard from "@/components/BlogCard";
import SectionWithTitle from "@/components/SectionWithTitle";

type Props = {
  meta: BlogMeta;
  source: any;
};

const components = {
  pre: Pre,
  code: Code,
  a: Anchor,
};

const BlogPage: FC<Props> = ({
  meta: {
    title,
    description,
    cover,
    readingTime,
    authors,
    date,
    keywords,
    tags,
    readNext,
  },
  source,
}) => {
  return (
    <Page title={title} description={description} keywords={keywords}>
      <Container className="max-w-6xl py-4 md:py-8 space-y-16">
        <div className="relative aspect-video overflow-hidden rounded-xl md:rounded-2xl border border-gray-100 dark:border-gray-800">
          <Image src={cover} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 space-x-4">
            <span>{moment(date).format("dddd, MMMM DD, YYYY")}</span>
            <span>{readingTime.text}</span>
          </p>
        </div>

        <div className="flex gap-4 lg:gap-8">
          <div className="flex-1 overflow-hidden">
            <article className="prose dark:prose-dark max-w-none">
              <MDXRemote {...source} components={components}></MDXRemote>
            </article>
          </div>

          <div className="w-48 lg:w-64 hidden md:block">
            <div className="sticky top-20 space-y-8">
              {authors?.length > 0 && (
                <SectionWithTitle title="Authors" id="authors">
                  <div className="space-y-4">
                    {authors.map((author) => (
                      <div
                        key={author.slug}
                        className="flex gap-2 items-center"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden relative">
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div>
                          <p className="leading-5 font-bold truncate">
                            {author.name}
                          </p>
                          {author.twitter && (
                            <Link
                              href={`https://twitter.com/${author.twitter}`}
                            >
                              <a
                                target="_blank"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                              >
                                @{author.twitter}
                              </a>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionWithTitle>
              )}
              {tags?.length > 0 && (
                <SectionWithTitle title="Tags" id="tags">
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                      <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                        <a className="py-1 px-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                          {tag.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </SectionWithTitle>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Container className="space-y-16 my-16">
        {readNext?.length > 0 && (
          <SectionWithTitle title="Read Next" id="read-next">
            <PostGrid>
              {readNext.map((item) => (
                <BlogCard key={item.slug} data={item} />
              ))}
            </PostGrid>
          </SectionWithTitle>
        )}
      </Container>
    </Page>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllBlogSlugs();
  return {
    paths: slugs.map((slug) => `/blog/${slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params;
  const blog = await getBlogFromSlug(slug as string, true);
  const source = await serialize(blog.content, {
    mdxOptions: {
      remarkPlugins: [remarkMdxCodeMeta],
    },
    parseFrontmatter: false,
  });
  return {
    props: {
      source,
      meta: blog.meta,
    },
  };
};
