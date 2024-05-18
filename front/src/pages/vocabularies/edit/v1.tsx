import { Box, Button, Container, Grid, TextField } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import useSWR from 'swr';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';

type VocabularyFormData = VocabularyData & {
  // TextFieldに動的なプロパティを設定する
  [key: string]: string;
};

const EditVocabPage: NextPage = () => {
  const uuid = 'f0c520c6-681b-45f6-9008-d27e77269303';

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const { data, error } = useSWR(uuid ? url + uuid + '/vocabularies' : null, fetcher);

  const { handleSubmit, control } = useForm<VocabularyFormData>();

  if (error) return <div>単語帳を取得できません</div>;
  if (!data) return <div>Loading...</div>;

  const vocabularies: VocabularyData[] = camelcaseKeys(data);

  const onSubmit: SubmitHandler<VocabularyFormData> = (data) => {
    const vocabularies = [];
    console.log(data);

    // dataは word-idとmeaning-id を交互に返す
    for (const key in data) {
      // 例 'word-276' から ['word', '276']に分離する
      const [property, id] = key.split('-');

      // vocabularies配列内に同じidを持つオブジェクトが存在するかを確認し、
      // 存在する場合はそのindexを返す
      // 存在しない場合は-1を返す
      const index = vocabularies.findIndex((s) => s.id === parseInt(id));

      // indexが-1の場合は、新たにオブジェクトを作成する
      // ここではid、wordプロパティを追加する
      if (index === -1) {
        vocabularies.push({
          id: parseInt(id),
          [property]: data[key],
        });
      }
      // 同じidを持つオブジェクトが存在する場合は、要素を追加する
      // ここではmeaningプロパティを追加する
      else {
        vocabularies[index][property] = data[key];
      }
    }

    // ここでAPIに送信するデータを整形
    const vocabData = JSON.stringify({
      vocabularies: vocabularies,
    });

    console.log(JSON.stringify(vocabularies, null, 2));

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    };
    axios({
      method: 'PATCH',
      url: url + uuid + '/vocabularies/update',
      headers: headers,
      data: vocabData,
    })
      .then((res: AxiosResponse) => {
        console.log(res.data.message);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message);
      });
  };

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
          {vocabularies.map((vocabulary: VocabularyData, i: number) => (
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
  );
};

export default EditVocabPage;
