import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HistoryProps, Todo } from '../interfaces';
import { createTodo, getTodos } from '../../_actions/todo_action';
import Todolist from '../containers/TodoList';

const Logout = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	color: #c0392b;
	padding: 10px;
	cursor: pointer;
	font-weight: 800;
`;

const Container = styled.div`
	display: flex;
	/* height: 80vh; */
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

const Button = styled.button`
	width: 100px;
	background-color: #1e272e;
	color: white;
	border-radius: 15px;
	cursor: pointer;
`;

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

function Todo({ history }: HistoryProps) {
	const [openAddInput, setOpenAddInput] = useState(false);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [newTodoContent, setNewTodoContent] = useState('');
	const [todoList, setTodoList] = useState<Todo[]>([]);

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

	const onNewTodoContentHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
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
					<Button onClick={addBtnListener} style={{ width: '20%', marginBottom: '5px' }}>
						추가
					</Button>
					{openAddInput ? (
						<>
							<form onSubmit={onCreateSubmitHandler} style={{ textAlign: 'center' }}>
								<Input type="text" value={newTodoTitle} onChange={onNewTodoTitleHandler} placeholder="Todo 제목" />
								<br />
								<ContentTextArea
									value={newTodoContent}
									onChange={(e) => onNewTodoContentHandler(e)}
									placeholder="내용"
								/>
								<br />
								<Button type="submit">등록</Button>
							</form>
						</>
					) : null}
					<br />
					<Todolist todoList={todoList} setTodoList={setTodoList} />
				</SubContainer>
				<SubContainer>
					<h1>상세</h1>
				</SubContainer>
			</Container>
		</>
	);
}

export default withRouter(Todo);
