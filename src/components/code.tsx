import Highlight, { defaultProps } from "prism-react-renderer";
import type { FC } from "react";
import type { Language } from "prism-react-renderer";
import React from "react";
import theme from "prism-react-renderer/themes/nightOwl";

type CodeProps = {
  code: string;
  language: Language;
};

export const Code: FC<CodeProps> = (props) => (
  <Highlight {...defaultProps} {...props} theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            <span>{i + 1}</span>
            <span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </span>
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);
