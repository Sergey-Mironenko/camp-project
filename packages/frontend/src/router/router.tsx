import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import App from '~modules/app/app.module';

import { ROUTER_KEYS } from '~shared/keys';

const Router: React.FunctionComponent = () => {
	return (
	  <Routes>
		<Route
		  path={ROUTER_KEYS.DASHBOARD}
		  element={
			<App />
		  }
		/>
		<Route
		  path={ROUTER_KEYS.ALL_MATCH}
		  element={
			<Navigate to={ROUTER_KEYS.DASHBOARD} replace />
		  }
		/>
	  </Routes>
	);
};

export default Router;
