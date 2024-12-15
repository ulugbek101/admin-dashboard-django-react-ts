import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { buildProfileImagePath } from "../../utils/helpers";
import Back from "../components/Back";
import ContainerSmall from "../components/ContainerSmall";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
	const { logoutUser, user } = useContext(AuthContext);

	return (
		<ContainerSmall>
			<>
				<Navbar />
				<Back />
				<ProfileCard>
					<div className="flex items-center gap-7">
						<img
							className="w-24"
							src={buildProfileImagePath(user?.profile_photo)}
							alt={user?.full_name}
						/>
						<div className="flex flex-col gap-4">
							<h1 className="font-bold text-[32px]">{user?.full_name}</h1>
							<p className="text-[#666666] text-lg">{user?.email}</p>
						</div>
					</div>
				</ProfileCard>
				<button onClick={logoutUser}>Logout</button>
			</>
		</ContainerSmall>
	);
}

export default ProfilePage;
