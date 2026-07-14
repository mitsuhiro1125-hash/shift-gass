import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'key is required' }, { status: 400 });
  }
  try {
    const row = await prisma.kV.findUnique({ where: { key } });
    return NextResponse.json({ value: row ? row.value : null });
  } catch (e) {
    console.error('[api/kv][GET] failed:', e);
    return NextResponse.json({ error: 'db error', message: String(e) }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { key, value } = body || {};
  if (!key) {
    return NextResponse.json({ error: 'key is required' }, { status: 400 });
  }
  try {
    await prisma.kV.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/kv][POST] failed:', e);
    return NextResponse.json({ error: 'db error', message: String(e) }, { status: 500 });
  }
}
