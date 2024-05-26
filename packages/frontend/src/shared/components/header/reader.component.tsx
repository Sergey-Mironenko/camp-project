import * as React from 'react';

import { HeaderStyles, containerStyles, buttonContainerStyles, logoStyles, buttonStyles } from './header.styles';
import classNames from 'classnames';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
}

const Header: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
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
          <button className={classNames(
            buttonStyles(onPhone)
          )}>
            Log in
          </button>
          <button className={classNames(
            buttonStyles(onPhone)
          )}>
            Register
          </button>
        </div>
      </div>
	</header>
  );
};

export default Header;
