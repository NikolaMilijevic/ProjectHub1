import { ErrorMessage, useFormikContext, useField } from "formik";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";

interface FieldInputProps {
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	options?: string[];
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}

const FieldInput = ({
	name,
	label,
	type = "text",
	placeholder,
	options,
	onKeyDown,
	disabled = false,
}: FieldInputProps) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(name);

	return (
		<div className='mb-5'>
			<Label
				htmlFor={name}
				className='mb-3 block'
			>
				{label}
			</Label>

			{type === "select" ? (
				<Select
					value={field.value}
					onValueChange={(val) => setFieldValue(name, val)}
					disabled={disabled}
				>
					<SelectTrigger
						id={name}
						className='w-full cursor-pointer'
					>
						<SelectValue placeholder={placeholder ?? "Select an option"} />
					</SelectTrigger>
					<SelectContent>
						{options?.map((option) => (
							<SelectItem
								key={option}
								value={option}
							>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : type === "textarea" ? (
				<Textarea
					id={name}
					{...field}
					placeholder={placeholder}
					disabled={disabled}
				/>
			) : (
				<Input
					id={name}
					type={type}
					{...field}
					placeholder={placeholder}
					onKeyDown={onKeyDown}
					disabled={disabled}
				/>
			)}

			<ErrorMessage
				name={name}
				component='div'
				className='text-red-500 text-sm mt-1'
			/>
		</div>
	);
};

export default FieldInput;
