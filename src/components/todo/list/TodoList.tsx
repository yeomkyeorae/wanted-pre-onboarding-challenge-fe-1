import React, { useState, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../../_actions/todo_action';
import { Todo } from '../../interfaces';
import TodoUpdateModal from '../updateModal/TodoUpdateModal';
import { Container, Ul, LiContainer, Li, Button } from './TodoList.style';

interface Props {
	todoList: { title: string; content: string; id: string; createdAt: string; updatedAt: string }[];
	setTodoList: Dispatch<SetStateAction<Todo[]>>;
	setSelectedTodo: Dispatch<SetStateAction<Todo>>;
}

function Todolist({ todoList, setTodoList, setSelectedTodo }: Props) {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
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
		setIsOpenModal(true);
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
							{isOpenModal ? (
								<TodoUpdateModal
									setIsOpenModal={setIsOpenModal}
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
