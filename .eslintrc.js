module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/eslint-config-standard'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Promobot rules
    'operator-linebreak': ['error', 'before'],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': ['off'],
    'vue/multi-word-component-names': ['off'],
    'sub': ['off'],
    'vue/no-side-effects-in-computed-properties': ['off'],
    'no-case-declarations': ['off'],
    'no-useless-escape': ['off'],
    'no-undef': ['off']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
