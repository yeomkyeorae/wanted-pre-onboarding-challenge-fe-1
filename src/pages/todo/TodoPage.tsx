import React from 'react';
import { withRouter } from 'react-router-dom';
import TodoContainer from '../../components/todo/container/TodoContainer';

function TodoPage() {
	return <TodoContainer />;
}

export default withRouter(TodoPage);
