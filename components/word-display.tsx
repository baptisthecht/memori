import { useData } from "@/contexts/Data";
import { Skeleton } from "./ui/skeleton";

export function WordDisplay() {
	const { activeWord, activeLanguage, loading } = useData();
	const phrasesLength = activeWord?.phrasesExemples?.length;
	let randomPhrase;
	if(phrasesLength) randomPhrase = activeWord?.phrasesExemples?.[Math.floor(Math.random() * phrasesLength)];
	return (
		<div className="flex flex-col gap-2 items-center justify-center flex-1">
			{loading ? (
				<>
					<Skeleton className="w-40 h-8" />
					<Skeleton className="w-20 h-4" />
				</>
			) : (
				<>
					<h1 className="text-4xl font-bold">
						{activeWord?.[activeLanguage]}
					</h1>
					{
						randomPhrase &&
							<h3 className="text-xs select-none">
								{randomPhrase?.[activeLanguage]}
							</h3>
					}
				</>
			)}
		</div>
	);
}
