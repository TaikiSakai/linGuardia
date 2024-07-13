import { Box, Container, Grid, Typography, TextField, Select, MenuItem } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useSWR from 'swr';
import RankedCard from '@/components/RankedCard';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { AuthorData } from '@/types/AuthorType';
import { LikeData } from '@/types/LikeType';
import { WordcardData } from '@/types/WordcardType';
import { fetcher } from '@/utils';

type SearchResult = {
  card: WordcardData;
  user: AuthorData;
  like: LikeData;
};

type searchQuery = {
  matcher: 'title_cont' | 'categories_name_cont';
  searchValue: string;
};

const Index: NextPage = () => {
  useRequireSignedIn();

  const [query, setQuery] = useState<string | null>(null);
  const { handleSubmit, control } = useForm<searchQuery>({
    defaultValues: { matcher: 'title_cont', searchValue: '' },
  });

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/search?';
  const { data, error } = useSWR(query ? url + query : null, fetcher, { revalidateOnFocus: false });

  const fetchedCards: SearchResult[] | null = (() => {
    if (data) {
      return data.map((card: SearchResult) => camelcaseKeys(card, { deep: true }));
    } else {
      return null;
    }
  })();

  const validationRule = {
    searchValue: {
      required: '検索ワードを入力してください',
      pattern: {
        value: /^[0-9A-Za-z]{1,15}$/,
        message: '15文字以内で入力してください',
      },
    },
  };

  const onBlur = (data: searchQuery) => {
    if (data.searchValue) {
      const query = `q[${data.matcher}]=${data.searchValue}`;
      console.log(query);

      setQuery(query);
    }
  };

  return (
    <Box css={styles.baseLayout}>
      <Container maxWidth="md">
        <Grid
          container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          spacing={3}
        >
          <Grid container item>
            <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
              <Typography css={styles.pageTitle}>単語帳を検索</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box component="form" onBlur={handleSubmit(onBlur)}>
              <Grid container item>
                <Grid item xs={3} md={3}>
                  <Controller
                    name="matcher"
                    control={control}
                    defaultValue={'title_cont'}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        required
                        sx={{ backgroundColor: 'white', width: '100%' }}
                      >
                        <MenuItem value={'title_cont'}>タイトル</MenuItem>
                        <MenuItem value={'categories_name_cont'}>カテゴリー</MenuItem>
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={9} md={9}>
                  <Controller
                    name="searchValue"
                    control={control}
                    rules={validationRule.searchValue}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        size="small"
                        required
                        placeholder="検索"
                        helperText={fieldState.error?.message}
                        sx={{ backgroundColor: 'white', width: '100%' }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {fetchedCards &&
              fetchedCards.map((card: SearchResult, i: number) => (
                <Box sx={{ mb: 2 }} key={i}>
                  <RankedCard
                    uuid={card.card.uuid}
                    title={card.card.title}
                    userName={card.user.userName}
                    like={card.like.like}
                  />
                </Box>
              ))}
            {error && (
              <Box sx={{ mb: 2, justifyContent: 'center', textAlign: 'center' }}>
                <Typography css={styles.subTitle}>単語帳が見つかりません</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
