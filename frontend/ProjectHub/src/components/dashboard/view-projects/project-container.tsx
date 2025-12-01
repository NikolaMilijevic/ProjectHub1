import ProjectList from "./project-list";
import SearchBar from "../searchbar/searchbar";
import Loading from "./loading";
import ErrorMessage from "./error-message";
import EmptyState from "./empty-state";
import ShadcnPagination from "./shadcn-pagination";

import { useProjectsPaged } from "@/api/querys/useCreateProject";
import { useEffect, useRef, useState, useCallback } from "react";
import { defaultProjectFilters, type ProjectFilters } from "@/types/project-filters";
import { PRIORITY_MAP, STATUS_MAP } from "@/types/enums";
import { motion } from "framer-motion";
import { useNavigate, useSearch } from "@tanstack/react-router";

const ITEMS_PER_PAGE = 6;

// Floating particles
const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 4,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 15 + 15,
  delay: Math.random() * 10,
}));

const ProjectsContainer = () => {
  const search = useSearch({ from: "/dashboard" });
  const navigate = useNavigate();

  // View mode
  const [view, setView] = useState<"grid" | "list">(
    () => (localStorage.getItem("viewMode") as "grid" | "list") || "grid"
  );

  const currentPage = (search.page as number) ?? 1;

  // Cursor for particles
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filters are derived directly from URL
  const filters: ProjectFilters = {
    ...defaultProjectFilters,
    term: (search.term as string) || defaultProjectFilters.term,
    priority: (search.priority as keyof typeof PRIORITY_MAP) || defaultProjectFilters.priority,
    status: (search.status as keyof typeof STATUS_MAP) || defaultProjectFilters.status,
    sortBy: (search.sortBy as string) || defaultProjectFilters.sortBy,
    sortOrder:
      search.sortOrder === "asc" || search.sortOrder === "desc"
        ? (search.sortOrder as "asc" | "desc")
        : defaultProjectFilters.sortOrder,
  };

  // Debounced filters for API
  const [debouncedFilters, setDebouncedFilters] = useState<ProjectFilters>(filters);
  const prevFiltersRef = useRef<ProjectFilters>(filters);

  // Update debounced filters whenever URL changes
  useEffect(() => {
    const changed = JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);
    if (changed) {
      const timer = setTimeout(() => {
        setDebouncedFilters(filters);
        prevFiltersRef.current = filters;
      }, 300);
      return () => clearTimeout(timer);
    }
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

  // Update URL filters when user searches or changes sorting
  const handleSearch = useCallback(
    (updated: Partial<ProjectFilters>) => {
      navigate({
        search: {
          ...search,
          ...updated,
          page: 1, // reset page on filter change
        },
      });
    },
    [navigate, search]
  );

  const handleViewChange = useCallback((newView: "grid" | "list") => {
    setView(newView);
    localStorage.setItem("viewMode", newView);
  }, []);

  // Scroll to top when page changes
  useEffect(() => window.scrollTo({ top: 0 }), [currentPage]);

  const projects = data?.items ?? [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="min-h-screen relative bg-[var(--background)] text-[var(--foreground)] transition-colors overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] rounded-3xl
            bg-gradient-to-br from-purple-400/10 via-purple-200/5 to-transparent
            blur-4xl pointer-events-none dark:from-purple-800/10 dark:via-transparent"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/2 translate-x-1/2 w-[120%] h-[120%] rounded-3xl
            bg-gradient-to-tl from-pink-400/10 via-pink-200/5 to-transparent
            blur-4xl pointer-events-none dark:from-pink-900/10 dark:via-transparent"
        />
        {PARTICLES.map((p) => {
          const offsetX = (cursor.x / window.innerWidth - 0.5) * 20;
          const offsetY = (cursor.y / window.innerHeight - 0.5) * 20;
          return (
            <motion.div
              key={p.id}
              animate={{
                y: [0 + offsetY, -15 + offsetY, 0 + offsetY],
                x: [0 + offsetX, 10 + offsetX, 0 + offsetX],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                repeatType: "loop",
                delay: p.delay,
                ease: "easeInOut",
              }}
              style={{ width: p.size, height: p.size, top: `${p.y}%`, left: `${p.x}%` }}
              className="absolute rounded-full bg-gray-500/30 dark:bg-white/10 pointer-events-none"
            />
          );
        })}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col flex-1 px-4 py-6 max-w-6xl mx-auto bg-[var(--background)]/60 dark:bg-neutral-900/50 border border-[var(--border)] backdrop-blur-lg rounded-2xl shadow-xl mt-5"
      >
        <div className="flex flex-col items-center w-full mb-6">
          <SearchBar filters={filters} onSearch={handleSearch} onViewChange={handleViewChange} />
        </div>

        {projects.length === 0 ? <EmptyState /> : <ProjectList projects={projects} view={view} />}

        {(data?.totalCount ?? 0) > ITEMS_PER_PAGE && (
          <div className="mt-6 w-full flex justify-center">
            <ShadcnPagination
              currentPage={currentPage}
              totalPages={Math.ceil((data?.totalCount ?? 0) / ITEMS_PER_PAGE)}
              onPageChange={(page) => navigate({ search: { ...search, page } })}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectsContainer;
