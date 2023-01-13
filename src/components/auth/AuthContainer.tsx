import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, registerUser } from '../../_actions/user_action';
import { HistoryProps, UserResponse } from '../interfaces';
import { Container } from './AuthContainer.style';

function Auth({ history }: HistoryProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoginPage, setIsLoginPage] = useState(true);

	const dispatch = useDispatch<any>();

	const onEmailHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};

	const onPasswordHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password.length < 8) {
			setEmail('');
			setPassword('');
			alert('비밀번호는 8자리 이상 입력해 주세요');
			return;
		}

		if (
			!email.includes('@') ||
			!email.includes('.') ||
			email.split('@').length !== 2 ||
			email.split('@')[0].length === 0 ||
			email.split('@')[1].length === 0 ||
			email.split('@')[1].split('.').length !== 2 ||
			email.split('@')[1].split('.')[0].length === 0 ||
			email.split('@')[1].split('.')[1].length === 0
		) {
			setEmail('');
			setPassword('');
			alert('정확한 이메일 형식을 입력해 주세요');
			return;
		}

		const body = { email, password };
		const requestFn = isLoginPage ? loginUser : registerUser;

		dispatch(requestFn(body)).then((response: UserResponse) => {
			const { message, token } = response.payload;
			window.localStorage.setItem('token', token);

			alert(message);
			history.push({ pathname: '/' });
		});
	};

	const changeToggle = () => {
		setIsLoginPage(!isLoginPage);
		setEmail('');
		setPassword('');
	};

	const validateInput = () => {
		if (password.length < 8) {
			return false;
		}

		if (
			!email.includes('@') ||
			!email.includes('.') ||
			email.split('@').length !== 2 ||
			email.split('@')[0].length === 0 ||
			email.split('@')[1].length === 0 ||
			email.split('@')[1].split('.').length !== 2 ||
			email.split('@')[1].split('.')[0].length === 0 ||
			email.split('@')[1].split('.')[1].length === 0
		) {
			return false;
		}
		return true;
	};

	const currentPageName = isLoginPage ? '로그인' : '회원가입';
	const otherPageName = isLoginPage ? '회원가입' : '로그인';

	return (
		<Container>
			<h1>{currentPageName}</h1>
			<form onSubmit={onSubmitHandler}>
				<input type="email" value={email} placeholder={'이메일'} onChange={onEmailHandler} />
				<input type="password" value={password} placeholder={'비밀번호'} onChange={onPasswordHandler} />
				<br />
				<button type="submit" disabled={!validateInput()} style={{ margin: '5px 0px' }}>
					{currentPageName}
				</button>
				<div onClick={changeToggle} style={{ color: '#e67e22', cursor: 'pointer' }}>
					{otherPageName}
				</div>
			</form>
		</Container>
	);
}

export default withRouter(Auth);
