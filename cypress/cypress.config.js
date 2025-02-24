const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  baseUrl: 'https://news.ycombinator.com/newest',
  specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'cypress/support/command.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
