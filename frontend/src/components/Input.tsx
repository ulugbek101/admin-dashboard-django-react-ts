import React, { MutableRefObject, forwardRef, useRef } from "react";

interface CustomInputProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string; // Optional, defaults to "text"
	name: string;
	id: string;
	label: string;
	className?: string; // Optional
	autoFocus?: boolean; // Optional
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
	(
		{
			value,
			onChange,
			type = "text",
			name,
			id,
			label,
			className = "",
            autoFocus = false,
			...rest
		},
		ref
	) => {
		// Fallback to a local ref if no ref is provided
		const localRef = useRef<HTMLInputElement>(null);
		const inputRef = (ref as MutableRefObject<HTMLInputElement>) || localRef;

		return (
			<div
				onClick={() => inputRef.current?.focus()}
				className={`min-w-[400px] cursor-text relative pt-[1.45rem] px-[1.125rem] pb-[0.625rem] rounded-lg border border-[#e0e0e0] focus-within:border-[#b8b8b8] transition-colors ${className}`}
			>
				<input
					ref={inputRef}
					className="w-full bg-transparent outline-none peer"
					value={value}
					onChange={onChange}
					type={type}
					name={name}
					id={id}
					placeholder=" "
                    autoFocus={autoFocus}
                    onSubmitCapture={() => console.log("Submitted")}
					{...rest}
				/>
				<label
					htmlFor={id}
					className="cursor-text absolute left-[1.125rem] top-1/2 -translate-y-1/2 text-[#666666] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#666666] peer-focus:top-[1rem] peer-focus:text-xs peer-focus:-translate-y-1/2"
					style={{
						top: value ? "1rem" : undefined,
						fontSize: value ? "0.75rem" : undefined,
					}}
				>
					{label}
				</label>
			</div>
		);
	}
);

export default CustomInput;
