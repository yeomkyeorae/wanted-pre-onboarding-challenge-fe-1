import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HistoryProps } from './interfaces';
import { createTodo, getTodos } from '../../_actions/todo_action';
import Todolist from '../containers/TodoList';

const Logout = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	color: #c0392b;
	cursor: pointer;
`;

const Container = styled.div`
	display: flex;
	height: 80vh;
	justify-content: center;
	align-items: center;
`;

const SubContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 50%;
`;

function Todo({ history }: HistoryProps) {
	const [openAddInput, setOpenAddInput] = useState(false);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [newTodoContent, setNewTodoContent] = useState('');
	const [todoList, setTodoList] = useState<
		{ title: string; content: string; id: string; createdAt: string; updatedAt: string }[]
	>([]);

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
			setNewTodoTitle('');
			setNewTodoContent('');
		}
	};

	const onNewTodoTitleHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.currentTarget.value);
	};

	const onNewTodoContentHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setNewTodoContent(e.currentTarget.value);
	};

	const onCreateSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setOpenAddInput(false);

		const body = {
			title: newTodoTitle,
			content: newTodoContent,
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
					<button onClick={addBtnListener} style={{ width: '20%', marginBottom: '5px' }}>
						추가
					</button>
					{openAddInput ? (
						<>
							<form onSubmit={onCreateSubmitHandler} style={{ textAlign: 'center' }}>
								<input type="text" value={newTodoTitle} onChange={onNewTodoTitleHandler} placeholder="title" />
								<br />
								<input type="text" value={newTodoContent} onChange={onNewTodoContentHandler} placeholder="content" />
								<br />
								<button type="submit">등록</button>
							</form>
						</>
					) : null}
					<br />
					<Todolist todoList={todoList} />
				</SubContainer>
				<SubContainer>
					<h1>상세</h1>
				</SubContainer>
			</Container>
		</>
	);
}

export default withRouter(Todo);
