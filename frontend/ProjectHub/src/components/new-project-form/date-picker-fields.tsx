"use client";

import * as React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { format, parseISO } from "date-fns";
import { Label } from "../ui/label";
import { CalendarIcon } from "lucide-react";

interface DatePickerFieldProps {
	name: string;
	label: string;
	placeholder?: string;
	disabled?: boolean;
}

export default function DatePickerField({
	name,
	label,
	placeholder,
	disabled = false,
}: DatePickerFieldProps) {
	const { setFieldValue, setFieldTouched } = useFormikContext();
	const [field] = useField(name);
	const [open, setOpen] = React.useState(false);

	const selectedDate = field.value ? parseISO(field.value) : undefined;

	return (
		<div className='mb-5'>
			<Label
				htmlFor={name}
				className='mb-3 block font-medium'
			>
				{label}
			</Label>

			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						className='w-full justify-start cursor-pointer'
						id={name}
						disabled={disabled}
					>
						<CalendarIcon className='w-5 h-5 text-gray-500' />
						{selectedDate
							? format(selectedDate, "PPP")
							: placeholder ?? `Select ${label.toLowerCase()}`}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					align='start'
				>
					<Calendar
						mode='single'
						selected={selectedDate}
						onSelect={(date) => {
							setFieldValue(name, date ? date.toISOString() : "");
							setFieldTouched(name, true, false);
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>

			<ErrorMessage
				name={name}
				component='div'
				className='text-red-500 text-sm mt-1'
			/>
		</div>
	);
}
