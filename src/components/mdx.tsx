import type { Components, TableProps, TdProps, TrProps } from "@mdx-js/react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from ".";
import type { FC } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

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
  table: Ta,
  tr: Tr,
  td: Td,
};

type MdxProps = {
  children: string;
};

export const Mdx: FC<MdxProps> = (props) => (
  <MDXProvider components={components}>
    <MDXRenderer {...props}></MDXRenderer>
  </MDXProvider>
);
