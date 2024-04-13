import { Box } from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'
import MyButton from '@/components/Mybutton'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>
  const test: string = 'test'
  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.status}</div>
      <div>This is top page</div>
      <MyButton label={test} />
    </Box>
  )
}

export default Index
