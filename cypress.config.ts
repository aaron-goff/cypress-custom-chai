import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://todomvc.com/examples/react/dist/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
