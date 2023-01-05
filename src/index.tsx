import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<Provider store={createStoreWithMiddleware(Reducer)}>
		<App />
	</Provider>
);
