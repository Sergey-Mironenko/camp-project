import * as React from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import Header from '~shared/components/header/reader.component';
import TodoList from '~shared/components/todoList/todoList.component';
import { AppStyles } from './app.module.styles';

const App: React.FunctionComponent = () => {
  const onTablet = useMediaQuery({ maxWidth: 1000 });
  const onPhone = useMediaQuery({ maxWidth: 500 });
  return (
	<main className={classNames(
	  AppStyles()
	)}>    
	  <Header onTablet={onTablet} onPhone={onPhone}/>
	  <TodoList onTablet={onTablet} onPhone={onPhone}/>
	</main>
  );
};

export default App;
