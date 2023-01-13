import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Todo, TodoResponse } from '../../interfaces';
import { updateTodo } from '../../../_actions/todo_action';
import TodoInput from '../../common/input/TodoInput';
import CommonModal from '../../common/modal/CommonModal';

interface Props {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	setTodoList: Dispatch<SetStateAction<Todo[]>>;
	todoList: Todo[];
	id: string;
	token: string;
}

function TodoUpdateModal({ setIsOpenModal, setTodoList, todoList, id, token }: Props) {
	const dispatch = useDispatch<any>();

	const todo = todoList.find((todo) => todo.id === id);
	const { title, content } = todo;

	const onUpdateSubmitHandler = (e: React.FormEvent<HTMLFormElement>, todoTitle: string, todoContent: string) => {
		e.preventDefault();

		const body = {
			title: todoTitle,
			content: todoContent,
		};

		dispatch(updateTodo(token, id, body)).then((response: TodoResponse) => {
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
			setIsOpenModal(false);
		});
	};

	return (
		<CommonModal setIsOpenModal={setIsOpenModal}>
			<TodoInput onSubmitHandler={onUpdateSubmitHandler} todoId={id} title={title} content={content} />
		</CommonModal>
	);
}

export default TodoUpdateModal;
