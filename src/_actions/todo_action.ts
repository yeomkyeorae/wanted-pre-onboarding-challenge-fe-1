import axios from 'axios';
import { CREATE_TODO, GET_TODOS, DELETE_TODO, UPDATE_TODO } from './types';
import { Todo, TodoResponse, TodosResponse } from '../components/interfaces';

export async function createTodo(body: { title: string; content: string }, token: string): Promise<TodoResponse> {
	const headers = { Authorization: token };
	const data: { data: Todo } = (await axios.post('/todos', body, { headers })).data;

	return {
		type: CREATE_TODO,
		payload: data,
	};
}

export async function getTodos(token: string): Promise<TodosResponse> {
	const headers = { Authorization: token };
	const data: { data: Todo[] } = (await axios.get('/todos', { headers })).data;

	return {
		type: GET_TODOS,
		payload: data,
	};
}

export async function deleteTodo(token: string, id: string): Promise<{ type: string; payload: { data: null } }> {
	const headers = { Authorization: token };
	const data = (await axios.delete(`/todos/${id}`, { headers })).data;

	return {
		type: DELETE_TODO,
		payload: data,
	};
}

export async function updateTodo(
	token: string,
	id: string,
	body: { title: string; content: string }
): Promise<TodoResponse> {
	const headers = { Authorization: token };
	const data: { data: Todo } = (await axios.put(`/todos/${id}`, body, { headers })).data;

	return {
		type: UPDATE_TODO,
		payload: data,
	};
}
