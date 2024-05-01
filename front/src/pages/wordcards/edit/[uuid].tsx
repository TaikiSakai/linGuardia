import { css } from '@emotion/react'
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import useSWR from 'swr'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type EditVocabularyProps = {
  id: number
  word: string
  meaning: string
  roles: string
}

type VocabularyFormData = {
  id: number
  word: string
  meaning: string
  // [key: string]: string
}

const EditPage: NextPage = () => {
  const router = useRouter()
  const { uuid } = router.query

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/'
  const { data, error } = useSWR(
    uuid ? url + uuid + '/vocabularies' : null,
    fetcher,
  )

  const { handleSubmit, control } = useForm<VocabularyFormData>()

  if (error) return <div>単語帳を取得できません</div>
  if (!data) return <div>Loading...</div>

  const vocabularies: EditVocabularyProps[] = camelcaseKeys(data.vocabularies)
  const onSubmit: SubmitHandler<VocabularyFormData> = (data) => {
    const vocabularies = []

    // vocabularies配列を生成
    for (const key in data) {
      const [field, id] = key.split('-') // 'word-276' から ['word', '276'] を取得
      const index = vocabularies.findIndex(v => v.id === parseInt(id))

      if (index === -1) {
        vocabularies.push({
          id: parseInt(id),
          [field]: data[key],
        })
      } else {
        vocabularies[index][field] = data[key]
      }
    }

    // ここでAPIに送信するデータを整形
    const payload = {
      vocabularies: vocabularies,
    }

    console.log(payload) // デバッグ用にコンソールに出力
    console.log(JSON.stringify(payload, null, 2))

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    axios({
      method: 'PATCH',
      url: url + uuid + '/vocabularies/update',
      headers: headers,
      data: payload,
    })
      .then((res: AxiosResponse) => {
        console.log(res.data.message)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
  }

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {vocabularies.map((vocabulary: EditVocabularyProps, i: number) => (
            <Grid container item spacing={2} key={i} xs={10} md={10}>
              <Grid item xs={6} md={6}>
                <Controller
                  name={'word-' + vocabulary.id}
                  defaultValue={vocabulary.word}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="text"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      placeholder="表面"
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      sx={{ backgroundColor: 'white' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <Controller
                  name={'meaning-' + vocabulary.id}
                  defaultValue={vocabulary.meaning}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="text"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      placeholder="裏面"
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      sx={{ backgroundColor: 'white' }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          ))}
          <Button type="submit">保存</Button>
        </Grid>
      </Container>
    </Box>
  )
}

export default EditPage
