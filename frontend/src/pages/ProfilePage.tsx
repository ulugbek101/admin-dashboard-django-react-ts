import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";
import useAxios from "../../hooks/useAxios";
import { buildProfileImagePath } from "../../utils/helpers";
import { User } from "../../utils/models";
import Back from "../components/Back";
import ContainerSmall from "../components/ContainerSmall";
import CustomInput from "../components/Input";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
	const { logoutUser, user, setUser } = useContext(AuthContext);
	const axiosInstance = useAxios();

	const [firstName, setFirstName] = useState(user?.first_name || "");
	const [lastName, setLastName] = useState(user?.last_name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const [userInfoFormIsLoading, setUserInfoFormIsLoading] = useState(false);
	const [userPasswordFormIsLoading, setUserPasswordIsLoading] = useState(false);

	const userInfoFormIsValid =
		firstName.trim().length > 0 &&
		lastName.trim().length > 0 &&
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?:gmail|mail|umail|bk|inbox)\.(?:ru|com|uz)$/.test(
			email
		);

	const userPasswordFormIsValid =
		password1.trim().length > 7 &&
		password2.trim().length > 7 &&
		password1 === password2;

	async function handleUserInformationChange() {
		setUserInfoFormIsLoading(true);
		try {
			const response = await axiosInstance.patch(
				`/api/v1/auth/users/${user?.id}/`,
				{
					first_name: firstName,
					last_name: lastName,
					email: email,
				}
			);
			const userData: User = response.data;
			setUser(userData);

			toast.success("Ma'lumotlar muvaffaqiyatli yangilandi!");
		} catch (error) {
			console.error(error);
			toast.error("Xatolik yuz berdi. Qayta urinib ko'ring.");
		} finally {
			setUserInfoFormIsLoading(false);
		}
	}

	async function handleUserPasswordChange() {
		if (
			password1 !== password2 ||
			password1.trim().length < 8 ||
			password2.trim().length < 8
		)
			return;
			
		setUserPasswordIsLoading(true);
		try {
			await axiosInstance.patch(
				`/api/v1/auth/users/${user?.id}/`,
				{
					password: password2,
				}
			);
			toast.success("Parol muvaffaqiyatli yangilandi!");
		} catch (error: unknown) {
			console.error(error);
			toast.error("Parolni yangilashda xatolik yuz berdi");
		} finally {
			setUserPasswordIsLoading(false);
		}
	}

	return (
		<ContainerSmall>
			<div className="pb-20">
				<Navbar />
				<Back />
				<div className="flex flex-col gap-4">
					<ProfileCard>
						<div className="flex items-center gap-7">
							<img
								className="w-24"
								src={buildProfileImagePath(user?.profile_photo)}
								alt={user?.full_name || "User"}
							/>
							<div className="flex flex-col gap-4">
								<h1 className="font-bold text-[32px]">{user?.full_name}</h1>
								<p className="text-[#666666] text-lg">{user?.email}</p>
							</div>
						</div>
					</ProfileCard>

					<ProfileCard>
						<div className="flex items-start justify-between gap-7">
							<div className="flex items-center gap-4">
								<i className="text-xl text-white bg-[#0087ff] max-h-max px-2 py-1 rounded-full material-icons">
									person
								</i>
								<span className="text-2xl font-medium">
									Shaxsiy ma'lumotlar
								</span>
							</div>
							<div className="flex flex-col gap-4">
								<CustomInput
									id="first_name"
									name="first_name"
									label="Ism"
									value={firstName}
									onChange={e => setFirstName(e.target.value)}
									className="bg-white"
								/>
								<CustomInput
									id="last_name"
									name="last_name"
									label="Familiya"
									value={lastName}
									onChange={e => setLastName(e.target.value)}
									className="bg-white"
								/>
								<CustomInput
									id="email"
									name="email"
									label="E-mail manzil"
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									className="bg-white"
								/>
								<button
									disabled={!userInfoFormIsValid || userInfoFormIsLoading}
									onClick={handleUserInformationChange}
									className="disabled:cursor-not-allowed transition rounded-xl py-[0.8rem] px-[2rem] font-medium text-[1.125rem] text-center w-full bg-[#3d3bff] text-white disabled:bg-[#ebebeb] disabled:text-[#b8b8b8]"
								>
									{userInfoFormIsLoading ? "Yuklanmoqda..." : "Saqlash"}
								</button>
							</div>
						</div>
					</ProfileCard>

					<ProfileCard>
						<div className="flex items-start justify-between gap-7">
							<div className="flex items-center gap-4">
								<i className="text-xl text-white bg-[#0087ff] max-h-max px-2 py-1 rounded-full material-icons">
									lock
								</i>
								<span className="text-2xl font-medium">Parol</span>
							</div>
							<div className="flex flex-col gap-4">
								<CustomInput
									id="password1"
									name="password1"
									label="Parol"
									type="password"
									value={password1}
									onChange={e => setPassword1(e.target.value)}
									className="bg-white"
								/>
								<CustomInput
									id="password2"
									name="password2"
									label="Parolni takrorlang"
									type="password"
									value={password2}
									onChange={e => setPassword2(e.target.value)}
									className="bg-white"
								/>
								<button
									disabled={
										!userPasswordFormIsValid || userPasswordFormIsLoading
									}
									onClick={handleUserPasswordChange}
									className="disabled:cursor-not-allowed transition rounded-xl py-[0.8rem] px-[2rem] font-medium text-[1.125rem] text-center w-full bg-[#3d3bff] text-white disabled:bg-[#ebebeb] disabled:text-[#b8b8b8]"
								>
									{userPasswordFormIsLoading ? "Yuklanmoqda..." : "Saqlash"}
								</button>
							</div>
						</div>
					</ProfileCard>
				</div>
			</div>
		</ContainerSmall>
	);
}

export default ProfilePage;
