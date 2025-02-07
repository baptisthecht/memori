import { useData } from "@/contexts/Data";
import { Button } from "./ui/button";

export function ActionButtons() {
	const { handleBadAnswer, handleGoodAnswer } = useData();
	return (
		<div className="flex gap-4 w-full">
			<Button
				variant="default"
				className="flex-1"
				onClick={handleBadAnswer}>
				Mauvaise réponse
			</Button>
			<Button
				className="flex-1"
				variant="secondary"
				onClick={handleGoodAnswer}>
				Bonne réponse
			</Button>
		</div>
	);
}
