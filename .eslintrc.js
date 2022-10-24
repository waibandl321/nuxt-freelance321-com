module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    camelcase: 'off'
  }
}
