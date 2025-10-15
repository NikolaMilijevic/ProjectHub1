import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	({ value, onChange, className }, ref) => (
		<div
			className={`flex items-center border rounded px-2 py-1 ${
				className ?? ""
			}`}
		>
			<Search className='w-5 h-5 text-gray-500 mr-2 shrink-0' />
			<input
				ref={ref}
				type='text'
				placeholder='Search projects...'
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='flex-grow min-w-0 outline-none truncate'
			/>
		</div>
	)
);

export default SearchInput;
