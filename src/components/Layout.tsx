import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
