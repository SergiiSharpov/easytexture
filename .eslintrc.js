module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    "plugin:react-hooks/recommended"
  ],
  globals: {},
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  rules: {},
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }, 
      webpack: { config: './webpack.dev.config.js' }
    },
    react: { version: 'detect' }
  }
};
