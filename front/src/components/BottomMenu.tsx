import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import StyleIcon from '@mui/icons-material/Style';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserState } from '@/hooks/useGlobalState';

const BottomMenu = () => {
  const route = useRouter();
  const [user] = useUserState();

  if (route.pathname == '/vocabularies/create/[uuid]') return <></>;
  if (route.pathname == '/vocabularies/edit/[uuid]') return <></>;
  if (route.pathname == '/wordcards/flashcard/[uuid]') return <></>;
  if (route.pathname == '/sign_in') return <></>;
  if (route.pathname == '/sign_up') return <></>;

  return (
    <>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        {user.isSignedIn && (
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="ダッシュボード"
              icon={<DashboardIcon />}
              LinkComponent={Link}
              href={'/dashboard'}
            />
            <BottomNavigationAction
              label="単語帳"
              icon={<StyleIcon />}
              LinkComponent={Link}
              href={'/wordcards'}
            />
            <BottomNavigationAction
              label="検索"
              icon={<SearchIcon />}
              LinkComponent={Link}
              href={'/wordcards/search'}
            />
            <BottomNavigationAction
              label="設定"
              icon={<SettingsIcon />}
              LinkComponent={Link}
              href={'/user/profile'}
            />
          </BottomNavigation>
        )}
      </Paper>
    </>
  );
};

export default BottomMenu;
