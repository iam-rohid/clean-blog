import React, { FC, ReactNode } from "react";

const PostGrid: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default PostGrid;
