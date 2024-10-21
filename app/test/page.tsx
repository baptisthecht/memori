import { PrismaClient } from "@prisma/client";

export default async function Test() {
    const prisma = new PrismaClient();
    const words = await prisma.word.findMany({
        include: {
            phrasesExemples: true,
        }
    });
    return <div className="flex flex-col gap-4">
        {words.map((word: any) => (
            <div key={word.id}>{word.francais}</div>
        ))}
    </div>
}