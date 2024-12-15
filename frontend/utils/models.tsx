import { ReactNode } from "react";

export interface User {
	token_type?: string; // e.g., "access"
	exp?: number; // Token expiration time (UNIX timestamp)
	iat?: number; // Token issued at (UNIX timestamp)
	jti?: string; // Unique identifier for the token
	id: number; // User ID
	is_superuser: boolean;
	is_staff: boolean;
	username: string;
	first_name: string;
	last_name: string;
	full_name: string;
	email: string;
	profile_photo: string;
}

export interface AuthTokens {
	access: string;
	refresh: string;
}

export interface AuthContextProps {
	user: User | null;
	authTokens: AuthTokens | null;
	loginUser: (email: string, password: string) => Promise<void>;
	updateUser: (user: User) => void;
	logoutUser: () => void;
	setUser: (user: User | null) => void;
	setAuthTokens: (tokens: AuthTokens | null) => void;
}

export interface AuthContextProviderProps {
	children: ReactNode;
}

export interface PrivateRouteProps {
	element: JSX.Element;
}

export interface Props {
	children: JSX.Element;
}
