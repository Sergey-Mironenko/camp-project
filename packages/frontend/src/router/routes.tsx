import * as React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import Login from '~shared/components/login/login.component';
import Registration from '~shared/components/registration/registration.component';
import Reset from '~shared/components/reset/reset.component';
import Verify from '~shared/components/verify/verify.component';
import { ROUTER_KEYS } from '~shared/keys';

type Props = {
  onTablet: boolean;
  onPhone: boolean;
};

export const PrivateRoutes = ({ user }) => {
  if (!user) {
	return <Navigate to={ROUTER_KEYS.LOGIN} replace />;
  }
  
  return <Outlet />;
};

export const PublicRoutes = ({ user }) => {
  if (user) {
	return <Navigate to={ROUTER_KEYS.PROFILE} replace />;
  }
	
  return <Outlet />;
};
