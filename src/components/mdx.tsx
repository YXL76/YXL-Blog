import type { Components, TableProps, TdProps, TrProps } from "@mdx-js/react";
import type { FC, MouseEventHandler, ReactNode } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from ".";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

const Td: FC<TdProps> = ({ align, children }) => (
  <TableCell align={align || "left"}>{children}</TableCell>
);

const Tr: FC<TrProps> = ({ children }) => (
  <TableRow hover>
    {children.map(({ props }, idx) => (
      <Td key={idx} {...props} />
    ))}
  </TableRow>
);

const Ta: FC<TableProps> = ({ children }) => (
  <TableContainer component={Paper}>
    <Table>
      {children.map(({ props: { mdxType, children } }, idx) =>
        mdxType === "thead" ? (
          <TableHead key={idx}>
            <Tr {...(children as { props: TrProps }).props} />
          </TableHead>
        ) : (
          <TableBody key={idx}>
            {(children as { props: TrProps }[]).map(({ props }, idx) => (
              <Tr key={idx} {...props} />
            ))}
          </TableBody>
        )
      )}
    </Table>
  </TableContainer>
);

const scrollTo: MouseEventHandler = (event) =>
  (event.target as Element).scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

const components: Components = {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h1: (props) => <h1 {...props} onClick={scrollTo} />,
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h2: (props) => <h2 {...props} onClick={scrollTo} />,
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h3: (props) => <h3 {...props} onClick={scrollTo} />,
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h4: (props) => <h4 {...props} onClick={scrollTo} />,
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h5: (props) => <h5 {...props} onClick={scrollTo} />,
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h6: (props) => <h6 {...props} onClick={scrollTo} />,
  table: Ta,
  tr: Tr,
  td: Td,
  img: (props) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} className="w-full object-scale-down" loading="lazy" />
  ),
};

type MdxProps = {
  children?: string;
  className?: string;
  foot?: ReactNode;
};

export const Mdx: FC<MdxProps> = ({ className, children, foot }) => (
  <Paper square elevation={0} id="mdx-content" className={className}>
    <MDXProvider components={components}>
      <MDXRenderer>{children || ""}</MDXRenderer>
    </MDXProvider>
    {foot}
  </Paper>
);
