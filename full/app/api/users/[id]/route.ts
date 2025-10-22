import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/config';


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await pool.query<unknown>('SELECT * FROM users WHERE id=$1', [params.id]);
  return NextResponse.json(result.rows[0] || {});
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body: unknown = await req.json();
  const { name, email } = body;
  await pool.query('UPDATE users SET name=$1, email=$2 WHERE id=$3', [name, email, params.id]);
  return NextResponse.json({ message: 'User updated' });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await pool.query('DELETE FROM users WHERE id=$1', [params.id]);
  return NextResponse.json({ message: 'User deleted' });
}
