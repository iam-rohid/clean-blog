import Link from "next/link";
import React from "react";

import Page from "@/components/Page";

const PageNotFound = () => {
  return (
    <Page title="Page no found">
      <div className="flex items-center justify-center px-4 py-16 flex-col gap-8">
        <h1 className="text-[18rem] font-bold">404</h1>
        <p className="text-5xl font-medium opacity-80">Page Not Found 🤕</p>
        <Link href="/">
          <a className="text-blue-500 font-medium text-3xl hover:text-blue-600">
            Go back Home 🏠
          </a>
        </Link>
      </div>
    </Page>
  );
};

export default PageNotFound;
