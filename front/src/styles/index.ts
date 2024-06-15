import { css } from '@emotion/react';

export const styles = {
  pageMinHeight: css({
    minHeight: 'calc(100vh - 57px)',
  }),
  pageTitle: css({
    component: 'h3',
    fontSize: 35,
    '@media (max-width: 600px)': {
      fontSize: 30,
    },
    fontWeight: 'bold',
    color: '#000040',
  }),
  subTitle: css({
    component: 'h4',
    fontSize: 20,
    '@media (max-width: 600px)': {
      fontSize: 15,
    },
    fontWeight: 'bold',
    color: '#000040',
  }),
};
