/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

module.exports = {
  corePlugins: {
    preflight: false,
  },
  future: {
    purgeLayersByDefault: true,
  },
  plugins: [require("tailwindcss-text-fill-stroke")()],
  purge: {
    content: [
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
    ],
    preserveHtmlElements: false,
  },
  theme: {
    extend: {
      backgroundOpacity: {
        10: "0.1",
      },
      inset: {
        3: "0.5rem",
        6: "1.5rem",
        12: "3rem",
        20: "5rem",
        "1/5": "20%",
      },
      maxHeight: {
        "screen-3/4": "75vh",
        80: "20rem",
      },
      height: {
        14: "3.5rem",
      },
      textStrokeWidth: {
        "1rem": "0.01rem",
        "2rem": "0.02rem",
        "3rem": "0.03rem",
        "4rem": "0.04rem",
      },
      transitionProperty: {
        toc: "top, box-shadow",
      },
      transitionTimingFunction: {
        "slide-exit": "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      translate: {
        14: "3.5rem",
      },
      width: {
        "screen-3/5": "60vw",
        "15/32": "46.875%",
      },
    },
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "group-hover"],
  },
};
