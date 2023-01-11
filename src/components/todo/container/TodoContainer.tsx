import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HistoryProps, Todo } from '../../interfaces';
import { createTodo, getTodos } from '../../../_actions/todo_action';
import Todolist from '../list/TodoList';
import TodoInput from '../input/TodoInput';
import TodoDetail from '../detail/TodoDetail';
import { Logout, Container, SubContainer, Button } from './TodoContainer.style';

function Todo({ history }: HistoryProps) {
	const [openAddInput, setOpenAddInput] = useState(false);
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

	const dispatch = useDispatch<any>();
	const token = window.localStorage.getItem('token');

	useEffect(() => {
		dispatch(getTodos(token)).then((response: any) => {
			setTodoList(response.payload.data);
		});
	}, []);

	const logoutHandler = () => {
		if (confirm('로그아웃 하시겠습니까?')) {
			window.localStorage.removeItem('token');
			history.push({ pathname: '/' });
		}
	};

	const addBtnListener = () => {
		if (openAddInput === false) {
			setOpenAddInput(true);
		} else {
			setOpenAddInput(false);
		}
	};

	const onCreateSubmitHandler = (e: React.FormEvent<HTMLFormElement>, todoTitle: string, todoContent: string) => {
		e.preventDefault();

		setOpenAddInput(false);

		const body = {
			title: todoTitle,
			content: todoContent,
		};

		dispatch(createTodo(body, token)).then((response: any) => {
			setTodoList(todoList.concat(response.payload.data));
			alert('성공적으로 todo 목록이 추가되었습니다');
		});
	};

	return (
		<>
			<Logout onClick={logoutHandler}>로그아웃</Logout>
			<Container>
				<SubContainer>
					<h1>목록</h1>
					<Button onClick={addBtnListener} style={{ width: '20%', marginBottom: '5px' }}>
						추가
					</Button>
					{openAddInput ? <TodoInput onSubmitHandler={onCreateSubmitHandler} /> : null}
					<br />
					<Todolist todoList={todoList} setTodoList={setTodoList} setSelectedTodo={setSelectedTodo} />
				</SubContainer>
				<SubContainer>
					<h1>상세</h1>
					<TodoDetail todo={selectedTodo} />
				</SubContainer>
			</Container>
		</>
	);
}

export default withRouter(Todo);
