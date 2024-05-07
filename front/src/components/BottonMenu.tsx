import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import StyleIcon from '@mui/icons-material/Style';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link';

const BottomMenu = () => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
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
    </Paper>
  );
};

export default BottomMenu;
