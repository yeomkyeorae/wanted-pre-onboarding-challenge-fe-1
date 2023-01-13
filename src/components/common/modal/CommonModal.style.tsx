import styled from 'styled-components';

export const Modal = styled.div`
	position: fixed;
	z-index: 990;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;

export const Overlay = styled.div`
	position: absolute;
	z-index: 995;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.1);
`;

export const ModalContainer = styled.div`
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
	border: 1px solid black;
	border-radius: 15px;
	width: 520px;
`;

export const CloseBtn = styled.button`
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

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: 'center';
`;
