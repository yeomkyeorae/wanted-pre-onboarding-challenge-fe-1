import styled from 'styled-components';

const inputStyles = `
	border: 1px solid black;
	border-radius: 15px;
	box-shadow: 5px 10px 20px rgb(0, 0, 0, 0.2);
	height: 20px;
	width: 300px;
	margin-bottom: 3px;
	text-align: center;
`;

export const Input = styled.input`
	${inputStyles}
`;

export const ContentTextArea = styled.textarea`
	${inputStyles}
	height: 150px;
`;

export const Button = styled.button`
	width: 100px;
	background-color: #1e272e;
	color: white;
	border-radius: 15px;
	cursor: pointer;
`;
