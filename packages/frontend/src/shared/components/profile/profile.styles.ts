import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const formStyles = (): string => {
  return css`
    width: 500px;
    color: ${THEME.secondaryColor};
    padding: 20px;
    background: ${THEME.baseColor};
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4),
    0 5px 10px 0 rgba(0, 0, 0, 0.2);
  `
};

export const resetStyles = (): string => {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 20px;
      margin-top: 10px;
      color: ${THEME.secondaryColor};
      padding: 20px;
      background: ${THEME.baseColor};
      border-radius: 5px;
      text-decoration: none;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4),
      0 5px 10px 0 rgba(0, 0, 0, 0.2);
    `
  };

  export const buttonStyles = (onPhone: boolean = false): string => {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: ${THEME.fontFamily};
      font-weight: ${THEME.secondaryFontWeight};
      font-size: ${onPhone ? THEME.header.buttonGadgetFontSize : THEME.header.bttonDesctopFontSize};
      height: ${onPhone ? '30px' : '35px'};
      width: ${onPhone ? '60px' : '90px'};
      color: ${THEME.secondaryTextColor};
      background: ${THEME.baseColor};
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2),
      0 5px 50px 0 rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-underline: none;
      
      transition: box-shadow 0.3s;
  
      &:hover {
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4),
        0 5px 100px 0 rgba(0, 0, 0, 0.2);
        text-decoration: none;
        color: ${THEME.secondaryTextColor};
      }
    `;
  };