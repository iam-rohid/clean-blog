import { GetStaticProps } from "next";
import React, { FC } from "react";
import Container from "@/components/Container";
import Page from "@/components/Page";
import TagsList from "@/components/TagsList";
import { getAllTags } from "@/utils";
import { Tag } from "@/types";

type Props = {
  tags: Tag[];
};

const TagsPage: FC<Props> = ({ tags }) => {
  return (
    <Page title="Tags">
      <Container className="space-y-16 my-16 min-h-[600px]">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">All Tags</h1>
          <p className="space-x-2 text-lg text-gray-600 dark:text-gray-400">
            <span>{tags.length}</span>
            <span>Tags</span>
          </p>
        </div>
        {tags?.length > 0 ? (
          <TagsList tags={tags} />
        ) : (
          <div className="text-center py-48 text-gray-600 dark:text-gray-400">
            <p>Empty</p>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default TagsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      tags: await getAllTags(),
    },
  };
};
