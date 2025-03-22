"use client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useData } from "@/contexts/Data";
import { LifeBuoy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const HelpPopover = () => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const { activeWord } = useData();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Control") {
				setIsPopoverOpen(true);
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.key === "Control") {
				setIsPopoverOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger asChild>
				<Button 
					size="icon"
					className="w-9 h-9 p-2 rounded-[6px] bg-surface-secondary hover:bg-surface-secondary-hover">
					<LifeBuoy />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side="right"
				align="start"
				alignOffset={-16}
				sideOffset={24}
				className="w-auto p-4 bg-[#1e2130] text-white border-gray-700 rounded-2xl transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
				<div className="flex flex-col gap-2">
					<p className="text-sm">
						<span className="font-bold">Français : </span>
						<span className="font-normal">{activeWord?.francais}</span>
					</p>
					<p className="text-sm">
						<span className="font-bold">Romaji : </span>
						<span className="font-normal">{activeWord?.romaji}</span>
					</p>
					<p className="text-sm">
						<span className="font-bold">Hiragana : </span>
						<span className="font-normal">{activeWord?.hiragana}</span>
					</p>
					<p className="text-sm">
						<span className="font-bold">Katakana : </span>
						<span className="font-normal">{activeWord?.katakana}</span>
					</p>
					<p className="text-sm">
						<span className="font-bold">Kanji : </span>
						<span className="font-normal">{activeWord?.kanji}</span>
					</p>
				</div>
			</PopoverContent>
		</Popover>
	);
};
