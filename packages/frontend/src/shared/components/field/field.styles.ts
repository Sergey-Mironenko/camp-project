import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const addFormErrorStyles = (): string => {
  return css`
    padding-left: ${THEME.todoList.errorGadgetPaddingLeft};
    font-weight: ${THEME.todoList.errorGadgetFontWeight};
    font-size: ${THEME.todoList.errorGadgetFontSize};
    color: ${THEME.todoList.textColor};
  `
};

