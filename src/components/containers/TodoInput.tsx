import React, { useState } from 'react';
import styled from 'styled-components';
import { TodoInputProps } from '../interfaces';

const inputStyles = `
	border: 1px solid black;
	border-radius: 15px;
	box-shadow: 5px 10px 20px rgb(0, 0, 0, 0.2);
	height: 20px;
	width: 300px;
	margin-bottom: 3px;
	text-align: center;
`;

const Input = styled.input`
	${inputStyles}
`;

const ContentTextArea = styled.textarea`
	${inputStyles}
	height: 150px;
`;

const Button = styled.button`
	width: 100px;
	background-color: #1e272e;
	color: white;
	border-radius: 15px;
	cursor: pointer;
`;

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
