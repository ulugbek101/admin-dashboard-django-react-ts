import { useEffect, useRef, useState } from "react";
import { Subject } from "../../utils/models";
import ChangeSubjectModal from "./ChangeSubjectModal";

interface ModalPosition {
	top: number;
	left: number;
}

function SubjectDetail({
	subject,
	index,
}: {
	subject: Subject;
	index: number;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
		null
	);
	const [activeButton, setActiveButton] = useState<HTMLSpanElement | null>(
		null
	);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const toggleModal = (event: React.MouseEvent<HTMLSpanElement>) => {
		const button = event.currentTarget;

		// If clicking the same button, close the modal
		if (activeButton === button) {
			setIsModalOpen(false);
			setActiveButton(null);
		} else {
			// Calculate modal position relative to viewport
			const rect = button.getBoundingClientRect();
			setModalPosition({
				top: rect.bottom + 8, // Slight spacing below the button
				left: rect.left - 100, // Adjust horizontally if needed
			});
			setActiveButton(button);
			setIsModalOpen(true);
		}
	};

	// Close modal on click outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				activeButton !== event.target
			) {
				setIsModalOpen(false);
				setActiveButton(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [activeButton]);

	return (
		<div key={index} className="flex items-center justify-between ">
			<span className="w-1/3 py-2 text-start">{index + 1}</span>
			<span className="w-1/3 py-2 text-center">{subject.name}</span>
			<span className="w-1/3 py-2 text-end">
				<span
					onClick={toggleModal}
					className="select-none text-2xl hover:bg-[#f5f5f5] rounded-full px-1 active:scale-90 transition cursor-pointer material-icons"
				>
					more_vert
				</span>
				{isModalOpen && modalPosition && (
					<ChangeSubjectModal modalPosition={modalPosition} ref={modalRef} />
				)}
			</span>
		</div>
	);
}

export default SubjectDetail;
