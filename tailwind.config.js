/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const plugin = require("tailwindcss/plugin");

module.exports = {
  corePlugins: {
    preflight: false,
  },
  future: {
    purgeLayersByDefault: true,
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(
        {
          ".text-shadow": {
            "text-shadow": "4px 1px 4px var(--divider)",
          },
        },
        []
      );
    }),
  ],
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
      inset: {
        3: "0.5rem",
        6: "1.5rem",
        12: "3rem",
        20: "5rem",
        "1/5": "20%",
        1: "100%",
      },
      maxHeight: {
        "screen-3/4": "75vh",
        80: "20rem",
      },
      height: {
        14: "3.5rem",
      },
      textColor: {
        bg: "var(--bg)",
        primary: "var(--primary)",
        text: "var(--text)",
      },
      transitionProperty: {
        toc: "top, box-shadow",
        width: "width",
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
