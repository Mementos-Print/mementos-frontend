module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        disabled: "var(--disabled)",
        gray_: "var(--gray_)",
        disabledText: "var(--disabledText)",
        dropdown: "var(--dropdown)",
        shadow: "var(--shadow)",
        gradient_from: "var(--gradient_from)",
        gray_2: "var(--gray_2)",
        gray_1: "var(--gray_1)",
        gray_3: "var(--gray_3)",
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
