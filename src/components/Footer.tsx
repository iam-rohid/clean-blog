import { SITE_NAME } from "@/constants";
import React from "react";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800">
      <Container>
        <div className="py-8">
          <p className="uppercase">© 2022 {SITE_NAME.replaceAll(" ", "")}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
