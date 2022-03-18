import React, { FC, ReactNode } from "react";

const SectionWithTitle: FC<{
  children: ReactNode;
  className?: string;
  title: string;
  id?: string;
}> = ({ children, className, id, title }) => {
  return (
    <section className={`${className}`} id={id}>
      <h4 className="text-lg mb-4 font-medium">{title}</h4>
      {children}
    </section>
  );
};

export default SectionWithTitle;
