const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  baseUrl: 'https://www.automationexercise.com',
  specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'cypress/support/commands.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
