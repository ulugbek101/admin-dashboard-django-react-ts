import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { buildProfileImagePath } from "../../utils/helpers";

function Navbar() {
	const { user, logoutUser } = useContext(AuthContext);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	// Toggles dropdown visibility
	const handleProfileClick = () => {
		setDropdownVisible(prev => !prev);
	};

	// Handles clicks outside of the dropdown
	const handleOutsideClick = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setDropdownVisible(false);
		}
	};

	useEffect(() => {
		if (dropdownVisible) {
			document.addEventListener("mousedown", handleOutsideClick);
		} else {
			document.removeEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [dropdownVisible]);

	return (
		<nav className="flex items-center justify-between w-full py-7">
			<Link to="/" className="text-2xl font-medium">
				LOGO
			</Link>
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<NavLink
						to="/subjects"
						className={({ isActive }) =>
							`${
								isActive ? "bg-[#ebebeb]" : null
							} transition hover:bg-[#ebebeb] rounded-2xl px-4 py-1`
						}
					>
						Fanlar
					</NavLink>
					<NavLink
						to="/teachers"
						className={({ isActive }) =>
							`${
								isActive ? "bg-[#ebebeb]" : null
							} transition hover:bg-[#ebebeb] rounded-2xl px-4 py-1`
						}
					>
						Ustozlar
					</NavLink>
					<NavLink
						to="/groups"
						className={({ isActive }) =>
							`${
								isActive ? "bg-[#ebebeb]" : null
							} transition hover:bg-[#ebebeb] rounded-2xl px-4 py-1`
						}
					>
						Guruhlar
					</NavLink>
				</div>
				<div className="relative">
					<img
						className="w-[38px] h-[38px] rounded-full cursor-pointer"
						src={buildProfileImagePath(user?.profile_photo)}
						alt="Profile"
						onClick={handleProfileClick}
					/>
					{dropdownVisible && (
						<div
							ref={dropdownRef}
							className="absolute right-0 top-0 w-[20rem] py-[1.5rem] px-[1rem] transition bg-white border border-gray-200 rounded-2xl shadow-lg"
						>
							<div className="flex items-start justify-between gap-2">
								<div className="flex flex-col gap-1">
									<h2 className="text-lg font-bold">{user?.full_name}</h2>
									<span className="text-[#666666] text-sm">{user?.email}</span>
								</div>
								<img
									onClick={() => setDropdownVisible(false)}
									className="w-10 h-10 rounded-full cursor-pointer"
									src={buildProfileImagePath(user?.profile_photo)}
									alt={user?.full_name}
								/>
							</div>
							<hr className="my-4" />
							<div className="flex flex-col gap-1">
								<NavLink
									to="/"
									className={({ isActive }) =>
										`${
											isActive ? "bg-[#f5f5f5]" : null
										} flex items-center w-full gap-2 px-2 py-2 transition hover:bg-[#f5f5f5] rounded-lg`
									}
								>
									<i className="text-xl material-icons">person</i>
									Shaxsiy kabinet
								</NavLink>
								<NavLink
									to="/analytics"
									className={({ isActive }) =>
										`${
											isActive ? "bg-[#f5f5f5]" : null
										} flex items-center w-full gap-2 px-2 py-2 transition hover:bg-[#f5f5f5] rounded-lg`
									}
								>
									<i className="text-xl material-icons">bar_chart</i>
									Analitika
								</NavLink>
								<NavLink
									to="/payments"
									className={({ isActive }) =>
										`${
											isActive ? "bg-[#f5f5f5]" : null
										} flex items-center w-full gap-2 px-2 py-2 transition hover:bg-[#f5f5f5] rounded-lg`
									}
								>
									<i className="text-xl material-icons">payments</i>
									To'lovlar
								</NavLink>
								<hr className="my-4" />
								<span
									onClick={logoutUser}
									className="cursor-pointer flex items-center w-full gap-2 px-2 py-2 transition hover:bg-[#f5f5f5] rounded-lg"
								>
									<i className="text-xl material-icons">logout</i>
									Chiqish
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
