import { words } from "@/public/data/data";

export async function GET() {
    return Response.json(words);
}
