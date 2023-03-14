module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react"],
  rules: {
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-max-props-per-line": [2, { maximum: 1, when: "multiline" }],
    // "react/jsx-indent-props": [2, 2],
    // "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-console": 1,
    "no-undef": 0,
  },
};
