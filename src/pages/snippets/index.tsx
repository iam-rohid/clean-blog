import Container from "@/components/Container";
import Page from "@/components/Page";
import PostGrid from "@/components/PostGrid";
import SnippetCard from "@/components/SnippetCard";
import { Snippet } from "@/types";
import { getAllSnippets } from "@/utils";
import { GetStaticProps } from "next";
import React, { FC } from "react";

type Props = {
  snippets: Snippet[];
};
const SnippetsPage: FC<Props> = ({ snippets }) => {
  return (
    <Page title="Blog">
      <Container className="my-16 space-y-16">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">All Snippets</h1>
          <p className="space-x-2 text-lg text-gray-600 dark:text-gray-400">
            <span>{snippets.length}</span>
            <span>Snippets</span>
          </p>
        </div>
        {snippets?.length > 0 ? (
          <PostGrid>
            {snippets.map((item) => (
              <SnippetCard data={item} key={item.slug} />
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

export default SnippetsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const snippets = await getAllSnippets();
  return {
    props: {
      snippets,
    },
  };
};
