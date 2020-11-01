import type Gitalk from "gitalk";

export const gitalkOptions: Gitalk.GitalkOptions = {
  clientID: process.env.GITALK_CLIENT_ID as string,
  clientSecret: process.env.GITALK_CLIENT_SECRET as string,
  repo: "YXL-Blog",
  owner: "YXL76",
  admin: ["YXL76"],
};
