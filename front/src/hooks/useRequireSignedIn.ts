import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserState, useSnackbarState } from './useGlobalState';

export const useRequireSignedIn = () => {
  const router = useRouter();
  const [user] = useUserState();
  const [, setSnackbar] = useSnackbarState();

  useEffect(() => {
    if (user.isFetched && !user.isSignedIn) {
      setSnackbar({
        message: 'ログインが必要です',
        severity: 'error',
        pathname: '/sign_in',
      });
      router.push('/sign_in');
    }
  }, [user, router, setSnackbar]);
};
