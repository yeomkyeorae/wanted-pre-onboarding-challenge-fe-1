import axios from 'axios';
import { CREATE_TODO, GET_TODOS, DELETE_TODO, UPDATE_TODO } from './types';
import { Todo } from '../components/interfaces';

export function createTodo(
	body: { title: string; content: string },
	token: string
): {
	type: string;
	payload: Promise<{ data: Todo }>;
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

export function deleteTodo(token: string, id: string): { type: string; payload: Promise<{ data: null }> } {
	const headers = { Authorization: token };
	const data = axios.delete(`/todos/${id}`, { headers });

	return {
		type: DELETE_TODO,
		payload: data,
	};
}

export function updateTodo(
	token: string,
	id: string,
	body: { title: string; content: string }
): { type: string; payload: Promise<Todo> } {
	const headers = { Authorization: token };
	const data = axios.put(`/todos/${id}`, body, { headers }).then((response: any) => response.data);

	return {
		type: UPDATE_TODO,
		payload: data,
	};
}
