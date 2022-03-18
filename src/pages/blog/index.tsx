import BlogCard from "@/components/BlogCard";
import Container from "@/components/Container";
import Page from "@/components/Page";
import PostGrid from "@/components/PostGrid";
import { Blog } from "@/types";
import { getAllBlogs } from "@/utils";
import { GetStaticProps } from "next";
import React, { FC } from "react";

type Props = {
  blogs: Blog[];
};
const BlogsPage: FC<Props> = ({ blogs }) => {
  return (
    <Page title="Blog">
      <Container className="my-16 space-y-16">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">All Blogs</h1>
          <p className="space-x-2 text-lg text-gray-600 dark:text-gray-400">
            <span>{blogs.length}</span>
            <span>Blogs</span>
          </p>
        </div>
        {blogs?.length > 0 ? (
          <PostGrid>
            {blogs.map((item) => (
              <BlogCard key={item.slug} data={item} />
            ))}
          </PostGrid>
        ) : (
          <div className="text-center py-48 text-gray-600 dark:text-gray-400">
            <p>Empty</p>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default BlogsPage;

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getAllBlogs();
  return {
    props: {
      blogs,
    },
  };
};
