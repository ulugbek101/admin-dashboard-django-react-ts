import { Props } from "../../utils/models";

function Root({ children }: Props) {
	return <div className="bg-[#ffffff]">{children}</div>;
}

export default Root;
