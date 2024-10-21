// import { PrismaClient, Word } from '@prisma/client'

// export async function GET() {


//     const words: Word[] = [
//         {
            
//         }
//     ]

//     const prisma = new PrismaClient();
//     const result = await Promise.all(words.map(async w => {
//         const word = await prisma.word.create({
//             data: {
//                 categorie1: w.categorie1,
//                 categorie2: w.categorie2,
//                 francais: w.francais,
//                 hiragana: w.hiragana,
//                 romaji: w.romaji,
//                 kanji: w.kanji,
//                 affichages: w.affichages,
//                 bonnesReponses: w.bonnes_reponses,
//                 mauvaisesReponses: w.mauvaises_reponses,
//                 niveauLeitner: w.niveau_leitner,
//             },
//         });
//         const phrasesExemples = await prisma.phraseExemple.createMany({
//             data: w.phrases_exemples.map(phrase => ({
//                 ...phrase,
//                 wordId: word.id, // Add the wordId to each phrase
//             })),
//         });
//         return { word, phrasesExemples };
//     }));
//     return Response.json(result);    
// }
