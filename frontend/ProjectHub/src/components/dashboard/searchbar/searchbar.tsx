import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SearchInput from "./search-input";
import FilterSelect from "./filter-select";
import ViewToggle from "./view-toggle";
import { debounce } from "lodash";
import {
	PRIORITY_OPTIONS,
	SORT_OPTIONS,
	STATUS_OPTIONS,
} from "@/types/searchbar-type";

interface Filters {
	term: string;
	status: string;
	priority: string;
	sortBy: string;
	sortOrder?: "asc" | "desc";
}

interface SearchBarProps {
	filters: Filters;
	onSearch: (filters: Filters) => void;
	onViewChange: (view: "grid" | "list") => void;
}

const DEFAULT_DEBOUNCE_MS = 800;

const SearchBar = ({ filters, onSearch, onViewChange }: SearchBarProps) => {
	const [localTerm, setLocalTerm] = useState(filters.term ?? "");
	const [view, setView] = useState<"grid" | "list">(
		() => (localStorage.getItem("viewMode") as "grid" | "list") || "grid"
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const filtersRef = useRef(filters);

	useEffect(() => {
		filtersRef.current = filters;
	}, [filters]);

	const debouncedSearch = useMemo(
		() =>
			debounce((term: string) => {
				const latest = filtersRef.current;
				onSearch({ ...latest, term });
			}, DEFAULT_DEBOUNCE_MS),
		[onSearch]
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [filters.term]);

	const handleTermChange = useCallback(
		(term: string) => {
			setLocalTerm(term);
			debouncedSearch.cancel();
			debouncedSearch(term);
		},
		[debouncedSearch]
	);

	const handleFilterChange = useCallback(
		(key: keyof Filters, value: string) => {
			debouncedSearch.cancel();
			onSearch({ ...filtersRef.current, [key]: value });
		},
		[onSearch, debouncedSearch]
	);

	const handleSortChange = useCallback(
		(value: string) => {
			debouncedSearch.cancel();
			const [field, order] = value.split("|") as [string, "asc" | "desc"];
			onSearch({ ...filtersRef.current, sortBy: field, sortOrder: order });
		},
		[onSearch, debouncedSearch]
	);

	const handleViewChange = useCallback(
		(newView: "grid" | "list") => {
			setView(newView);
			localStorage.setItem("viewMode", newView);
			onViewChange(newView);
		},
		[onViewChange]
	);

	return (
		<div className='w-full flex flex-col sm:flex-row items-center gap-3 p-3 border rounded shadow-sm'>
			<SearchInput
				ref={inputRef}
				value={localTerm}
				onChange={handleTermChange}
				className='w-full sm:flex-1 sm:min-w-0'
			/>
			<FilterSelect
				value={filters.status}
				onChange={(v) => handleFilterChange("status", v)}
				className='w-full sm:flex-1 sm:min-w-0'
				options={STATUS_OPTIONS}
			/>
			<FilterSelect
				value={filters.priority}
				onChange={(v) => handleFilterChange("priority", v)}
				className='w-full sm:flex-1 sm:min-w-0'
				options={PRIORITY_OPTIONS}
			/>
			<FilterSelect
				value={`${filters.sortBy}|${filters.sortOrder ?? "desc"}`}
				onChange={handleSortChange}
				className='w-full sm:flex-1 sm:min-w-0'
				options={SORT_OPTIONS}
			/>
			<ViewToggle
				view={view}
				onChange={handleViewChange}
			/>
		</div>
	);
};

export default SearchBar;
