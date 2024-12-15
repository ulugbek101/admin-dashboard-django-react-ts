import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { buildProfileImagePath } from "../../utils/helpers";

function Navbar() {
	const { user } = useContext(AuthContext);

	return (
		<nav className="flex items-center justify-between w-full py-7">
			<Link to="/" className="text-2xl font-medium">
				LOGO
			</Link>
			<img
				className="w-[38px] h-[38px] rounded-full"
				src={buildProfileImagePath(user?.profile_photo)}
				alt=""
			/>
		</nav>
	);
}

export default Navbar;
