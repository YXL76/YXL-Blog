import type { PageProps } from "gatsby";
import React from "react";
import { SEO } from "../components";

const P404 = ({ location: { href, pathname } }: PageProps) => (
  <SEO
    href={href}
    pathname={pathname}
    title="404"
    className="m-auto flex flex-col items-center p-4 text-bg"
  >
    <h1 style={{ fontSize: 256 }}>404</h1>
    <h2 className="text-5xl">PAGE NOT FOUND</h2>
  </SEO>
);

export default P404;
