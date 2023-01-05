import axios from 'axios';
import { CREATE_TODO, GET_TODOS } from './types';

export function createTodo(
	body: { title: string; content: string },
	token: string
): {
	type: string;
	payload: Promise<{ data: { title: string; content: string; id: string; createdAt: string; updatedAt: string } }>;
} {
	const headers = { Authorization: token };
	const data = axios.post('/todos', body, { headers }).then((response: any) => response.data);

	return {
		type: CREATE_TODO,
		payload: data,
	};
}

export function getTodos(token: string): {
	type: string;
	payload: Promise<{ data: { title: string; content: string; id: string; createdAt: string; updatedAt: string }[] }>;
} {
	const headers = { Authorization: token };
	const data = axios.get('/todos', { headers }).then((response: any) => response.data);

	return {
		type: GET_TODOS,
		payload: data,
	};
}
