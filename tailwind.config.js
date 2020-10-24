module.exports = {
  corePlugins: {
    preflight: false,
  },
  future: {
    purgeLayersByDefault: true,
  },
  plugins: [],
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
      },
      maxHeight: {
        "screen-3/4": "75vh",
        80: "20rem",
      },
      height: {
        14: "3.5rem",
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
