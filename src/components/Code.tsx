import React from "react";

const Code = (props) => {
  return (
    <code
      {...props}
      className={`dark:bg-gray-800 bg-gray-200 text-gray-900 dark:text-gray-100 px-2 py-1 font-mono rounded-md ${props.className}`}
    />
  );
};

export default Code;
