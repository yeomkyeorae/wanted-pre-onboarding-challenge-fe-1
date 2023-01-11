import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import auth from '../auth/Auth';
import Login from '../pages/auth/AuthPage';
import Todo from '../pages/todo/TodoPage';

function AppRouter() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={auth(Todo, true)}></Route>
				<Route exact path="/auth" component={auth(Login, null)}></Route>
			</Switch>
		</Router>
	);
}

export default AppRouter;
