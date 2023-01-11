import React, { useState } from 'react';
import { TodoInputProps } from '../../interfaces';
import { Input, ContentTextArea, Button } from './TodoInput.style';

function TodoInput({ onSubmitHandler, todoId, title, content }: TodoInputProps) {
	const [todoTitle, setTodoTitle] = useState<string>(title ?? '');
	const [todoContent, setTodoContent] = useState<string>(content ?? '');

	const onTodoTitleHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setTodoTitle(e.currentTarget.value);
	};

	const onTodoContentHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setTodoContent(e.currentTarget.value);
	};

	return (
		<form
			onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmitHandler(e, todoTitle, todoContent, todoId)}
			style={{ textAlign: 'center' }}
		>
			<Input type="text" value={todoTitle} onChange={onTodoTitleHandler} placeholder="Todo 제목" />
			<br />
			<ContentTextArea value={todoContent} onChange={(e) => onTodoContentHandler(e)} placeholder="내용" />
			<br />
			<Button type="submit">{todoId ? '수정하기' : '등록하기'}</Button>
		</form>
	);
}

export default TodoInput;
