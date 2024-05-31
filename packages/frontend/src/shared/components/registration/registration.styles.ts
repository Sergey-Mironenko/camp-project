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
