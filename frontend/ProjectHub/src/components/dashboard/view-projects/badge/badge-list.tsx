import { Badge } from "@/components/ui/badge";
import { getBadgeClass } from "./badge-utils";

interface BadgeListProps {
	status: string;
	priority: string;
}

const BadgeList = ({ status, priority }: BadgeListProps) => {
	const statusBadge = getBadgeClass("status", status);
	const priorityBadge = getBadgeClass("priority", priority);

	return (
		<div className='mt-3'>
			<Badge className={statusBadge.className}>{statusBadge.label}</Badge>
			<Badge className={priorityBadge.className}>{priorityBadge.label}</Badge>
		</div>
	);
};

export default BadgeList;
