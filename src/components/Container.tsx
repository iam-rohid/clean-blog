import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`mx-auto max-w-screen-2xl px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
