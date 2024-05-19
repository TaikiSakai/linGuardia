import { css } from '@emotion/react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SellIcon from '@mui/icons-material/Sell';
import {
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Card,
  Stack,
  TextField,
  CardContent,
  List,
  ListItem,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios, { AxiosResponse, AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useSWR from 'swr';
import ModalCard from '@/components/ModalCard';
import useModal from '@/hooks/ModalState';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { WordcardData } from '@/types/WordcardType';
import EditMenuForModal from '@/components/EditMenu';
import { fetcher } from '@/utils';

// 新規登録フォーム
type cardForm = {
  title: string;
  status: string;
};

type wordcardProps = {
  uuid: string;
  title: string;
  status: string;
  createdAt: string;
};

// フォントの設定
const fontSizeCss = css({
  fontSize: 25,
  '@media (max-width: 600px)': {
    fontSize: 15,
  },
});

const WordcardDetail: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { uuid } = router.query;

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const { data, error } = useSWR(uuid ? url + uuid : null, fetcher, {
    revalidateOnFocus: false,
  });

  const [wordcard, setWordcard] = useState<wordcardProps | null>(null);
  const { handleSubmit, control } = useForm<cardForm>();
  const [open, handleOpen, handleClose] = useModal();
  const [, setSnackbar] = useSnackbarState();

  const [modalContent, setModalContent] = useState<ReactNode>(null);

  useEffect(() => {
    if (error) {
      console.log(error);
      setSnackbar({
        message: 'era',
        severity: 'error',
        pathname: '/wordcards/[uuid]',
      });
    }
  }, [error, setSnackbar]);

  if (!data && !error) return <div>Loading...</div>;

  if (data && !wordcard) {
    const fetchedCards: wordcardProps = camelcaseKeys(data);
    setWordcard(fetchedCards);
  }

  console.log(wordcard);

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    handleOpen();
  };

  const handleCloseModal = () => {
    setModalContent(null);
    handleClose();
  };

  const headers = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };

  const deleteWordcard = () => {
    axios({
      method: 'DELETE',
      url: url + uuid,
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        console.log(res);
        setSnackbar({
          message: res.data.message,
          severity: 'success',
          pathname: '/wordcards',
        });
        router.push('/wordcards');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        if (e.response) {
          console.log(e);
          setSnackbar({
            message: e.response.data.error,
            severity: 'error',
            pathname: '/wordcards',
          });
          router.push('/wordcards');
        }
      });
  };

  const onSubmit = (data: cardForm) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';

    const newCardData = JSON.stringify({
      card: data,
    });

    axios({
      method: 'POST',
      url: url,
      headers: headers,
      data: newCardData,
    })
      .then((res: AxiosResponse) => {
        console.log(res);
        setSnackbar({
          message: '新しい単語帳を追加しました',
          severity: 'success',
          pathname: '/wordcards',
        });
        router.push('/wordcards');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        if (e.response) {
          console.log(e);
          setSnackbar({
            message: e.response.data.error,
            severity: 'error',
            pathname: '/wordcards/create',
          });
        }
      });
  };

  return (
    wordcard && (
      <Box
        css={styles.pageMinHeight}
        sx={{
          backgroundColor: '#e6f2ff',
          pb: 7,
        }}
      >
        <Container maxWidth="md" sx={{ pt: 3, pb: 3 }}>
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={3}
          >
            <Grid
              container
              item
              sx={{
                justifyContent: 'left',
                alignItems: 'left',
              }}
            >
              <Typography
                component="h3"
                sx={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000040',
                }}
              >
                {wordcard?.title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, p: 2 }}>
                <CardContent>
                  <Grid
                    container
                    item
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      pt: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      <Button>
                        <Stack direction="row" spacing={1}>
                          <SellIcon css={fontSizeCss} sx={{ color: 'gray' }} />
                          <Typography component="h3" css={fontSizeCss} sx={{ color: 'gray' }}>
                            覚える
                          </Typography>
                        </Stack>
                      </Button>
                      <Button>
                        <Stack direction="row" spacing={1}>
                          <BorderColorIcon css={fontSizeCss} sx={{ color: 'gray' }} />
                          <Typography component="h3" css={fontSizeCss} sx={{ color: 'gray' }}>
                            テスト
                          </Typography>
                        </Stack>
                      </Button>
                      <Button>
                        <Stack direction="row" spacing={1}>
                          <SearchIcon css={fontSizeCss} sx={{ color: 'gray' }} />
                          <Typography component="h3" css={fontSizeCss} sx={{ color: 'gray' }}>
                            単語検索
                          </Typography>
                        </Stack>
                      </Button>
                    </Stack>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, p: 2 }}>
                <CardContent>
                  <Grid container item>
                    <Grid item>
                      <Typography
                        component="h3"
                        sx={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#000040',
                        }}
                      >
                        動詞自動活用
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Grid
                      container
                      item
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    ></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, p: 2 }}>
                <CardContent>
                  <Grid container item>
                    <Grid item>
                      <Typography
                        component="h3"
                        sx={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#000040',
                        }}
                      >
                        カード設定
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Grid
                      container
                      item
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <List sx={{ width: '100%' }}>
                        <ListItem
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography>タイトル:</Typography>
                          <Stack direction="row" sx={{ alignItems: 'center' }}>
                            <Box>
                              <Typography>{wordcard?.title}</Typography>
                            </Box>
                            <Box
                              onClick={() => {
                                handleOpenModal(
                                  <EditMenuForModal
                                    uuid={wordcard?.uuid}
                                    title={wordcard?.title}
                                    status={wordcard?.status}
                                    createdAt={wordcard?.createdAt}
                                    changeValue={setWordcard}
                                    closeModal={handleClose}
                                  />,
                                );
                              }}
                            >
                              <EditIcon sx={{ ml: 1, fontSize: 20, color: 'gray' }} />
                            </Box>
                          </Stack>
                        </ListItem>
                        <Divider />
                        <ListItem
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography>ステータス:</Typography>
                          <Stack direction="row" sx={{ alignItems: 'center' }}>
                            <Box>
                              <Typography>{wordcard?.status}</Typography>
                            </Box>
                            <Box
                              onClick={() => {
                                handleOpenModal(
                                  <EditMenuForModal
                                    uuid={wordcard?.uuid}
                                    title={wordcard?.title}
                                    status={wordcard?.status}
                                    createdAt={wordcard?.createdAt}
                                    changeValue={setWordcard}
                                    closeModal={handleClose}
                                  />,
                                );
                              }}
                            >
                              <EditIcon sx={{ ml: 1, fontSize: 20, color: 'gray' }} />
                            </Box>
                          </Stack>
                        </ListItem>
                        <Divider />
                        <ListItem
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography>作成日:</Typography>
                          <Stack direction="row" sx={{ alignItems: 'center' }}>
                            <Box>
                              <Typography>{wordcard?.createdAt}</Typography>
                            </Box>
                          </Stack>
                        </ListItem>
                        <Divider />
                        <Link href={'/vocabularies/create/' + uuid}>
                          <ListItem>
                            <Typography>単語追加</Typography>
                          </ListItem>
                        </Link>
                        <Divider />
                        <Link href={'/vocabularies/edit/' + uuid}>
                          <ListItem>
                            <Typography>単語編集</Typography>
                          </ListItem>
                        </Link>
                        <Divider />
                      </List>
                      <Grid item>
                        <Button onClick={deleteWordcard} variant="contained" color="error">削除</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <ModalCard title="" open={open} handleClose={handleCloseModal}>
          {modalContent}
        </ModalCard>
      </Box>
    )
  );
};

export default WordcardDetail;
