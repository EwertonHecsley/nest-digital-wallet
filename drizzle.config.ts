import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out:'./drizzle',  
  dialect: 'postgresql',
  schema: 'src/accounts/infra/database/drizzle/schema.ts',
  dbCredentials:{
    url:process.env.DATABASE_URL!,
  }
})
