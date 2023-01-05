import { RouteComponentProps } from 'react-router-dom';

export interface HistoryProps extends RouteComponentProps {
	history: RouteComponentProps['history'];
}
