import { css } from '@emotion/react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import SellIcon from '@mui/icons-material/Sell';
import { Grid, Box, Button, Card, CardContent, Typography, TextField, Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import ModalCard from './ModalCard';
import useModal from '@/hooks/ModalState';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { WordcardData } from '@/types/WordcardType';

// フォントの設定
const fontSizeCss = css({
  fontSize: 25,
  '@media (max-width: 600px)': {
    fontSize: 12,
  },
});

// 新規登録フォーム用の型
type cardForm = {
  title: string;
  status: string;
};

type newWordcardHandler = WordcardData & {
  addValue: (newValue: WordcardData) => void;
};

const CardMenu = (props: newWordcardHandler) => {
  const { handleSubmit, control, reset } = useForm<cardForm>();
  const [open, handleOpen, handleClose] = useModal(reset);
  const [, setSnackbar] = useSnackbarState();

  const addToIndex = props.addValue;

  const onSubmit = (data: cardForm) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';

    const newCardData = JSON.stringify({
      card: data,
    });

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    };
    axios({
      method: 'POST',
      url: url,
      headers: headers,
      data: newCardData,
    })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setSnackbar({
          message: '新しい単語帳を作成しました',
          severity: 'success',
          pathname: '/wordcards',
        });
        // res/dataは、uuid、 title、created_at
        addToIndex(res.data);
        handleClose();
      })
      .catch((e: AxiosError<{ error: string }>) => {
        if (e.response) {
          setSnackbar({
            message: e.response.data.error,
            severity: 'error',
            pathname: '/wordcards',
          });
        }
      });
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          pb: 5,
        }}
      >
        <Grid item xs={10} md={10}>
          <Box>
            <Card sx={{ borderRadius: 3, height: 140 }}>
              <CardContent>
                <Grid
                  container
                  item
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Grid item xs={4} md={4}>
                    <Button onClick={handleOpen}>
                      <Stack
                        sx={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        spacing={1}
                      >
                        <SellIcon sx={{ fontSize: 40, color: 'gray' }} />
                        <Typography component="h3" css={fontSizeCss} sx={{ color: 'gray' }}>
                          カードを作成
                        </Typography>
                      </Stack>
                    </Button>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Button>
                      <Stack
                        sx={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <BorderColorIcon sx={{ fontSize: 40, color: 'gray' }} />
                        <Typography component="h3" css={fontSizeCss} sx={{ color: 'gray' }}>
                          テスト
                        </Typography>
                      </Stack>
                    </Button>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Button>
                      <Stack
                        sx={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <SearchIcon sx={{ fontSize: 40, color: 'gray' }} />
                        <Typography component="h3" css={fontSizeCss} sx={{ color: 'gray' }}>
                          単語検索
                        </Typography>
                      </Stack>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <ModalCard title="カード新規作成" open={open} handleClose={handleClose}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <Controller
            name={'title'}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                required
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                label="タイトル"
                fullWidth
                size="small"
                multiline
                rows={1}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name={'status'}
            control={control}
            defaultValue={'close'}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="status-label">公開設定</InputLabel>
                <Select {...field} required labelId="status-label" label="公開設定">
                  <MenuItem value={'open'}>公開</MenuItem>
                  <MenuItem value={'close'}>非公開</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Box>
            <Typography component="h3" sx={{ fontWeight: 'bold' }}>
              ※公開設定について
            </Typography>
            <Typography component="p">
              <code>&quot;公開&quot;</code>
              を選択すると、他のユーザーがこの単語帳を閲覧することができるようになります。
            </Typography>
          </Box>
          <Button variant="contained" type="submit">
            登録
          </Button>
        </Stack>
      </ModalCard>
    </Box>
  );
};

export default CardMenu;
