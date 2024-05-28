import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const rowStyles = (): string => {
  return css`
    position: relative;
    height: 50px;
  `
};

export const lastThStyles = (): string => {
  return css`
    display: flex;
    justify-content: right;
    align-items: center;
    position: absolute;
    top: 3px;
    left: -15px;
    height: 44px;
    width: 870px;
    content: "";
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 0 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  `;
};

export const buttonStyles = (): string => {
  return css`
    font-family: ${THEME.fontFamily};
    font-weight: ${THEME.primaryFontWeight};
    font-size: ${THEME.todoDesctop.fontSize};
    height: 30px;
    width: 60px;
    margin-right: ${THEME.todoDesctop.marginRight};
    border: none;
    border-radius: 5px;
    color: ${THEME.secondaryColor};
    background: ${THEME.baseColor};
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2),
    0 5px 50px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  
    transition: box-shadow 0.3s;
  
    &:hover {
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
      0 5px 100px 0 rgba(0, 0, 0, 0.2);
    }
  `
};

export const formContainerStyles = (): string => {
  return css`
    display: flex;
    justify-content: right;
    align-items: center;
    position: absolute;
    top: 3px;
    left: -15px;
    height: 44px;
    width: 870px;
    content: "";
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 0 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  `;
};

export const formStyles = (): string => {
  return css`
    display: grid;
    grid-template-columns: 236px 242px 219px 88px 60px;
    align-items: center;
    background: ${THEME.baseColor};
    height: 44px;
    width: 870px;
    padding: ${THEME.todoDesctop.formPadding};
    border-radius: 5px;
    z-index: 5;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4),
    0 15px 10px 0 rgba(0, 0, 0, 0.2);
  `
};
  
export const formFieldStyles = (error: boolean = false): string => {
  return css`
    font-family: ${THEME.fontFamily};
    font-weight: ${THEME.primaryFontWeight};
    font-size: ${THEME.todoDesctop.fontSize};
    color: ${THEME.secondaryColor};
    width: 120px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    border-color: ${error ? 'rgb(215, 124, 124)' : 'rgba(0, 0, 0, 0.2)' };
  `
};
  
export const checkboxContainerStyles = (): string => {
  return css`
    display: flex;
    align-items: center;
    gap: 5px;
  `
};
  
export const checkboxStyles = (): string => {
  return css`
    width: 20px;
    height: 20px;
    background: ${THEME.todoList.textColor};
    border: 2px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-left: 4px;

    &:checked {
      background: ${THEME.todoList.textColor};
    }
  `
};
  
export const errorStyles = (): string => {
  return css`
    padding-left: ${THEME.todoDesctop.errorPaddingLeft};
    font-weight: ${THEME.todoDesctop.errorFontWeight};
    color: ${THEME.todoList.textColor};
  `
};
