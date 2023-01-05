import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {
	todoList: { title: string; content: string; id: string; createdAt: string; updatedAt: string }[];
}

function Todolist({ todoList }: Props) {
	return (
		<Container>
			<ul>
				{todoList?.map((el) => {
					return <li key={el.id}>{el.title}</li>;
				})}
			</ul>
		</Container>
	);
}

export default Todolist;
