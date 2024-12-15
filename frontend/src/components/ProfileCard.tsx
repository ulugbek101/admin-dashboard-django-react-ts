import { Props } from "../../utils/models";

function ProfileCard({ children }: Props) {
	return <div className="bg-[#f5f5f5] rounded-2xl p-[2.5rem]">{children}</div>;
}

export default ProfileCard;
