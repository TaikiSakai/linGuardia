import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  Box,
  Button,
  Container,
  Typography,
  Stack,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 1,
        py: '12px',
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
                  <Link href="/sign_in">
                    <Button
                      color="primary"
                      variant="text"
                      sx={{
                        color: 'gray',
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 1,
                        boxShadow: 'none',
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/sign_up">
                    <Button
                      color="primary"
                      variant="text"
                      sx={{
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 1,
                        boxShadow: 'none',
                        ml: 2,
                      }}
                    >
                      Sign up
                    </Button>
                  </Link>
                </Box>
              )}
              {user.isSignedIn && (
                <Box>
                  <Stack direction="row">
                    <Box sx={{ color: 'gray', px: '10px' }}>
                      <SearchIcon />
                      <NotificationsIcon />
                      <AccountCircleIcon />
                    </Box>
                    <Box>
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
                    </Box>
                  </Stack>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
