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
        6: "1.5rem",
        20: "5rem",
      },
      maxHeight: {
        "screen-3/4": "75vh",
      },
      height: {
        14: "3.5rem",
      },
      transitionTimingFunction: {
        "slide-exit": "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      translate: {
        14: "3.5rem",
      },
      width: {
        "screen-3/5": "60vw",
      },
    },
    screens: {
      lg: "1280px",
      md: "960px",
      sm: "600px",
      xl: "1920px",
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "group-hover"],
  },
};
