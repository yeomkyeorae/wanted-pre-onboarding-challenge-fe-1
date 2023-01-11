import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
`;

export const Ul = styled.ul`
	padding: 0;
`;

export const LiContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Li = styled.li`
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

export const Button = styled.div`
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
