import * as React from 'react';

import { HeaderStyles, containerStyles, buttonContainerStyles, logoStyles, buttonStyles } from './header.styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useUsersStore } from '~store/user.store';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
}

const Header: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const user = useUsersStore(state => state.user);
  const setUser = useUsersStore(state => state.setUser);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }

  return (
	<header className={classNames(
      HeaderStyles(onPhone)
	)}>
      <div className={classNames(
        containerStyles(onPhone)
      )}>
        <div className={classNames(
          logoStyles(onPhone)
        )}>
          Todo App
        </div>
        <div className={classNames(
          buttonContainerStyles(onPhone)
        )}>
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={classNames(
                  buttonStyles(onPhone)
                )}
              >
                Log in
              </NavLink>
              <NavLink
                to="/registration"
                className={classNames(
                  buttonStyles(onPhone)
                )}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <button
                className={classNames(
                  buttonStyles(onPhone)
                )}
                onClick={handleLogout}
              >
                Log out
              </button>
              <NavLink
                to="/profile"
                className={classNames(
                  buttonStyles(onPhone)
                )}
              >
                Profile
              </NavLink>
            </>
          )}
        </div>
      </div>
	</header>
  );
};

export default Header;
