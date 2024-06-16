import { css } from '@emotion/react';

export const styles = {
  baseLayout: css({
    minHeight: 'calc(100vh - 57px)',
    backgroundColor: '#e6f2ff',
    paddingTop: '24px',
    paddingBottom: '80px',
  }),
  pageMinHeight: css({
    minHeight: 'calc(100vh - 57px)',
  }),
  pageTitle: css({
    component: 'h3',
    fontSize: '35px',
    '@media (max-width: 600px)': {
      fontSize: '30px',
    },
    fontWeight: 'bold',
    color: '#000040',
  }),
  subTitle: css({
    component: 'h4',
    fontSize: '20px',
    '@media (max-width: 600px)': {
      fontSize: '15px',
    },
    fontWeight: 'bold',
    color: '#000040',
  }),
};
