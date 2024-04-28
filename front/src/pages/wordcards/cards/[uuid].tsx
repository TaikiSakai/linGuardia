import { css } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Divider,
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

const fontSizeCss = css({
  fontSize: 100,
  '@media (max-width: 600px)': {
    fontSize: 40,
  },
})

type vocabularyProps = {
  id: number
  word: string
  meaning: string
  roles: string
}

const Flashcard: NextPage = () => {
  const router = useRouter()
  const { uuid } = router.query
  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/'

  const { data, error } = useSWR(
    uuid ? url + uuid + '/vocabularies' : null,
    fetcher,
  )
  if (error) return <div>error</div>
  if (!data) return <div>Loading...</div>

  const vocabularies: vocabularyProps[] = camelcaseKeys(data.vocabularies)
  console.log(vocabularies)

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Button onClick={router.back}>
          <CloseIcon />
        </Button>
      </Box>
      {vocabularies && (
        <Container
          maxWidth="md"
          sx={{
            pt: 2,
            pb: 10,
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={11} md={12}>
              <Card sx={{ borderRadius: 5, height: 400 }}>
                <CardContent>
                  <Grid
                    container
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Grid item>
                      <Typography
                        component="h3"
                        css={fontSizeCss}
                        sx={{
                          color: '#000040',
                          fontWeight: 'bold',
                        }}
                      >
                        Vocabulary
                      </Typography>
                      <Divider />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
      {!vocabularies && <Box>{data.message}</Box>}
    </Box>
  )
}

export default Flashcard
