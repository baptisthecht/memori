import { PrismaClient, Word } from '@prisma/client'

export async function GET() {
    const prisma = new PrismaClient();
    return Response.json(await prisma.word.findMany({
        include: {
            phrasesExemples: true,
        }
    }));    
}
