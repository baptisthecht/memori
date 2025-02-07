import { FilterPopover } from "./filter-popover";
import { HelpPopover } from "./HelpPopover";

export function FilterAndHelper() {
	return (
		<div className="w-full flex justify-between">
			<FilterPopover />
			<HelpPopover />
		</div>
	);
}
