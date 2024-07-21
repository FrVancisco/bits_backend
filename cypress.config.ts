import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.QA_API_BASE_URL = process.env.QA_API_BASE_URL;
      config.env.QA_AUTH_TOKEN = process.env.QA_AUTH_TOKEN;
      return config;
    },
  },
});
