import { baseURL } from "./constants";

export function buildProfileImagePath(path: string | undefined) {
    if (!path) return ""
	return path.includes("http") ? path : `${baseURL}${path}`;
}
