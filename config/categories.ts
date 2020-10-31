export type CategoriesValue = { children: string; href: string };
export type Categories = Record<string, CategoriesValue>;

export const categories: Categories = {
  Algorithm: {
    children: "keikun_002",
    href: "https://www.pixiv.net/artworks/36661714",
  },
  "Operating System": {
    children: "mioking",
    href: "https://www.pixiv.net/artworks/65595167",
  },
};
