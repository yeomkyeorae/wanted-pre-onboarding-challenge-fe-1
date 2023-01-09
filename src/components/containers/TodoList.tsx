import React, { useState, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteTodo } from '../../_actions/todo_action';
import { Todo } from '../interfaces';
import TodoUpdateModal from './TodoUpdateModal';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
`;

const Ul = styled.ul`
	padding: 0;
`;

const LiContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Li = styled.li`
	cursor: pointer;
	list-style: none;
	border: 2px solid gray;
	border-radius: 15px;
	box-shadow: 5px 10px 20px rgb(0, 0, 0, 0.2);
	width: 70%;
	padding: 5px;
	margin: 5px;
	:hover {
		background-color: #0be881;
	}
`;

const Button = styled.div`
	width: 30px;
	background-color: ${(props) => props.color};
	color: white;
	font-size: 13px;
	border-radius: 10px;
	box-shadow: 5px 10px 20px rgb(0, 0, 0, 0.2);
	margin: 0 2px;
	text-align: center;
	cursor: pointer;
`;

interface Props {
	todoList: { title: string; content: string; id: string; createdAt: string; updatedAt: string }[];
	setTodoList: Dispatch<SetStateAction<Todo[]>>;
	setSelectedTodo: Dispatch<SetStateAction<Todo>>;
}

function Todolist({ todoList, setTodoList, setSelectedTodo }: Props) {
	const [selectedTodoId, setSelectedTodoId] = useState<string>('');

	const dispatch = useDispatch<any>();
	const token = window.localStorage.getItem('token');

	const deleteHandler = (id: string) => {
		if (confirm('해당 todo를 삭제하시겠습니까?')) {
			try {
				dispatch(deleteTodo(token, id)).then(() => {
					alert('성공적으로 todo가 삭제되었습니다');
					setTodoList(todoList.filter((todo) => todo.id !== id));
				});
			} catch (err) {
				alert('todo 삭제가 실패했습니다');
			}
		}
	};

	const updateHandler = (id: string) => {
		setSelectedTodoId(id);
	};

	return (
		<Container>
			<Ul>
				{todoList?.map((el) => {
					return (
						<LiContainer key={el.id}>
							<Li onClick={() => setSelectedTodo(el)}>{el.title}</Li>
							<Button color={'#00d8d6'} onClick={() => updateHandler(el.id)}>
								수정
							</Button>
							<Button color={'#ff5e57'} onClick={() => deleteHandler(el.id)}>
								삭제
							</Button>
							{selectedTodoId !== '' ? (
								<TodoUpdateModal
									setOpenEnroll={setSelectedTodoId}
									setTodoList={setTodoList}
									todoList={todoList}
									id={selectedTodoId}
									token={token}
								/>
							) : null}
						</LiContainer>
					);
				})}
			</Ul>
		</Container>
	);
}

export default Todolist;
