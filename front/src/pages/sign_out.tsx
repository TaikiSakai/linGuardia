import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const SignOut: NextPage = () => {
  const router = useRouter()
  const [, setUser] = useUserState()
  console.log('logout imported')

  useEffect(() => {
    localStorage.clear()

    setUser({
      id: 0,
      name: '',
      email: '',
      isSignedIn: false,
      isFetched: false,
    })

    console.log('logout しました')
    router.push('/')
  }, [router, setUser])

  return <></>
}

export default SignOut
