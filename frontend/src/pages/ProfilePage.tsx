import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";
import { buildProfileImagePath } from "../../utils/helpers";
import Back from "../components/Back";
import ContainerSmall from "../components/ContainerSmall";
import CustomInput from "../components/Input";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
	const { logoutUser, user } = useContext(AuthContext);

	const [firstName, setFirstName] = useState(user!.first_name);
	const [lastName, setLastName] = useState(user!.last_name);
	const [email, setEmail] = useState(user!.email);
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const [userInfoFormIsLoading, setUserInfoFormIsLoading] = useState(false);
	const [userPasswordFormIsLoading, setUserPasswordIsLoading] = useState(false);
	const [userInfoFormIsValid, setUserInfoFormIsValid] = useState(false);
	const [userPasswordFormIsValid, setUserPasswordFormIsValid] = useState(false);

	useEffect(() => {
		// First name, Last name and Email validation to change update button's disabled state dynamically
		setUserInfoFormIsValid(
			firstName.trim().length > 0 &&
				lastName.trim().length > 0 &&
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?:gmail|mail|umail|bk|inbox)\.(?:ru|com|uz)$/.test(
					email
				)
		);
	}, [firstName, lastName, email]);

	useEffect(() => {
		setUserPasswordFormIsValid((password1.trim().length > 7 && password2.trim().length > 7) && password1 === password2)
	}, [password1, password2])

	async function handleUserInformationChange() {
		setUserInfoFormIsLoading(true);
		setTimeout(() => {
			toast.success("Ma'lumotlar muvaffaqiyatli yangilandi");
			setUserInfoFormIsLoading(false);
		}, 5000);
	}

	async function handleUserPasswordChange() {
		setUserPasswordIsLoading(true)
		setTimeout(() => {
			toast.success("Parol muvaffaqiyatli yangilandi");
			setUserPasswordIsLoading(false);
		}, 5000);
	}

	return (
		<ContainerSmall>
			<>
				<Navbar />
				<Back />
				<div className="flex flex-col gap-4">
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
									className="disabled:cursor-not-allowed transition rounded-xl py-[0.8rem] px-[2rem] font-medium text-[1.125rem] text-center w-full bg-[#3d3bff] text-white disabled:bg-[#ebebeb] disabled:text-[#b8b8b8]"
									onClick={handleUserInformationChange}
									type="button"
								>
									{userInfoFormIsLoading ? (
										<div role="status" className="flex justify-center">
											<svg
												aria-hidden="true"
												className="text-gray-200 w-7 h-7 animate-spin dark:text-gray-600 fill-white"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="#f0f0f0"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="white"
												/>
											</svg>
											<span className="sr-only">Loading...</span>
										</div>
									) : (
										"Saqlash"
									)}
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
								<span className="text-2xl font-medium">
									Parol
								</span>
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
									disabled={!userPasswordFormIsValid || userPasswordFormIsLoading}
									className="disabled:cursor-not-allowed transition rounded-xl py-[0.8rem] px-[2rem] font-medium text-[1.125rem] text-center w-full bg-[#3d3bff] text-white disabled:bg-[#ebebeb] disabled:text-[#b8b8b8]"
									onClick={handleUserPasswordChange}
									type="button"
								>
									{userPasswordFormIsLoading ? (
										<div role="status" className="flex justify-center">
											<svg
												aria-hidden="true"
												className="text-gray-200 w-7 h-7 animate-spin dark:text-gray-600 fill-white"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="#f0f0f0"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="white"
												/>
											</svg>
											<span className="sr-only">Loading...</span>
										</div>
									) : (
										"Saqlash"
									)}
								</button>
							</div>
						</div>
					</ProfileCard>
				</div>
				<button onClick={logoutUser}>Logout</button>
			</>
		</ContainerSmall>
	);
}

export default ProfilePage;
