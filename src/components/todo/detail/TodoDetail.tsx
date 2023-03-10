import React from 'react';
import { Todo } from '../../interfaces';

function TodoDetail({ todo }: { todo: Todo | boolean }) {
	if (typeof todo === 'boolean') {
		return <></>;
	} else {
		return (
			<div>
				<h1>{todo.title}</h1>
				<div>
					<span>{new Date(todo.createdAt).toLocaleString()}</span>
					<article>{todo.content}</article>
				</div>
			</div>
		);
	}
}

export default TodoDetail;
