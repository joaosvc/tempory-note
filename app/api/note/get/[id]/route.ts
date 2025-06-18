import { NextResponse } from 'next/server';
import PrismaClient from "@/client/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    if (!id) {
        return NextResponse.json({ error: "ID ausente" }, { status: 400 });
    }

    const data = await PrismaClient.sharedContent.findUnique({
        where: { id }
    });

    if (!data) {
        return NextResponse.json({ error: "Conteúdo não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ content: data.content });
}
