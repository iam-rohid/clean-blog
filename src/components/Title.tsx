import Head from "next/head";
import { ReactNode, useMemo } from "react";

export function Title({
  suffix,
  children,
}: {
  suffix?: string | boolean;
  children?: ReactNode;
}) {
  let title = useMemo(
    () =>
      children +
      (suffix === true ? " - DevIsAwesome" : suffix ? ` - ${suffix}` : ""),
    [suffix, children]
  );

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  );
}
