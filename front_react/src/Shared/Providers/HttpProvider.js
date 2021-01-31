import React, {createContext, useContext, useState} from 'react';
import {
	get as getService,
} from '../Helpers/HttpService';
import {MsgContext} from './MsgProvider';

export const HttpContext = createContext();

const initialHttpState = {
	isLoading: false,
	requestCounter: 0,
};

const useStateContext = () => {
	const [httpState, setHttpState] = useState(initialHttpState);
	const {setMsg} = useContext(MsgContext);

	const addRequest = () => {
		setHttpState({
			...httpState,
			isLoading: true,
			requestCounter: httpState.requestCounter++,
		});
	};

	const removeRequest = () => {
		if (httpState.requestCounter === 1) {
			setTimeout(() => {
				setHttpState({
					...httpState,
					isLoading: false,
					requestCounter: httpState.requestCounter--,
				});
			}, 1500);
		} else {
			setHttpState({
				...httpState,
				requestCounter: httpState.requestCounter--,
			});
		}
	};

	const get = async (url, params) => {
		return await genericRequest(() => getService(url, params));
	};

	const genericRequest = async (callback) => {
		addRequest();
		return await new Promise((resolve, reject) => {
			callback()
				.then((res) => {
					removeRequest();
					if (res.error) {
						setMsg('error', res.message);
						reject(res.message);
					}
					resolve(res);
				})
				.catch((err) => {
					removeRequest();
					setMsg('error', 'Intern error');
					reject(err);
				});
		});
	};

	return {
		...httpState,
		get,
	};
};

export const HttpProvider = (props) => {
	const contextState = useStateContext();

	return (
		<HttpContext.Provider value={contextState}>
			{props.children}
		</HttpContext.Provider>
	);
};
