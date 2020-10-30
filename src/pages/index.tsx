import type { PageProps } from "gatsby";
import React from "react";
import { SEO } from "../components";

const Index = ({
  location: { href, pathname },
  pageContext: { home, title, description },
}: PageProps<
  null,
  { home?: string; title?: string; description?: string }
>) => (
  <SEO
    href={href}
    pathname={pathname}
    title={home || "Home"}
    className="flex flex-col items-end pr-4 sm:pr-0 text-bg"
  >
    <h1 className="text-6xl mt-32">{title}</h1>
    <h2 className="text-2xl mt-8">{description}</h2>
  </SEO>
);

export default Index;
