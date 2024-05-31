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
