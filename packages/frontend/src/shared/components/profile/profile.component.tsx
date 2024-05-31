import classNames from 'classnames';
import * as React from 'react';

import { formStyles, buttonStyles } from './profile.styles';

import { NavLink } from 'react-router-dom';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const Profile: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  return (
    <div className={classNames(
        formStyles()
    )}>
      <NavLink
        to="/changeName"
        className={classNames(
          buttonStyles(onPhone)
        )}
      >
        Change name
      </NavLink>

      <NavLink
        to="/changePassword"
        className={classNames(
          buttonStyles(onPhone)
        )}
      >
        Change password
      </NavLink>

      <NavLink
        to="/dashboard"
        className={classNames(
          buttonStyles(onPhone)
        )}
      >
        Dashboard
      </NavLink>
    </div>
  );
};

export default Profile;
