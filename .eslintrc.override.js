module.exports = {
  extends: ['./eslint.config.js'],
  rules: {
    // Temporarily disable the most common warnings
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': 'off',
    'prefer-const': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'no-unexpected-multiline': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off',
    'no-case-declarations': 'warn',
    'no-dupe-else-if': 'warn',
    '@typescript-eslint/no-require-imports': 'off'
  }
};
