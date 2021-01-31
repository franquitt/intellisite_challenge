import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import pageHome from "../../Home/pageHome";

const Router = () => {

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={pageHome} />
				<Route render={() => <Redirect to="/" />} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
