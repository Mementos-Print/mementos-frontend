module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        disabled: "var(--disabled)",
        disabledText: "var(--disabledText)",
        dropdown: "var(--dropdown)",
        shadow: "var(--shadow)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
