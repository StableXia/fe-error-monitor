import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "./lib/bundle.js",
    format: "cjs",
  },
  plugins: [commonjs()],
};
