module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@/components', './src/components'],
          ['@/constants', './src/constants'],
          ['@/lib', './src/lib'],
          ['@/utils', './src/utils'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
