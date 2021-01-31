const { resolve } = require("path");

module.exports = {
  rootDir: resolve(__dirname, ".."),
  buildDir: resolve(__dirname, ".nuxt"),
  head: {
    title: "nuxt-phometheus-module"
  },
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [{ handler: require("../") }]
};
