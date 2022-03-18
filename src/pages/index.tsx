import { GetStaticProps } from "next";
import { FC } from "react";
import Container from "@/components/Container";
import Page from "@/components/Page";
import { getAllBlogs, getAllSnippets } from "@/utils";
import { Blog, Snippet } from "@/types";
import PostGrid from "@/components/PostGrid";
import BlogCard from "@/components/BlogCard";
import SectionWithTitle from "@/components/SectionWithTitle";
import SnippetCard from "@/components/SnippetCard";
import { SITE_NAME } from "@/constants";

type Props = {
  featuredBlogs: Blog[];
  recentBlogs: Blog[];
  snippets: Snippet[];
};

const HomePage: FC<Props> = ({ recentBlogs, featuredBlogs, snippets }) => {
  return (
    <Page
      title={`${SITE_NAME} - Best platform to learn programming`}
      suffix={false}
    >
      <Container>
        <div className="flex gap-8 py-16">
          <div className="flex-1 flex-col gap-16 flex">
            {featuredBlogs?.length > 0 && (
              <SectionWithTitle title="Featured Blogs" id="featured-blogs">
                <PostGrid>
                  {featuredBlogs.map((item) => (
                    <BlogCard key={item.slug} data={item} />
                  ))}
                </PostGrid>
              </SectionWithTitle>
            )}

            {recentBlogs?.length > 0 && (
              <SectionWithTitle title="Recent Blogs" id="recent-blogs">
                <PostGrid>
                  {recentBlogs.map((item) => (
                    <BlogCard key={item.slug} data={item} />
                  ))}
                </PostGrid>
              </SectionWithTitle>
            )}

            {snippets?.length > 0 && (
              <SectionWithTitle title="Recent Snippets" id="recent-snippets">
                <PostGrid>
                  {snippets.map((item) => (
                    <SnippetCard key={item.slug} data={item} />
                  ))}
                </PostGrid>
              </SectionWithTitle>
            )}
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allBlogs = await getAllBlogs();
  const snippets = await getAllSnippets();
  return {
    props: {
      featuredBlogs: allBlogs.filter((blog) => blog.meta.featured).slice(0, 4),
      recentBlogs: allBlogs.slice(0, 8),
      snippets: snippets.slice(0, 4),
    },
  };
};
