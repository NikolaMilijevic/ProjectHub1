import { useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavigationButtonProps {
	buttonText?: string;
	buttonRoute?: string;
	className?: string;
	icon?: React.ReactNode;
}

const NavigationButton = ({
	buttonText = "Go back to dashboard",
	buttonRoute = "/dashboard",
	className,
	icon,
}: NavigationButtonProps) => {
	const router = useRouter();
	return (
		<Button
			variant={"secondary"}
			className={cn(
				"bg-white hover:bg-white p-2 text-sm cursor-pointer",
				className
			)}
			onClick={() => router.navigate({ to: buttonRoute, search: (prev: any) => prev })}
		>
			{icon ?? <ArrowLeft className='w-4 h-4 mr-1' />}
			{buttonText}
		</Button>
	);
};

export default NavigationButton;
