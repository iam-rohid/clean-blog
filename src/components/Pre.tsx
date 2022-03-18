import SyntaxHighlighter from "react-syntax-highlighter";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useMemo, useState } from "react";

const Pre = (props) => {
  const [copied, setCopied] = useState(false);

  const language = useMemo(() => {
    const match = /language-(\w+)/.exec(props.children.props.className || "");
    return match?.length > 1 ? match[1] : "";
  }, [props]);

  const copyCode = () => {
    if (copied) {
      return;
    }
    setCopied(true);
    window.navigator.clipboard.writeText(props.children.props.children);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
      <div className="px-2 h-12 flex gap-2">
        <div className="flex-1 flex overflow-hidden gap-2 pt-2">
          {props.filename && (
            <div className="px-4 h-full rounded-t-md bg-white dark:bg-gray-800 flex items-center overflow-hidden">
              <p className="truncate">{props.filename}</p>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <p className="uppercase">{language}</p>
        </div>
        <button
          className={`flex items-center justify-center h-full aspect-square ${
            copied
              ? "text-green-500"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
          onClick={copyCode}
        >
          {copied ? (
            <CheckIcon className="w-6 h-6" />
          ) : (
            <ClipboardIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      <pre {...props} className="bg-white dark:bg-gray-800 p-8 overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          {...props.children.props}
          PreTag="div"
          useInlineStyles={false}
        >
          {props.children.props.children.trim()}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
};

export default Pre;
