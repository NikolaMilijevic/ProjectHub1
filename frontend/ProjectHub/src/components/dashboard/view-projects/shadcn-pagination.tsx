import { useCallback, useEffect, useMemo, useState } from "react";
import {
	Pagination as PaginationNav,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const ShadcnPagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	const [maxVisible, setMaxVisible] = useState(7);

	const updateMaxVisible = useCallback(() => {
		const width = window.innerWidth;
		if (width < 480) setMaxVisible(3);
		else if (width < 769) setMaxVisible(5);
		else setMaxVisible(7);
	}, []);

	useEffect(() => {
		updateMaxVisible();
		window.addEventListener("resize", updateMaxVisible);
		return () => window.removeEventListener("resize", updateMaxVisible);
	}, [updateMaxVisible]);

	if (totalPages <= 1) return null;

	const pages = useMemo(() => {
		const half = Math.floor(maxVisible / 2);
		const list: (number | "...")[] = [];

		if (totalPages <= maxVisible) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		if (currentPage <= half + 1) {
			list.push(
				...Array.from({ length: maxVisible - 1 }, (_, i) => i + 1),
				"...",
				totalPages
			);
		} else if (currentPage >= totalPages - half) {
			list.push(1, "...");
			list.push(
				...Array.from(
					{ length: maxVisible - 2 },
					(_, i) => totalPages - (maxVisible - 3) + i
				)
			);
		} else {
			list.push(1, "...");
			list.push(
				...[currentPage - 1, currentPage, currentPage + 1],
				"...",
				totalPages
			);
		}

		return list;
	}, [currentPage, totalPages, maxVisible]);

	const handleNavigate = (page: number) => (e: React.MouseEvent) => {
		e.preventDefault();
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	};

	const isFirst = currentPage === 1;
	const isLast = currentPage === totalPages;

	return (
		<PaginationNav className='my-4'>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						aria-disabled={isFirst}
						onClick={handleNavigate(currentPage - 1)}
						className={
							isFirst
								? "text-white bg-violet-700/20 hover:text-white hover:bg-violet-700/20"
								: "text-white bg-violet-700 hover:text-white hover:bg-violet-500"
						}
					/>
				</PaginationItem>

				{pages.map((page, idx) =>
					page === "..." ? (
						<PaginationItem key={`elipsis-${idx}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={page}>
							<PaginationLink
								href='#'
								isActive={page === currentPage}
								onClick={handleNavigate(page)}
								className={
									page === currentPage
										? "text-white bg-violet-400 hover:bg-violet-300 hover:text-white"
										: "bg-white text-gray-700 hover:bg-violet-100"
								}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					)
				)}

				<PaginationItem>
					<PaginationNext
						href='#'
						aria-disabled={isLast}
						onClick={handleNavigate(currentPage + 1)}
						className={
							currentPage === totalPages
								? "text-white bg-violet-700/20 hover:text-white hover:bg-violet-700/20"
								: "text-white bg-violet-700 hover:text-white hover:bg-violet-500"
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationNav>
	);
};

export default ShadcnPagination;
