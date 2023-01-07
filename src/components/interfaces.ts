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
