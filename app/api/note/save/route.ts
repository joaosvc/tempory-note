import { NextResponse } from 'next/server';
import { saveText } from '@/lib/store';

function generateId() {
    return Math.random().toString(36).substring(2, 8);
}

export async function POST(req: Request) {
    const { content } = await req.json();

    if (!content || typeof content !== 'string') {
        return NextResponse.json({ error: 'Conteúdo inválido.' }, { status: 400 });
    }

    const id = generateId();
    saveText(id, content);

    return NextResponse.json({ id });
}