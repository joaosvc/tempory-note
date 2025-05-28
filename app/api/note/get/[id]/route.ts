import { NextResponse } from 'next/server';
import { getText } from '@/lib/store';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const text = getText(params.id);

    if (!text) {
        return NextResponse.json({ error: 'Texto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ content: text });
}
