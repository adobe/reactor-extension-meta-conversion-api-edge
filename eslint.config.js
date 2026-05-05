const prettierRecommended = require('eslint-plugin-prettier/recommended');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const reactPlugin = require('eslint-plugin-react');
const importPlugin = require('eslint-plugin-import');
const testingLibraryPlugin = require('eslint-plugin-testing-library');

module.exports = [
  {
    ignores: ['**/*.html', '**/*.css', '**/*.styl']
  },
  prettierRecommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      import: importPlugin,
      'testing-library': testingLibraryPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      camelcase: [2, { properties: 'always' }],
      semi: [2, 'always'],
      'keyword-spacing': [2],
      'space-before-function-paren': [
        2,
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'space-before-blocks': [2, 'always'],
      'space-infix-ops': [2, { int32Hint: false }],
      quotes: [1, 'single', 'avoid-escape'],
      'max-len': [
        2,
        100,
        4,
        {
          ignoreUrls: true,
          ignorePattern:
            '^(\\s*(var|let|const)\\s.+=\\s*require\\s*\\()|(^\\s*import)'
        }
      ],
      eqeqeq: [2, 'allow-null'],
      strict: [2, 'global'],
      'no-nested-ternary': [2],
      'no-underscore-dangle': 0,
      'comma-style': [2],
      'one-var': [2, 'never'],
      'brace-style': [2, '1tbs', { allowSingleLine: true }],
      'consistent-this': [0, 'self'],
      'spaced-comment': 0,
      'prefer-const': ['error', { destructuring: 'all' }]
    }
  }
];
