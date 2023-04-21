module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    semi: 0
  },
  overrides: [
    {
      files: ['*.test.tsx', 'src/utils/testUtils.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-types': 0
      }
    }
  ]
}
