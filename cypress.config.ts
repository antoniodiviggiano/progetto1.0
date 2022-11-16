import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'im3ber',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})