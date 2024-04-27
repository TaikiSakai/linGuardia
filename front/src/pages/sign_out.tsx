import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const SignOut: NextPage = () => {
  const router = useRouter()
  const [, setUser] = useUserState()
  console.log('logout imported')

  useEffect(() => {
    const userSignOut = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL + '/auth/sign_out'
      const headers = {
        uid: localStorage.getItem('uid'),
        client: localStorage.getItem('client'),
        access_token: localStorage.getItem('access-token'),
      }
      console.log('userSignOut-inner')
      await axios({
        method: 'DELETE',
        url: url,
        headers: headers,
      })
        .then((res: AxiosResponse) => {
          localStorage.clear()
          setUser({
            id: 0,
            name: '',
            email: '',
            isSignedIn: false,
            isFetched: false,
          })
          console.log(res)
          console.log('logout しました')
          console.log('------fin request-------')
          router.push('/')
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log('erroe catched')
          console.log(e)
          router.push('/')
        })
    }
    userSignOut()
  }, [router, setUser])
  console.log('userSignOut-outer')

  return <></>
}

export default SignOut
