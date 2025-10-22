import pool from '@/lib/config';

export async function GET() {
  const result = await pool.query('SELECT * FROM users');
  return new Response(JSON.stringify(result.rows), { status: 200 });
}

export async function POST(req:unknown) : Promise<unknown>{
  const { name, email } = await req.json();
  await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
  return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });
}
