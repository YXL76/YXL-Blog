import type { Components, TableProps, TdProps, TrProps } from "@mdx-js/react";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from ".";
import type { FC } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

const Td: FC<TdProps> = ({ align, children }) => (
  <TableCell align={align ?? "left"}>{children}</TableCell>
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

const components: Components = {
  p: (props) => <Typography variant="body1" {...props}></Typography>,
  h1: (props) => <Typography variant="h1" {...props}></Typography>,
  h2: (props) => <Typography variant="h2" {...props}></Typography>,
  h3: (props) => <Typography variant="h3" {...props}></Typography>,
  h4: (props) => <Typography variant="h4" {...props}></Typography>,
  h5: (props) => <Typography variant="h5" {...props}></Typography>,
  h6: (props) => <Typography variant="h6" {...props}></Typography>,
  table: Ta,
  tr: Tr,
  td: Td,
  a: (props) => <Link {...props}></Link>,
};

type MdxProps = {
  children: string;
};

export const Mdx: FC<MdxProps> = ({ children }) => (
  <MDXProvider components={components}>
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
);
