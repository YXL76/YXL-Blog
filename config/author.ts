export type Author = {
  name: string;
  avatar: string;
  role: string;
  bio: string;
  organizations: { name: string; url: string }[];
  interests: string[];
  career: { position: string; company: string; date: number }[];
  education: { course: string; institution: string; date: number }[];
  email: string;
  github: string;
  twitter: string;
  facebook: string;
  instagram: string;
  reddit: string;
  douban: string;
  telegram: string;
  weibo: string;
};

export const author: Author = {
  name: "YXL",
  avatar: "/images/avatar.webp",
  role: "School student",
  bio: "An amateur software developer who likes animation, movies, reading.",
  organizations: [
    {
      name: "Beijing University of Posts and Telecommunications",
      url: "https://www.bupt.edu.cn/",
    },
  ],
  interests: ["Front-end development", "Anime"],
  career: [],
  education: [
    {
      course: "Communication Engineering",
      institution: "Beijing University of Posts and Telecommunications",
      date: 2018,
    },
  ],
  email: "chenxin.lan.76@gmail.com",
  github: "YXL76",
  twitter: "600BpO7CenFdYYg",
  facebook: "chenxin.lan.76",
  instagram: "yxl_76",
  reddit: "YXL_",
  douban: "151739065",
  telegram: "yxl76",
  weibo: "6599959424",
};
