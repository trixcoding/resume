// lib/db.ts
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER || 'myuser',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'mydb',
  password: process.env.PGPASSWORD || 'mypassword',
  port: parseInt(process.env.PGPORT || '5432', 10),
});

export default pool;
