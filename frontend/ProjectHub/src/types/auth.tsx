import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
	sub: string;
	id: string;
	name: string;
	role: string;
	exp: number;
}

export function getToken() {
	return localStorage.getItem("accessToken");
}

export function getCurrentUser() {
	const token = getToken();
	if (!token) return null;

	try {
		const decodedRaw: any = jwtDecode(token);

		const role =
			decodedRaw.role ||
			decodedRaw[
				"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
			] ||
			"User";

		return {
			email: decodedRaw.sub,
			id: decodedRaw.id,
			name: decodedRaw.name,
			role,
		};
	} catch {
		return null;
	}
}
