import { AppBar, Box, Button, Container } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
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
          <Box>
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
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
