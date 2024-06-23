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
  textField: css({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000060', // 通常時の枠の色
      },
      '&:hover fieldset': {
        borderColor: '#000060', // ホバー時の枠の色
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000060', // フォーカス時の枠の色
      },
    },
  }),
  modalTitle: css({
    component: 'h3',
    fontSize: '30px',
    '@media (max-width: 600px)': {
      fontSize: '25px',
    },
    fontWeight: 'bold',
    color: '#000040',
  }),
  modalText: css({
    component: 'p',
    fontSize: '15px',
    '@media (max-width: 600px)': {
      fontSize: '15px',
    },
    fontWeight: 'bold',
    color: '#000040',
  }),
  styledButton: css({
    backgroundColor: '#000060',
    borderRadius: 8,
    transition: 'all 150ms ease',
    border: '1px solid #01015c',
  }),
};
