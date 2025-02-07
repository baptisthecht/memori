import { PrismaClient, Word } from "@prisma/client";

export async function GET() {
	const prisma = new PrismaClient();
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
	const prisma = new PrismaClient();
	return Response.json(
		await prisma.word.update({
			where: { id: data.id },
			data,
		})
	);
}
