import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export function loginUser(body: { email: string; password: string }): {
	type: string;
	payload: Promise<{ message: string; token: string }>;
} {
	const data = axios.post('/users/login', body).then((response: any) => response.data);

	return {
		type: LOGIN_USER,
		payload: data,
	};
}

export function registerUser(body: { email: string; password: string }): {
	type: string;
	payload: Promise<{ success: boolean }>;
} {
	const data = axios.post('/users/create', body).then((response: any) => response.data);

	return {
		type: REGISTER_USER,
		payload: data,
	};
}
