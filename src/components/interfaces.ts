import { RouteComponentProps } from 'react-router-dom';

export interface HistoryProps extends RouteComponentProps {
	history: RouteComponentProps['history'];
}

export interface Todo {
	title: string;
	content: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}

export interface TodoInputProps {
	onSubmitHandler: (
		e: React.FormEvent<HTMLFormElement>,
		todoTitle: string,
		todoContent: string,
		todoId?: string
	) => void;
	todoId?: string;
	title?: string;
	content?: string;
}

export interface TodoResponse {
	type: string;
	payload: {
		data: Todo;
	};
}

export interface TodosResponse {
	type: string;
	payload: {
		data: Todo[];
	};
}

export interface UserResponse {
	type: string;
	payload: {
		message: string;
		token: string;
	};
}
