import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";
import Root from "./Root";

function RootLayout() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			toast.error("Avval tizimga kirish talab etiladi");
			navigate("/login", { state: { from: window.location.pathname } }); // Save the original path
		}
	}, [user, navigate]);

	return (
		<Root>
			<Outlet />
		</Root>
	);
}

export default RootLayout;
