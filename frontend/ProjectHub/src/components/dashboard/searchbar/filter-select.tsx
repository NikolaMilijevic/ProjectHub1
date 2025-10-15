import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface FilterSelectProps {
	value: string;
	onChange: (value: string) => void;
	options: { label: string; value: string }[];
	className?: string;
}

const FilterSelect = ({
	value,
	onChange,
	options,
	className,
}: FilterSelectProps) => (
	<Select
		value={value}
		onValueChange={onChange}
	>
		<SelectTrigger className={`w-fit cursor-pointer ${className ?? ""}`}>
			<SelectValue placeholder={options[0].label} />
		</SelectTrigger>
		<SelectContent>
			{options.map(({ label, value: val }) => (
				<SelectItem
					key={val}
					value={val}
				>
					{label}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);

export default FilterSelect;
