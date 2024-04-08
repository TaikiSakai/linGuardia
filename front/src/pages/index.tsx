import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.status}</div>
    </>
  )
}

export default Index
