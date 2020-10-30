import type { PageProps } from "gatsby";
import React from "react";
import { SEO } from "../components";

export default function App({ location: { href, pathname } }: PageProps) {
  return (
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
}
