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
              <Image src="/logo.png" width={133} height={40} alt="logo" />
            </Link>
          </Box>
          {user.isFetched && (
            <Box>
              {!user.isSignedIn && (
                <Box>
                  <Link href="/user/sign_in">
                    <Button
                      color="primary"
                      variant="text"
                      sx={{
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 1,
                        boxShadow: 'none',
                      }}
                    >
                      LogIn
                    </Button>
                  </Link>
                </Box>
              )}
              {user.isSignedIn && (
                <Box>
                  <Stack direction="row">
                    <Box>
                      <Button onClick={handleClick}>
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
                          <ListItemIcon>サインアウト</ListItemIcon>
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
