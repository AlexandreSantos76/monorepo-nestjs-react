import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    schema: './src/database/schema',
    out: './src/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    // Para bancos existentes
    introspect: {
        casing: 'camel', // ou 'snake_case' dependendo do seu padrão
    },
});