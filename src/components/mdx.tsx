import {
  Box,
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
import type { Components, TableProps, TdProps, TrProps } from "@mdx-js/react";
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
  p: (props) => (
    <Typography
      paragraph
      variant="body1"
      fontSize="1.25rem"
      {...props}
    ></Typography>
  ),
  h1: (props) => <Typography variant="h1" {...props}></Typography>,
  h2: (props) => <Typography variant="h2" {...props}></Typography>,
  h3: (props) => <Typography variant="h3" {...props}></Typography>,
  h4: (props) => <Typography variant="h4" {...props}></Typography>,
  h5: (props) => <Typography variant="h5" {...props}></Typography>,
  h6: (props) => <Typography variant="h6" {...props}></Typography>,
  blockquote: (props) => (
    <Box
      component="blockquote"
      bgcolor="#f0f0f0"
      borderLeft="4px solid #000"
      ml={0}
      mr={2}
      my={2}
      p={2}
      {...props}
    ></Box>
  ),
  table: Ta,
  tr: Tr,
  td: Td,
  inlineCode: (props) => (
    <Box
      component="code"
      bgcolor="#f0f0f0"
      borderRadius={8}
      fontFamily="Roboto Mono"
      fontSize="0.95rem"
      px={0.8}
      {...props}
    ></Box>
  ),
  a: (props) => <Link {...props}></Link>,
  img: (props) => (
    <Box
      component="img"
      display="block"
      maxWidth={1}
      mx="auto"
      {...props}
    ></Box>
  ),
};

type MdxProps = {
  children: string;
};

export const Mdx: FC<MdxProps> = ({ children }) => (
  <MDXProvider components={components}>
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
);
