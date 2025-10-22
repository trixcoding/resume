import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/config';

interface User {
  name: string;
  email: string;
}

export async function GET(): Promise<NextResponse> {
  const result = await pool.query('SELECT * FROM users');
  return NextResponse.json(result.rows, { status: 200 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: User = await req.json();
  const { name, email } = body;

  await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
  return NextResponse.json({ message: 'User created' }, { status: 201 });
}
