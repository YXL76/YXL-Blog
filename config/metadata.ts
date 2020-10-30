import type { Author } from ".";
import { author } from ".";

type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  defaultImage: string;
  keywords: string[];
  author: Author;
};

export const siteMetadata: SiteMetadata = {
  title: "YXL的小屋",
  description: "请不要忘记，我在这里",
  siteUrl: "https://yxl76.net",
  defaultImage: "/images/background.webp",
  keywords: ["blog", "computer science"],
  author,
};
