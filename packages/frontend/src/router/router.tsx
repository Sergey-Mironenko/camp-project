import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import App from '~modules/app/app.module';
import Login from '~shared/components/login/login.component';
import TodoList from '~shared/components/todoList/todoList.component';

import { ROUTER_KEYS } from '~shared/keys';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const Router: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
	return (
	  <Routes>
		<Route
		  path={ROUTER_KEYS.LOGIN}
		  element={
			<Login onTablet={onTablet} onPhone={onPhone}/>
		  }
		/>
		<Route
		  path={ROUTER_KEYS.DASHBOARD}
		  element={
			<TodoList onTablet={onTablet} onPhone={onPhone}/>
		  }
		/>
		<Route
		  path={ROUTER_KEYS.ALL_MATCH}
		  element={
			<Navigate to={ROUTER_KEYS.LOGIN} replace />
		  }
		/>
	  </Routes>
	);
};

export default Router;
