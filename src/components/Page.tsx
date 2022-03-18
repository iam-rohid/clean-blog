import Head from "next/head";
import { FC, ReactNode } from "react";
import { Title } from "./Title";

const Page: FC<{
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  suffix?: string | boolean;
}> = ({ children, title, description, keywords, suffix = true }) => {
  return (
    <>
      <Title suffix={suffix}>{title}</Title>
      <Head>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Page;
