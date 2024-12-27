import { useNavigate } from "react-router-dom";

function Back() {
	const navigate = useNavigate();

	return (
		<div
			className="flex items-center gap-3 my-10 select-none max-w-max group hover:cursor-pointer"
			onClick={() => navigate(-1)}
		>
			<span className="bg-[#f5f5f5] py-2 ps-3 pe-1 rounded-full group-hover:bg-black group-hover:text-white transition-colors text-center text-md material-icons">
				arrow_back_ios
			</span>
			<span className="hover:cursor-pointer">Orqaga</span>
		</div>
	);
}

export default Back;
