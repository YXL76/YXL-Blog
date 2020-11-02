import type { FC } from "react";
import GitalkComponent from "gitalk/dist/gitalk-component";
import { Paper } from ".";
import React from "react";
import md5 from "blueimp-md5";

type GitalkProps = {
  pathname: string;
  body: string;
  language: string;
};

export const Gitalk: FC<GitalkProps> = ({ pathname, body, language }) =>
  typeof window !== "undefined" ? (
    <></>
  ) : (
    <Paper
      elevation={0}
      className="rounded-3xl px-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <GitalkComponent
        options={{
          clientID: "74dc125879a0be6e815a",
          clientSecret: "eb476c63b9f6143385bd664f0ea85d6dfc255077",
          repo: "YXL-Blog",
          owner: "YXL76",
          admin: ["YXL76"],
          id: md5(pathname.replace(/^\/(?:[^/]+)\//, "")),
          body,
          language,
        }}
      />
    </Paper>
  );
