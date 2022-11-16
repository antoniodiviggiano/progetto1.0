import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'im3ber',
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
  }
})