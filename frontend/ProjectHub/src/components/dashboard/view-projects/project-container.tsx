import ProjectList from "./project-list";
import SearchBar from "../searchbar/searchbar";
import Loading from "./loading";
import ErrorMessage from "./error-message";
import EmptyState from "./empty-state";
import ShadcnPagination from "./shadcn-pagination";

import { useProjectsPaged } from "@/api/querys/useCreateProject";
import { useCallback, useEffect, useState } from "react";
import {
	defaultProjectFilters,
	type ProjectFilters,
} from "../../../types/project-filters";
import { PRIORITY_MAP, STATUS_MAP } from "@/types/enums";

const ITEMS_PER_PAGE = 6;

const ProjectsContainer = () => {
	const [view, setView] = useState<"grid" | "list">(
		() => (localStorage.getItem("viewMode") as "grid" | "list") || "grid"
	);

	const [filters, setFilters] = useState<ProjectFilters>(defaultProjectFilters);
	const [debouncedFilters, setDebouncedFilters] = useState(
		defaultProjectFilters
	);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedFilters(filters);
			setCurrentPage(1);
		}, 400);
		return () => clearTimeout(handler);
	}, [filters]);

	const { data, isLoading, error } = useProjectsPaged({
		pageNumber: currentPage,
		pageSize: ITEMS_PER_PAGE,
		search: debouncedFilters.term,
		priority: PRIORITY_MAP[debouncedFilters.priority],
		initialStatus: STATUS_MAP[debouncedFilters.status],
		sortBy: debouncedFilters.sortBy || "createdAt",
		sortOrder: debouncedFilters.sortOrder || "desc",
	});

	const handleSearch = useCallback((updated: Partial<ProjectFilters>) => {
		setFilters((prev) => ({ ...prev, ...updated }));
	}, []);

	const handleViewChange = useCallback((newView: "grid" | "list") => {
		setView(newView);
		localStorage.setItem("viewMode", newView);
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [currentPage]);

	const projects = data?.items ?? [];

	if (isLoading) return <Loading />;
	if (error) return <ErrorMessage message={(error as Error).message} />;

	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex-1 pb-24'>
				<div className='w-full max-w-4xl mx-auto mt-4 px-4 flex flex-col items-center'>
					<SearchBar
						filters={filters}
						onSearch={handleSearch}
						onViewChange={handleViewChange}
					/>
					{/* <p className="text-gray-400 text-sm sm:text-base break-words text-center mt-2">
            Showing {data?.items.length} of {data?.totalItems} (Page {data?.pageNumber}/{data?.totalPages})
          </p> */}
				</div>

				{projects.length === 0 ? (
					<EmptyState />
				) : (
					<ProjectList
						projects={projects}
						view={view}
					/>
				)}
			</div>

			{(data?.totalCount ?? 0) > ITEMS_PER_PAGE && (
				<div className='fixed bottom-0 left-0 w-full bg-white py-4 shadow-md'>
					<ShadcnPagination
						currentPage={currentPage}
						totalPages={Math.ceil((data?.totalCount ?? 0) / ITEMS_PER_PAGE)}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
};

export default ProjectsContainer;
