import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

export default function (Component: any, option: boolean | null): any {
	function AuthCheck(props: any): any {
		useEffect(() => {
			const token = localStorage.getItem('token');

			if (!token && option) {
				props.history.push('/auth');
			} else {
				if (option === false) {
					props.history.push('/');
				}
			}
		});

		return <Component />;
	}

	return withRouter(AuthCheck);
}
