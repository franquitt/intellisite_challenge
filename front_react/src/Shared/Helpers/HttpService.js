import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const http = axios.create({
	baseURL,
	headers: {
		'Content-type': 'application/json',
	},
});

export const get = (url, body) => {
	try {
		return http.get(url, body);
	} catch (e) {
		console.error(e);
	}
};
