import axios from 'axios';
import { useEffect } from 'react';
import { useUserState } from '@/hooks/useGlobalState';

const CurrentUserFetcher = () => {
  const [user, setUser] = useUserState();

  console.log(user);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (user.isFetched) {
        console.log(user);
        return;
      } else {
        const url = process.env.NEXT_PUBLIC_API_URL + '/current/user';

        try {
          const res = await axios({
            method: 'GET',
            url: url,
            withCredentials: true,
          });
          setUser({
            ...user,
            ...res.data,
            isSignedIn: true,
            isFetched: true,
          });
        } catch (e) {
          setUser({
            ...user,
            isFetched: true,
          });
        }
      }
    };

    fetchCurrentUser();
  }, [user, setUser]);

  return <></>;
};

export default CurrentUserFetcher;
