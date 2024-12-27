import { isAxiosError } from "axios";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import CustomInput from "../components/Input";

// Define the type for the prop
interface NewSubjectModalProps {
	fetchSubjects: () => void;
	handleClickOutsideWhileSubjectAdd: (
		event: React.MouseEvent<HTMLDivElement>
	) => void;
	closeAddSubjectModal: () => void;
}

// Forward the ref from parent to this component
const NewSubjectModal = forwardRef<HTMLDivElement, NewSubjectModalProps>(
	(
		{ fetchSubjects, handleClickOutsideWhileSubjectAdd, closeAddSubjectModal },
		ref
	) => {
		const [newSubjectName, setNewSubjectName] = useState<string>("");
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const axiosInstance = useAxios();


		async function handleNewSubject() {
			setIsLoading(true);
			const formData = { name: newSubjectName };
			try {
				await axiosInstance.post("/api/v1/subjects/", formData);
				toast.success("Fan muvaffaqiyatli qo'shildi")
				fetchSubjects();
				closeAddSubjectModal();
				setNewSubjectName("");
			} catch (error: unknown) {
				if (isAxiosError(error)) {
					if (error.response?.status === 400) {
						toast.error("Bunday nomga ega fan allaqachon mavjud");
					} else {
						toast.error(
							"Noma'lum xatolik yuz berdi, xatolik: " + error.message
						);
					}
				} else if (error instanceof Error) {
					toast.error("Noma'lum xatolik yuz berdi");
				} else {
					toast.error("Unknown error occurred");
				}
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		return (
			<div
				ref={ref} // This passes the forwarded ref to the div element
				onClick={handleClickOutsideWhileSubjectAdd}
				className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
			>
				<div className="p-6 bg-white shadow-lg rounded-xl">
					<div className="flex items-center justify-end">
						<span
							onClick={() => {
								closeAddSubjectModal();
								setNewSubjectName("");
							}}
							className="select-none cursor-pointer hover:bg-[#f5f5f5] transition px-1 py-1 rounded-full active:scale-90 material-icons"
						>
							close
						</span>
					</div>
					<hr className="mt-2 mb-5" />
					<div className="flex flex-col gap-2">
						<CustomInput
							name="name"
							label="Fan nomi"
							id="subject"
							autoFocus={true}
							value={newSubjectName}
							onChange={e => setNewSubjectName(e.target.value)}
						/>
						<button
							disabled={newSubjectName.trim().length < 1 || isLoading}
							className="select-none disabled:cursor-not-allowed transition rounded-xl py-[1rem] px-[2rem] font-medium text-[1.125rem] text-center w-full bg-[#3d3bff] text-white disabled:bg-[#ebebeb] disabled:text-[#b8b8b8]"
							onClick={handleNewSubject}
							type="button"
						>
							{isLoading ? (
								<div role="status" className="flex justify-center">
									<svg
										aria-hidden="true"
										className="text-gray-200 w-7 h-7 animate-spin dark:text-gray-600 fill-white"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="#f0f0f0"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="white"
										/>
									</svg>
									<span className="sr-only">Loading...</span>
								</div>
							) : (
								"Qo'shish"
							)}
						</button>
					</div>
				</div>
			</div>
		);
	}
);

NewSubjectModal.displayName = "NewSubjectModal"; // Add a display name for the forwarded ref

export default NewSubjectModal;
