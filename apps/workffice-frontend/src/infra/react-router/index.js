import { connectRouter } from 'connected-react-router';
export * from './getHistory';
export * from './updateHistory';

export const configRouter = history => connectRouter(history);
