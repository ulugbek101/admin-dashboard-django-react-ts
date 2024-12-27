import React, { ForwardedRef } from "react";

// Define the types for the modalPosition prop
interface ModalPosition {
	top: number;
	left: number;
}

// Forward ref to allow using it in the parent component
const ChangeSubjectModal = React.forwardRef(
	(
		{ modalPosition }: { modalPosition: ModalPosition }, // typing modalPosition prop
		ref: ForwardedRef<HTMLDivElement> // typing ref
	) => {
		return (
			<div
				ref={ref}
				className="fixed z-50 p-1 text-left bg-white rounded-md shadow-lg w-30"
				style={{
					top: modalPosition.top,
					left: modalPosition.left,
				}}
			>
				<div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-500 transition rounded cursor-pointer select-none active:scale-90 hover:bg-gray-100">
					<span className="material-icons">edit</span>
					Edit
				</div>
				<div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 transition rounded cursor-pointer select-none active:scale-90 hover:bg-gray-100">
					<span className="material-icons">delete</span>
					Delete
				</div>
			</div>
		);
	}
);

export default ChangeSubjectModal;
