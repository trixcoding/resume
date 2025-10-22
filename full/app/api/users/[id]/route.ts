import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/config';

interface User {
  name: string;
  email: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const result = await pool.query<User>('SELECT * FROM users WHERE id=$1', [params.id]);
  return NextResponse.json(result.rows[0] || {});
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const body: User = await req.json(); // حالا تایپ مشخصه
  const { name, email } = body;

  await pool.query(
    'UPDATE users SET name=$1, email=$2 WHERE id=$3',
    [name, email, params.id]
  );
  return NextResponse.json({ message: 'User updated' });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await pool.query('DELETE FROM users WHERE id=$1', [params.id]);
  return NextResponse.json({ message: 'User deleted' });
}
