const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // change if your dev server uses a different port
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      // node event listeners if needed
      return config;
    },
  },
});
