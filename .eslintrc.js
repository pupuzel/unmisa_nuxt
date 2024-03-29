module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  ignorePatterns: [
    "**/modules/*.js",
    "assets/js/*.js"
  ],
  rules: {
    "indent": "off",
    "spaced-comment": "off",
    "space-before-blocks": "off",
    "eol-last": "off",
    "no-multiple-empty-lines" : "off",
    "space-before-function-paren" :"off",
    "no-unused-vars": "off",
    "no-useless-escape": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-extra-boolean-cast": "off",
    "prefer-const": "off",
    "comma-dangle": "off",
    "no-timing-in-fetch-data": "off",
    "no-trailing-spaces": "off",
    "Extra semicolon": "off",
    "no-undef": "off",
    "semi": "off",
    "padded-blocks": "off",
    "quotes": "off",
    "keyword-spacing": "off",
    "quote-props": "off",
    "no-var": "off",
    "no-tabs": "off",
    "no-console": process.env.NODE_ENV === 'production'? 'error' : 'off',
    "vue/singleline-html-element-content-newline": "off",
    "operator-linebreak": "off",
    "vue/html-indent": "off",
    "vue/html-self-closing": "off",
    "camelcase": "off",
    "comma-spacing": "off",
    "no-unneeded-ternary": "off",
    "object-curly-newline": "off",
    "yoda": "off",
    "vue/max-attributes-per-line": "off",
    "vue/require-default-prop": "off",
    "vue/order-in-components": "off",
    "vue/html-closing-bracket-newline": "off",
    "no-lonely-if": "off",
  }
}
