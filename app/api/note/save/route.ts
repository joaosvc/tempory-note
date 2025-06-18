import { NextResponse } from 'next/server';
import PrismaClient from "@/client/prisma";

function generateId() {
    return Math.random().toString(36).substring(2, 8);
}

export async function POST(req: Request) {
    const { content } = await req.json();

    if (!content || typeof content !== 'string') {
        return NextResponse.json({ error: 'Conteúdo inválido' }, { status: 400 });
    }

    let id: string = '';
    let exists = true;
    let attempts = 0;

    while (exists && attempts < 3) {
        id = generateId();
        const existing = await PrismaClient.sharedContent.findUnique({ where: { id } });
        exists = !!existing;
        attempts++;
    }

    if (exists) {
        return NextResponse.json({ error: 'Não foi possível gerar um ID único' }, { status: 500 });
    }

    try {
        await PrismaClient.sharedContent.create({
            data: { id, content }
        });

        return NextResponse.json({ id });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao salvar a nota' }, { status: 500 });
    }
}