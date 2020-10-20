module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      inset: {
        6: "1.5rem",
      },
      spacing: {
        half: "50%",
      },
    },
  },
  variants: {},
  plugins: [],
};
