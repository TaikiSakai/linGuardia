import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUserState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

const Header = () => {
  const [user] = useUserState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        color: 'black',
        boxShadow: 1,
        py: '5px',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Link href="/">
              <Image src="/logo.png" width={120} height={25} alt="logo" />
            </Link>
          </Box>
          {user.isFetched && (
            <Box>
              {!user.isSignedIn && (
                <Box>
                  <Link href="/user/sign_in">
                    <Button css={styles.styledButton} variant="contained">
                      ログイン
                    </Button>
                  </Link>
                </Box>
              )}
              {user.isSignedIn && (
                <Box>
                  <Stack direction="row">
                    <Box>
                      <Button sx={{ textTransform: 'None' }} onClick={handleClick}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: 20,
                            color: 'gray',
                            fontWeight: 'solid',
                          }}
                        >
                          {user.name}
                        </Typography>
                      </Button>
                    </Box>
                  </Stack>
                  <Menu
                    anchorEl={anchorEl}
                    id="menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <Box sx={{ px: 1, py: 1 }}>
                      <Link href={'/user/profile'}>
                        <MenuItem>
                          <ListItemIcon>ユーザー設定</ListItemIcon>
                        </MenuItem>
                      </Link>
                      <Divider />
                      <Link href={'/user/sign_out'}>
                        <MenuItem>
                          <ListItemIcon>ログアウト</ListItemIcon>
                        </MenuItem>
                      </Link>
                    </Box>
                  </Menu>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
