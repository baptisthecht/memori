import { prisma } from "@/lib/prisma";

export async function POST() {
    try {
        // Mettre à jour tous les mots pour réinitialiser les compteurs
        const result = await prisma.word.updateMany({
            data: {
                affichages: 0,
                bonnesReponses: 0,
                mauvaisesReponses: 0,
                niveauLeitner: 1
            }
        });

        return Response.json({ 
            success: true, 
            message: `${result.count} mots ont été réinitialisés avec succès` 
        });
    } catch (error) {
        console.error("Erreur lors de la réinitialisation des mots:", error);
        return Response.json({ 
            success: false, 
            message: "Une erreur est survenue lors de la réinitialisation des mots" 
        }, { status: 500 });
    }
} 