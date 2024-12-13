import { RootProps } from "../../utils/models";

function Root({ children }: RootProps) {
	return <div className="bg-[#f5f5f5]">{children}</div>;
}

export default Root;
