module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {
      inset: {
        6: "1.5rem",
      },
      spacing: {
        half: "50%",
      },
      maxHeight: {
        "screen-3/4": "75vh",
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [],
};
