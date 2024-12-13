import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import logo from "../assets/logo.jpg";
import Root from "../layouts/Root";

function LoginPage() {
	const navigate = useNavigate();
	const { user, loginUser } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formIsValid, setFormIsValid] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const emailRegex =
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?:gmail|mail|umail|bk|inbox)\.(?:ru|com|uz)$/;
		const emailIsValid = emailRegex.test(email);
		const passwordIsValid = password.trim().length > 0;
		setFormIsValid(emailIsValid && passwordIsValid);

		if (user) {
			navigate("/");
		}
	}, [user, email, password]);

	async function handleUserLogin() {
		if (!formIsValid) return
		await loginUser(email, password);
	}

	return (
		<Root>
			<div className="h-[100vh] flex items-center justify-center">
				<form className="bg-white p-[2.5rem] rounded-3xl">
					<div className="flex flex-col items-center justify-center gap-2 mb-10">
						<img className="w-12 h-12 rounded-lg" src={logo} alt="Logo" />
						<h3 className="text-2xl font-medium">Tizimga kirish</h3>
					</div>
					<div className="flex flex-col gap-4 mb-8">
						<div
							onClick={() => emailRef.current?.focus()}
							className="min-w-[400px] cursor-text relative pt-[1.45rem] px-[1.125rem] pb-[0.625rem] rounded-lg border border-[#e0e0e0] focus-within:border-[#b8b8b8] transition-colors"
						>
							<input
								ref={emailRef}
								className="w-full bg-transparent outline-none peer"
								value={email}
								onChange={e => setEmail(e.target.value)}
								type="email"
								name="email"
								id="email"
								placeholder=" "
							/>
							<label
								className="cursor-text absolute left-[1.125rem] top-1/2 -translate-y-1/2 text-[#666666] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#666666] peer-focus:top-[1rem] peer-focus:text-xs peer-focus:-translate-y-1/2"
								htmlFor="email"
								style={{
									top: email ? "1rem" : undefined,
									fontSize: email ? "0.75rem" : undefined,
								}}
							>
								E-mail manzil
							</label>
						</div>

						<div
							onClick={() => passwordRef.current?.focus()}
							className="min-w-[400px] cursor-text relative pt-[1.45rem] px-[1.125rem] pb-[0.625rem] rounded-lg border border-[#e0e0e0] focus-within:border-[#b8b8b8] transition-colors"
						>
							<input
								ref={passwordRef}
								className="w-full bg-transparent outline-none peer"
								value={password}
								onChange={e => setPassword(e.target.value)}
								type="password"
								name="password"
								id="password"
								placeholder=" "
							/>
							<label
								className="cursor-text absolute left-[1.125rem] top-1/2 -translate-y-1/2 text-[#666666] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#666666] peer-focus:top-[1rem] peer-focus:text-xs peer-focus:-translate-y-1/2"
								htmlFor="password"
								style={{
									top: password ? "1rem" : undefined,
									fontSize: password ? "0.75rem" : undefined,
								}}
							>
								Parol
							</label>
						</div>
					</div>

					<button
						disabled={!formIsValid}
						className="disabled:cursor-not-allowed active:scale-95 transition disabled:active:scale-100 rounded-xl py-[1rem] px-[2rem] font-medium text-[1.125rem] text-center w-full bg-[#3d3bff] text-white disabled:bg-[#ebebeb] disabled:text-[#b8b8b8]"
						onClick={handleUserLogin}
						type="button"
					>
						Kirish
					</button>
				</form>
			</div>
		</Root>
	);
}

export default LoginPage;
