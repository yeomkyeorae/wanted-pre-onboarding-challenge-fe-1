import axios from 'axios';
import { UserResponse } from '../components/interfaces';
import { LOGIN_USER, REGISTER_USER } from './types';

export async function loginUser(body: { email: string; password: string }): Promise<UserResponse> {
	const data = (await axios.post('/users/login', body)).data;

	return {
		type: LOGIN_USER,
		payload: data,
	};
}

export async function registerUser(body: { email: string; password: string }): Promise<UserResponse> {
	const data = (await axios.post('/users/create', body)).data;

	return {
		type: REGISTER_USER,
		payload: data,
	};
}
