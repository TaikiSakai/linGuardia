import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';

const SignOut: NextPage = () => {
  const router = useRouter();
  const [, setUser] = useUserState();
  const [, setSnackbar] = useSnackbarState();

  useEffect(() => {
    const userSignOut = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL + '/auth/sign_out';

      try {
        const res = await axios({
          method: 'DELETE',
          url: url,
          withCredentials: true,
        });
        setUser({
          id: 0,
          name: '',
          email: '',
          isSignedIn: false,
          isFetched: false,
        });
        console.log(res);
        console.log('logout しました');
        setSnackbar({
          message: 'ログアウトしました',
          severity: 'success',
          pathname: '/',
        });
        router.push('/');
      } catch (e) {
        setSnackbar({
          message: 'ログアウトに失敗しました',
          severity: 'error',
          pathname: '/',
        });
        router.push('/');
        console.log(e);
      }
    };

    userSignOut();
  }, [router, setSnackbar, setUser]);

  return <></>;
};

export default SignOut;
