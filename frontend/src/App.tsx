import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Routes>
			{/* Wrapping HomePage with PrivateRoute */}
			<Route element={<RootLayout />}>
				<Route path="/profile" element={<ProfilePage />} />
			</Route>
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default App;
