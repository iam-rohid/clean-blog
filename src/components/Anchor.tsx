import Link from "next/link";
import React from "react";

const Anchor = (props) => {
  return (
    <Link href={props.href}>
      <a className="text-gray-900 dark:text-gray-100 no-underline border-b-2 border-primary-500 hover:border-primary-600">
        {props.children}
      </a>
    </Link>
  );
};

export default Anchor;
