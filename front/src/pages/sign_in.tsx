import {
  Grid,
  Card,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }

    axios({ method: 'POST', url: url, data: data, headers: headers })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
        router.push('/')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
  }

  return (
    <Grid container columns={10}>
			<Grid item xs={5} md={8} sx={{ margin: 'auto', pt: 20 }} 
      style={{ maxWidth: '550px'}}>
				<Card sx={{ p: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            ログイン
          </Typography>
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="メールアドレス"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="パスワード"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              ログイン
            </Button>
          </Stack>
      	</Card>
			</Grid>
      
    </Grid>
  )
}

export default SignIn
