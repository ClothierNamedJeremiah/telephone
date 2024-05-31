module.exports = {
  extends: ['next', 'prettier', 'plugin:tailwindcss/recommended'],
  plugins: ['unicorn'],
  rules: {
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all'
      }
    ],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'tailwindcss/no-custom-classname': 'off'
  }
};
