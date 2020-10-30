import type { PageProps } from "gatsby";
import React from "react";
import { SEO } from "../components";
import { useLocateContext } from "../utils";

export default function App({ location: { href, pathname } }: PageProps) {
  const { message } = useLocateContext();

  return (
    <SEO
      href={href}
      pathname={pathname}
      title="Home"
      className="flex flex-col items-end pr-4 sm:pr-0 text-bg"
    >
      <h1 className="text-6xl mt-32">{message["title"]}</h1>
      <h2 className="text-2xl mt-8">{message["description"]}</h2>
    </SEO>
  );
}
