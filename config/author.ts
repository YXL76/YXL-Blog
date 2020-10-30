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
  avatar: "/images/avatar.jpg",
  role: "Professor of Artificial Intelligence",
  bio:
    "My research interests include distributed robotics, mobile computing and programmable matter.",
  organizations: [
    {
      name: "Stanford University",
      url: "",
    },
  ],
  interests: [
    "Artificial Intelligence",
    "Computational Linguistics",
    "Information Retrieval",
  ],
  career: [
    {
      position: "planner",
      company: "Baidu",
      date: 2012,
    },
  ],
  education: [
    {
      course: "PhD in Artificial Intelligence",
      institution: "Stanford University",
      date: 2012,
    },
    {
      course: "MEng in Artificial Intelligence",
      institution: "Massachusetts Institute of Technology",
      date: 2009,
    },
    {
      course: "BSc in Artificial Intelligence",
      institution: "Massachusetts Institute of Technology",
      date: 2008,
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
