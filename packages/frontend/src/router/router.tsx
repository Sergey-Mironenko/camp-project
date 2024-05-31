import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '~shared/components/login/login.component';
import Registration from '~shared/components/registration/registration.component';
import TodoList from '~shared/components/todoList/todoList.component';

import { useUsersStore } from '~store/user.store';

import { ROUTER_KEYS } from '~shared/keys';
import Verify from '~shared/components/verify/verify.component';
import Reset from '~shared/components/reset/reset.component';

import { PrivateRoutes, PublicRoutes } from './routes';
import Profile from '~shared/components/profile/profile.component';
import ChangeName from '~shared/components/changeName/changeName.component';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const Router: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const user = useUsersStore(state => state.user);

  return (
	<Routes>
	  <Route element={<PublicRoutes user={user} />}>
		<Route
		  path={ROUTER_KEYS.LOGIN}
		  element={<Login onTablet={onTablet} onPhone={onPhone} />}
		/>

		<Route
		  path={ROUTER_KEYS.VERIFY}
		  element={<Verify onTablet={onTablet} onPhone={onPhone} />}
		/>

		<Route
		  path={ROUTER_KEYS.RESET}
		  element={<Reset onTablet={onTablet} onPhone={onPhone} />}
		/>

		<Route
		  path={ROUTER_KEYS.REGISTRATION}
		  element={<Registration onTablet={onTablet} onPhone={onPhone} />}
		/>
      </Route>

	  <Route element={<PrivateRoutes user={user} />}>
		<Route
		  path={ROUTER_KEYS.PROFILE}
		  element={<Profile onTablet={onTablet} onPhone={onPhone} />}
		/>

		<Route
		  path={ROUTER_KEYS.DASHBOARD}
		  element={<TodoList onTablet={onTablet} onPhone={onPhone} />}
		/>

		<Route
		  path={ROUTER_KEYS.CHANGENAME}
		  element={<ChangeName onTablet={onTablet} onPhone={onPhone} />}
		/>

		<Route
		  path={ROUTER_KEYS.CHANGEPASSWORD}
		  element={<ChangeName onTablet={onTablet} onPhone={onPhone} />}
		/>
      </Route>
	</Routes>
  );
};

export default Router;
