import React from "react";
import { Grid3x3, Menu } from "lucide-react";
import {
	Root as ToggleGroupRoot,
	Item as ToggleGroupItem,
} from "@/components/ui/toggle-group";

interface ViewToggleProps {
	view: "grid" | "list";
	onChange: (view: "grid" | "list") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => (
	<ToggleGroupRoot
		type='single'
		value={view}
		onValueChange={(value) => onChange(value === "list" ? "list" : "grid")}
		className='hidden sm:flex items-center border rounded cursor-pointer'
	>
		<ToggleGroupItem
			value='grid'
			className='p-2 hover:bg-gray-100 dark:hover:data-[state=off]:bg-neutral-600 data-[state=on]:bg-violet-300 data-[state=on]:text-white rounded cursor-pointer'
		>
			<Grid3x3 />
		</ToggleGroupItem>
		<ToggleGroupItem
			value='list'
			className='p-2 hover:bg-gray-100 dark:hover:data-[state=off]:bg-neutral-600 data-[state=on]:bg-violet-300 data-[state=on]:text-white rounded cursor-pointer'
		>
			<Menu />
		</ToggleGroupItem>
	</ToggleGroupRoot>
);

export default ViewToggle;
