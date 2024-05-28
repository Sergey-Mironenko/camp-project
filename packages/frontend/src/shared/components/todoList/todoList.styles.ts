import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const todoListStyles = (): string => {
  return css`
    position: relative;
    margin: 0 auto;
    align-items: center;
    width: 100%;
    margin-bottom: ${THEME.todoList.marginBottom};
  `;
};


export const titleStyles = (isOnPhone: boolean = false): string => {
  return css`
    text-align: center;
    font-size: ${isOnPhone ? '35px' : '60px'};
    font-weight: ${THEME.todoList.fontWeight};
    color: ${THEME.todoList.textColor};
    margin-bottom: ${isOnPhone ? THEME.todoList.gadgetMarginBottom: THEME.todoList.desctopMarginBottom};
  `;
};

export const addButtonStyles = (isOnPhone: boolean = false, isOnTablet: boolean = false): string => {
  return css`
    font-family: ${THEME.fontFamily};
    font-weight: ${THEME.primaryFontWeight};
    font-size: ${THEME.todoList.buttonDesctopFontSize};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${THEME.todoList.buttonTextColor};
    width: 900px;
    height: 100px;
    margin-bottom: ${THEME.todoList.buttonDesctopMarginBottom};
    ${isOnPhone && (
      `width: 280px;
      height: 60px;
      font-size: ${THEME.todoList.buttonPhoneFontSize};
      margin-bottom: ${THEME.todoList.buttonPhoneMarginBottom};`
    )}
    ${isOnTablet && (
      `width: 420px;
      height: 80px;
      font-size: ${THEME.todoList.buttonTabletFontSize};`
    )}
    padding: ${THEME.todoList.padding};
    background: ${THEME.baseColor};
    border-radius: 10px;
    border: none;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 0 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;

    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
      0 1px 8px 0 rgba(0, 0, 0, 0.2);
    }
    margin: auto;
    margin-bottom: 10px;
  `;
};

export const addFormStyles = (isOnPhone: boolean = false, isOnTablet: boolean = false, isError: boolean = false): string => {
  return css`
    font-family: ${THEME.fontFamily};
    font-weight: ${THEME.primaryFontWeight};
    font-size: ${THEME.todoList.formDesctopFontSize};
    ${isOnPhone && (
      `font-size: ${THEME.todoList.formPhoneFontSize};`
    )}
    ${isOnTablet && (
      `font-size: ${THEME.todoList.formTabletFontSize};`
    )}
    display: grid;
    grid-template-columns: 1fr 1fr 100px;
    align-items: center;
    z-index: 5;
    width: 900px;
    height: 100px;
    padding: ${THEME.todoList.formDesctopPadding};
    margin: auto;
    margin-bottom: ${THEME.todoList.formDesctopMarginBottom};
    ${isOnPhone && (
      `width: 280px;
      height: 60px;
      padding: ${THEME.todoList.formPhonePadding};
      grid-template-columns: 1fr 1fr 60px;
      margin-bottom: ${THEME.todoList.formPhoneMarginBottom};`
    )}
    ${isOnTablet && (
      `width: 420px;
      height: 80px;
      padding: ${THEME.todoList.formTabletPadding};
      grid-template-columns: 1fr 1fr 60px;
      gap: 10px;`
    )}
    color: ${THEME.secondaryColor};
    background: ${THEME.baseColor};
    border-radius: 10px;
    border: none;

    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 0 0 rgba(0, 0, 0, 0.2);

    & div:first-child {
      display: flex;
      ${(isOnPhone || isOnTablet) && `
        flex-direction: column;`}
      gap: 10px;

      & div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }

      & div input {
        font-family: ${THEME.fontFamily};
        font-weight: ${THEME.primaryFontWeight};
        font-size: ${THEME.todoList.inputDesctopFontSize};
        ${isOnPhone && (
          `font-size: ${THEME.todoList.inputPhoneFontSize};`
        )}
        ${isOnTablet && (
          `font-size: ${THEME.todoList.inputTabletFontSize};`
        )}  
        color: ${THEME.secondaryColor};
        width: 170px;
        ${isOnPhone && (
          'width: 80px;'
        )}
        ${isOnTablet && (
          'width: 120px;'
        )}
        border: 2px solid ${isError ? 'rgb(215, 124, 124)' : 'rgba(0, 0, 0, 0.2)'};
        border-radius: 5px;
      }

      & span {
        padding: 0;
        font-weight: 300;
        font-size: 20px;
        ${isOnPhone && (
          'font-size: 12px;'
        )}
        ${isOnTablet && (
          'font-size: 18px;'
        )}  
        color: ${THEME.todoList.textColor};
      }
    }

    & div:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: 10px;

      & div {
        display: flex;
        flex-direction: row;
        gap: ${!isOnPhone && !isOnTablet ? '10px' : '4px'};
  
        & input {
          width: 30px;
          cursor: pointer;
        }
      }
    }

    & button {
      font-family: ${THEME.fontFamily};
      font-weight: ${THEME.primaryFontWeight};
      font-size: 20px;
      ${isOnPhone && (
        `font-size: 12px;`
      )}
      ${isOnTablet && (
        `font-size: 14px;`
      )}
      color: #999;
      height: 85px;
      ${isOnPhone && (
        `height: 52px;
        width: 60px;`
      )}
      ${isOnTablet && (
        `height: 68px;`
      )}
      background: ${THEME.baseColor};
      border: none;
      border-radius: 5px;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2),
      0 ${isOnTablet ? '5px 50px' : '1px 20px'} 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;

      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
        0 ${isOnTablet ? '5px 100px' : '1px 20px'} 0 rgba(0, 0, 0, 0.2);
      }
    }

    z-index: 200;
  `;
};

export const shadowStyles = (isActive: boolean = false): string => {
  return css`
    display: ${!isActive && 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    z-index: 2;
  `;
};

export const tableStyles = (): string => {
  return css`
    color: ${THEME.secondaryColor};
    table-layout: auto;
    width: 100%;
    text-align: left;
    padding: ${THEME.todoList.tablePadding};
    background: #fff;
    border-radius: 10px;
    width: 900px;
    height: 466px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 0 0 rgba(0, 0, 0, 0.2);
    margin: auto;
  `;
};

export const tableHeadStyles = (): string => {
  return css`
    position: relative;
    margin: ${THEME.todoList.tableHeadMargin};
  `;
};

export const rowStyles = (): string => {
  return css`
    position: relative;
    height: 50px;
  `
};

