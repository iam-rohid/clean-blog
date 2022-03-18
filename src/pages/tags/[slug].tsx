import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import Container from "@/components/Container";
import Page from "@/components/Page";
import TagsList from "@/components/TagsList";
import { tags } from "@/data";
import { getAllTags, getTagBySlug } from "@/utils";
import { Tag } from "@/types";
import PostGrid from "@/components/PostGrid";
import BlogCard from "@/components/BlogCard";
import SnippetCard from "@/components/SnippetCard";
import SectionWithTitle from "@/components/SectionWithTitle";

type Props = {
  tags: Tag[];
  selected: Tag;
};

const TagPage: FC<Props> = ({
  tags,
  selected: { blogs, slug, name, snippets },
}) => {
  return (
    <Page title={name}>
      <Container className="space-y-16 my-16">
        <div className="space-y-8">
          <TagsList tags={tags} selected={slug} />
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="space-x-2 text-lg text-gray-600 dark:text-gray-400">
              <span>{blogs.length}</span>
              <span>Blogs</span>
              <span>-</span>
              <span>{snippets.length}</span>
              <span>Snippets</span>
            </p>
          </div>
        </div>
        {blogs?.length > 0 && (
          <SectionWithTitle title="Blogs" id="blogs">
            <PostGrid>
              {blogs.map((item) => (
                <BlogCard key={item.slug} data={item} />
              ))}
            </PostGrid>
          </SectionWithTitle>
        )}
        {snippets?.length > 0 && (
          <SectionWithTitle title="Snippets" id="snippets">
            <PostGrid>
              {snippets.map((item) => (
                <SnippetCard key={item.slug} data={item} />
              ))}
            </PostGrid>
          </SectionWithTitle>
        )}
      </Container>
    </Page>
  );
};

export default TagPage;
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = tags.map((tag) => `/tags/${tag.slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params;
  const selected: Tag = await getTagBySlug(slug as string);

  return {
    props: {
      tags: await getAllTags(),
      selected,
    },
  };
};
