import useSWR from 'swr';

export const useUserState = () => {
  type userStateType = {
    id: number;
    name: string;
    email: string;
    isSignedIn: boolean;
    isFetched: boolean;
  };

  const initialData: userStateType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
  };

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: initialData,
  });

  return [state, setState] as [userStateType, (value: userStateType) => void];
};

export const useSnackbarState = () => {
  type snackbarStateStype = {
    message: null | string;
    severity: null | 'success' | 'error' | 'info' | 'aleart';
    pathname: null | string;
  };

  const initialData: snackbarStateStype = {
    message: null,
    severity: null,
    pathname: null,
  };

  const { data: state, mutate: setState } = useSWR('snackbar', null, {
    fallbackData: initialData,
  });

  return [state, setState] as [snackbarStateStype, (value: snackbarStateStype) => void];
};
