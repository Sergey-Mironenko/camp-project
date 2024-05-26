import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const tabletListStyles = (isOnTablet: boolean = true): string => {
  return css`
    display: flex;
    flex-direction: column;
  
    ${isOnTablet && (
      `flex-wrap: wrap;
      row-gap: 10px;
      column-gap: 20px;`
    )}
    
    ${!isOnTablet && (
      `font-size: ${THEME.todoList.listFontSize};
      gap: 7px;`
    )}

    color: ${THEME.secondaryColor};
    padding: ${isOnTablet ? THEME.todoList.listTabletPadding : THEME.todoList.listPhonePadding};
    background: ${THEME.baseColor};
    border-radius: 10px;
    width: ${isOnTablet ? '420px' : '280px'};
    height: ${isOnTablet ? '290px' : '210px'};
    overflow: scroll;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 0 0 rgba(0, 0, 0, 0.2);
  `
};

export const TabletFormErrorStyles = (): string => {
  return css`
    padding-left: ${THEME.todoList.errorGadgetPaddingLeft};
    font-weight: ${THEME.todoList.errorGadgetFontWeight};
    font-size: ${THEME.todoList.errorGadgetFontSize};
    color: ${THEME.todoList.textColor};
  `
};
