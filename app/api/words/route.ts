import { prisma } from "@/lib/prisma";
import { Word } from "@prisma/client";

export async function GET() {
    return Response.json(
        await prisma.word.findMany({
            include: {
                phrasesExemples: true,
            },
        })
    );
}

export async function PATCH(request: Request) {
    const data: Word = await request.json();
    return Response.json(
        await prisma.word.update({
            where: { id: data.id },
            data,
        })
    );
}
