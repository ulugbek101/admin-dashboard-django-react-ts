import { MouseEvent, useEffect, useRef, useState } from "react";
import Back from "../components/Back";
import ContainerSmall from "../components/ContainerSmall";
import Navbar from "../components/Navbar";

function SubjectsPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [activeButton, setActiveButton] = useState<HTMLSpanElement | null>(
		null
	);
	const [modalPosition, setModalPosition] = useState<{
		top: number;
		left: number;
	}>({ top: 0, left: 0 });
	const scrollableDivRef = useRef<HTMLDivElement | null>(null); // Reference to scrollable div

	const subjects: string[] = [
		"Matematika",
		"Fizika",
		"Kimyo",
		"Ingliz tili",
		"Tarix",
		"Biologiya",
		"Geografiya",
		"Adabiyot",
		"Rus tili",
		"Nemis tili",
		"Fransuz tili",
		"Koreys tili",
		"Informatika",
		"Chizmachilik",
		"Iqtisodiyot",
		"Huquq",
		"Psixologiya",
		"Ekologiya",
		"Astronomiya",
		"Jismoniy tarbiya",
		"San'at",
		"Musiqa",
		"Texnologiya",
		"Mexanika",
		"Arxitektura",
		"Mikrobiologiya",
		"Falsafa",
		"Sotsiologiya",
		"Politologiya",
		"Antropologiya",
		"Lingvistika",
		"Kriminologiya",
		"Farmatsevtika",
		"Kimyo texnologiyasi",
		"Robototexnika",
		"Yadro fizika",
		"Tibbiyot",
		"Veterinariya",
		"Menejment",
		"Marketing",
		"Tarjimonlik",
		"Pedagogika",
		"Anatomiya",
		"Moliyaviy hisobot",
		"Statistika",
		"Matematik tahlil",
		"Grafika dizayni",
		"Jurnalistika",
		"Elektronika",
		"Fizika laboratoriyasi",
		"Kimyo laboratoriyasi",
	];

	const toggleModal = (event: MouseEvent<HTMLSpanElement>) => {
		const button = event.currentTarget;

		// If clicking the same button, close the modal
		if (activeButton === button) {
			setIsModalOpen(false);
			setActiveButton(null);
		} else {
			// Open modal and set position relative to the button
			const rect = button.getBoundingClientRect();
			setModalPosition({
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
			});
			setActiveButton(button);
			setIsModalOpen(true);
		}
	};

	// Handle clicking outside the modal to close it
	const handleClickOutside = (event: MouseEvent<Document>) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node) &&
			activeButton &&
			!activeButton.contains(event.target as Node)
		) {
			setIsModalOpen(false);
			setActiveButton(null);
		}
	};

	// Handle scroll event to close the modal
	const handleScroll = () => {
		if (isModalOpen) {
			setIsModalOpen(false);
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			document.addEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
			const scrollableDiv = scrollableDivRef.current;
			if (scrollableDiv) {
				scrollableDiv.addEventListener("scroll", handleScroll);
			}
		} else {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
			const scrollableDiv = scrollableDivRef.current;
			if (scrollableDiv) {
				scrollableDiv.removeEventListener("scroll", handleScroll);
			}
		}

		// Cleanup event listeners on component unmount
		return () => {
			const scrollableDiv = scrollableDivRef.current;
			if (scrollableDiv) {
				scrollableDiv.removeEventListener("scroll", handleScroll);
			}
		};
	}, [isModalOpen]);

	return (
		<ContainerSmall>
			<div className="pb-15">
				<Navbar />
				<div className="flex items-center justify-between">
					<Back />
					<button className="active:scale-95 transition rounded-xl py-[0.5rem] px-[1rem] font-medium text-[1rem] text-center max-w-max bg-[#3d3bff] text-white">
						Fan qo'shish
					</button>
				</div>
				<div className="w-full border-2 border-[#f5f5f5] rounded-2xl p-[1rem]">
					<div className="border-b-2 border-[#f5f5f5] w-full flex justify-between">
						<span className="w-1/3 pb-2 font-bold text-md text-start">№</span>
						<span className="w-1/3 pb-2 font-bold text-center text-md">
							Fan nomi
						</span>
						<div className="w-1/3 pb-2 text-lg font-bold text-start"></div>
					</div>
					<div
						ref={scrollableDivRef}
						className="max-h-[60vh] overflow-auto custom-scroll"
					>
						<div className="w-full">
							{subjects.map((subject, index) => (
								<div key={index} className="flex items-center justify-between">
									<span className="w-1/3 py-2 text-start">{index + 1}</span>
									<span className="w-1/3 py-2 text-center">{subject}</span>
									<span className="w-1/3 py-2 text-end">
										<span
											onClick={toggleModal}
											className="text-2xl hover:bg-[#f5f5f5] rounded-full px-1 active:scale-90 transition cursor-pointer material-icons"
										>
											more_vert
										</span>
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{isModalOpen && (
					<div
						ref={modalRef}
						className="absolute bg-white p-1 rounded shadow-lg border border-[#ddd]"
						style={{ top: modalPosition.top, left: modalPosition.left }}
					>
						<div className="active:scale-95 rounded text-yellow-600 font-medium flex items-center gap-2 cursor-pointer hover:bg-[#f5f5f5] transition px-1">
							<span className="text-lg material-icons">edit</span>
							O'zgartirish
						</div>
						<div className="active:scale-95 rounded text-red-500 font-medium flex items-center gap-2 cursor-pointer hover:bg-[#f5f5f5] transition px-1">
							<span className="text-lg material-icons">delete</span>
							O'chirish
						</div>
					</div>
				)}
			</div>
		</ContainerSmall>
	);
}

export default SubjectsPage;
