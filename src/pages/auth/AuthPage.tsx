import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthContainer from '../../components/auth/AuthContainer';

function AuthPage() {
	return <AuthContainer />;
}

export default withRouter(AuthPage);
