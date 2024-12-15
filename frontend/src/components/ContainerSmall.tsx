import { Props } from "../../utils/models";

function ContainerSmall({ children }: Props) {
	return <div className="max-w-[1168px] m-auto">{children}</div>;
}

export default ContainerSmall;
