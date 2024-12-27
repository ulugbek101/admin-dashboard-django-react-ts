import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SubjectsPage from "./pages/SubjectsPage"

function App() {
	return (
		<Routes>
			{/* Wrapping HomePage with PrivateRoute */}
			<Route element={<RootLayout />}>
				<Route index={true} element={<ProfilePage />} />
				<Route path="/subjects" element={<SubjectsPage />} />
			</Route>
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default App;
