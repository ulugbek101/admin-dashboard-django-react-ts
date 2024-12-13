import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Root from "./Root"

function RootLayout() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			// Navigate to login if user is not authenticated
			navigate("/login");
		}
	}, [user, navigate]); // Add user and navigate as dependencies

	return (
		<Root>
			<Outlet />
		</Root>
	);
}

export default RootLayout;
