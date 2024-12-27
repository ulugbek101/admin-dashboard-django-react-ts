import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { Subject } from "../../utils/models";
import Back from "../components/Back";
import ContainerSmall from "../components/ContainerSmall";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import NewSubjectModal from "../components/NewSubjectModal";
import SubjectDetail from "../components/SubjectDetail";

function SubjectsPage() {
	const [isSubjectsLoading, setIsSubjectsLoading] = useState<boolean>(false);
	const [subjects, setSubjects] = useState<Subject[]>([]);

	const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] =
		useState<boolean>(false);

	const scrollableDivRef = useRef<HTMLDivElement | null>(null);
	const axiosInstance = useAxios();
	const addSubjectModalRef = useRef<HTMLDivElement | null>(null);

	async function fetchSubjects() {
		setIsSubjectsLoading(true);
		try {
			const response = await axiosInstance.get("/api/v1/subjects/");
			setSubjects(response.data);
		} catch (error: unknown) {
			toast.error("Fanlarni olishda xatolik yuz berdi. " + error);
			console.log(error);
		} finally {
			setIsSubjectsLoading(false);
		}
	}

	function handleClickOutsideWhileSubjectAdd(
		event: React.MouseEvent<HTMLDivElement>
	) {
		if (
			addSubjectModalRef.current &&
			addSubjectModalRef.current == event.target
		) {
			setIsAddSubjectModalOpen(false);
		}
	}

	useEffect(() => {
		fetchSubjects();
	}, []);

	return (
		<ContainerSmall>
			<div className="pb-15">
				<Navbar />
				<div className="flex items-center justify-between">
					<Back />
					<button
						onClick={setIsAddSubjectModalOpen.bind(null, true)}
						className="select-none active:scale-95 transition rounded-xl py-[0.5rem] px-[1rem] font-medium text-[1rem] text-center max-w-max bg-[#3d3bff] text-white"
					>
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
							{isSubjectsLoading && <LoadingSpinner />}
							{subjects.map((subject, index) => (
								<SubjectDetail key={index} subject={subject} index={index} />
							))}
						</div>
					</div>
				</div>

				{isAddSubjectModalOpen && (
					<NewSubjectModal
						fetchSubjects={fetchSubjects}
						ref={addSubjectModalRef}
						handleClickOutsideWhileSubjectAdd={
							handleClickOutsideWhileSubjectAdd
						}
						closeAddSubjectModal={setIsAddSubjectModalOpen.bind(null, false)}
					/>
				)}
			</div>
		</ContainerSmall>
	);
}

export default SubjectsPage;
