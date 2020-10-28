import React from "react";

export type TocItem = {
  url: string;
  title: string;
  items?: TocItem[];
};

export const TOC = (items: TocItem[]) => (
  <ul className="list-none">
    {items.map(({ url, title, items }, idx) => (
      <li key={idx} className="list-none">
        <div
          id={`toc-${url.slice(1)}`}
          className="cursor-pointer pl-2 border-0 border-l-4 border-solid border-transparent text-base leading-7 hover:text-blue-400 hover:border-blue-400 transition-colors duration-300 ease-out"
          onClick={() => {
            const anchor = document.querySelector(url);
            if (anchor) {
              anchor.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }}
        >
          {title}
        </div>
        {items && TOC(items)}
      </li>
    ))}
  </ul>
);
