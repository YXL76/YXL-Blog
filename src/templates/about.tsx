import { AuthorCard, Layout, Mdx, useScrollTrigger } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import { useDarkModeContext } from "../utils";

export default function App({
  location,
  pageContext: { body },
}: PageProps<null, { body: string }>) {
  const { darkMode } = useDarkModeContext();
  const trigger = useScrollTrigger();

  return (
    <Layout
      {...location}
      title="About"
      trigger={trigger}
      className="group flex flex-col md:flex-row bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in"
    >
      <AuthorCard
        className={`max-w-full md:max-w-sm ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      />
      <Mdx className="w-full p-6">{body}</Mdx>
    </Layout>
  );
}
