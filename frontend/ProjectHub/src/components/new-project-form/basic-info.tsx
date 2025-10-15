import { basicInfoFields } from "@/types/status-progress-fields";
import FieldInput from "./field-input";

interface BasicInfoProps {
	disabled?: boolean;
}

const BasicInfo = ({ disabled }: BasicInfoProps) => {
	return (
		<div className='mb-3'>
			<div className='border-b-1 mb-5'>
				<p className='text-base font-bold'>Basic Information</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{basicInfoFields.slice(0, 2).map((field) => (
					<FieldInput
						key={field.name}
						{...field}
						disabled={disabled}
					/>
				))}
			</div>
			<div className='mt-2'>
				{basicInfoFields.slice(2).map((field) => (
					<FieldInput
						key={field.name}
						{...field}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
};

export default BasicInfo;
