declare module "@mdx-js/react" {
  import React from "react";

  type ComponentType =
    | "a"
    | "blockquote"
    | "code"
    | "delete"
    | "em"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "hr"
    | "img"
    | "inlineCode"
    | "li"
    | "ol"
    | "p"
    | "pre"
    | "strong"
    | "sup"
    | "table"
    | "td"
    | "thematicBreak"
    | "tr"
    | "ul";

  export type TdProps = {
    align: "inherit" | "left" | "center" | "right" | "justify" | null;
    children: string;
  };

  export type TrProps = {
    children: { props: TdProps }[];
  };

  export type TableProps = {
    children: {
      props:
        | { mdxType: "thead"; children: { props: TrProps } }
        | { mdxType: "tbody"; children: { props: TrProps }[] };
    }[];
  };

  export type PreProps = {
    children: { props: { children: string; className: string } };
  };

  export type Components =
    | { tr: React.ComponentType<TrProps> }
    | { td: React.ComponentType<TdProps> }
    | { table: React.ComponentType<TableProps> }
    | { pre: React.ComponentType<PreCodeProps> }
    | {
        [key in ComponentType]?: React.ComponentType<Record<string, unknown>>;
      };

  export interface MDXProviderProps {
    children: React.ReactNode;
    components: Components;
  }
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}
