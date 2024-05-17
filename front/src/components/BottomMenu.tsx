import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import StyleIcon from '@mui/icons-material/Style';
import { Grid, Button, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserState } from '@/hooks/useGlobalState';

const BottomMenu = () => {
  const route = useRouter();
  const [user] = useUserState();

  if (route.pathname == '/wordcards/create/[uuid]') return <></>;
  if (route.pathname == '/wordcards/edit/[uuid]') return <></>;
  if (route.pathname == '/wordcards/flashcard/[uuid]') return <></>;
  if (route.pathname == '/sign_in') return <></>;
  if (route.pathname == '/sign_up') return <></>;

  return (
    <>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        {user.isSignedIn && (
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="ホーム"
              icon={<HomeIcon />}
              LinkComponent={Link}
              href={'/'}
            />
            <BottomNavigationAction
              label="単語帳"
              icon={<StyleIcon />}
              LinkComponent={Link}
              href={'/wordcards'}
            />
            <BottomNavigationAction
              label="お知らせ"
              icon={<NotificationsIcon />}
              LinkComponent={Link}
              href={'/'}
            />
            <BottomNavigationAction
              label="設定"
              icon={<SettingsIcon />}
              LinkComponent={Link}
              href={'/'}
            />
          </BottomNavigation>
        )}
        {!user.isSignedIn && (
          <Grid container justifyContent="center" alignItems="center" sx={{ height: 55 }}>
            <Grid item>
              <Link href="/sign_in">
                <Button variant="contained" sx={{ width: 100 }}>
                  LogIn
                </Button>
              </Link>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
};

export default BottomMenu;
