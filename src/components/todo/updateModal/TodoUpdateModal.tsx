import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Todo } from '../../interfaces';
import { updateTodo } from '../../../_actions/todo_action';
import TodoInput from '../input/TodoInput';

const Modal = styled.div`
	position: fixed;
	z-index: 990;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;

const Overlay = styled.div`
	position: absolute;
	z-index: 995;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.85);
`;

const ModalContent = styled.div`
	position: absolute;
	z-index: 999;
	top: 50%;
	left: 50%;
	display: flex;
	justify-content: center;
	transform: translate(-50%, -50%);
	max-height: 90%;
	overflow: auto;
	background: #fff;
	box-sizing: border-box;
	padding: 20px;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
	border-radius: 4px;
	width: 520px;
`;

const CloseBtn = styled.button`
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 18px;
	cursor: pointer;
	opacity: 0.5;
	background: none;
	border: none;
	transition: opacity 0.2s ease;
`;

interface Props {
	setOpenEnroll: Dispatch<SetStateAction<string>>;
	setTodoList: Dispatch<SetStateAction<Todo[]>>;
	todoList: Todo[];
	id: string;
	token: string;
}

function TodoUpdateModal({ setOpenEnroll, setTodoList, todoList, id, token }: Props) {
	const dispatch = useDispatch<any>();

	const todo = todoList.find((todo) => todo.id === id);
	const { title, content } = todo;

	const onUpdateSubmitHandler = (e: React.FormEvent<HTMLFormElement>, todoTitle: string, todoContent: string) => {
		e.preventDefault();

		const body = {
			title: todoTitle,
			content: todoContent,
		};

		dispatch(updateTodo(token, id, body)).then((response: any) => {
			setTodoList(
				todoList.map((todo) => {
					if (todo.id === id) {
						return response.payload.data;
					} else {
						return todo;
					}
				})
			);
			alert('성공적으로 todo 목록이 수정되었습니다');
			setOpenEnroll('');
		});
	};

	return (
		<Modal>
			<Overlay />
			<ModalContent>
				<CloseBtn title="close" onClick={() => setOpenEnroll('')}>
					<FontAwesomeIcon icon={faTimes} />
				</CloseBtn>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<TodoInput onSubmitHandler={onUpdateSubmitHandler} todoId={id} title={title} content={content} />
				</div>
			</ModalContent>
		</Modal>
	);
}

export default TodoUpdateModal;
