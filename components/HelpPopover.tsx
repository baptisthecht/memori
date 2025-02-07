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
				<Button className="w-9 p-2">
					<LifeBuoy />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-auto bg-surface-secondary"
				side="right">
				<div className="grid gap-2">
					<p className="text-sm">
						<strong>FR</strong> {activeWord?.francais}
					</p>
					<p className="text-sm">
						<strong>HI</strong> {activeWord?.hiragana}
					</p>
					<p className="text-sm">
						<strong>RO</strong> {activeWord?.romaji}
					</p>
					<p className="text-sm">
						<strong>KA</strong> {activeWord?.kanji}
					</p>
				</div>
			</PopoverContent>
		</Popover>
	);
};
