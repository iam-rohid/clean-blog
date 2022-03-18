import { AppProps } from "next/app";

import { ThemeProvider } from "@/context";
import Layout from "@/components/Layout";

import "tailwindcss/tailwind.css";
import "@/styles/index.scss";
import { SWRConfig } from "swr";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <SWRConfig>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ThemeProvider>
  );
};

export default MyApp;
