import { css } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';
import {
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Card,
  Stack,
  CardContent,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import useSWR, { mutate } from 'swr';
import CategoryBox from '@/components/CategoryBox';
import CommentBox from '@/components/CommentBox';
import CommentCard from '@/components/CommentCard';
import EditMenuForModal from '@/components/EditMenuBox';
import LikeButton from '@/components/LikeButton';
import ModalCard from '@/components/ModalCard';
import useModal from '@/hooks/ModalState';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { AuthorData } from '@/types/AuthorType';
import { CategoryData } from '@/types/CategoryType';
import { CommentData } from '@/types/CommentType';
import { LikeData } from '@/types/LikeType';
import { WordcardData } from '@/types/WordcardType';
import { fetcher } from '@/utils';

// フォントの設定
const buttonFontCss = css({
  fontSize: '25px',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const buttonIconCss = css({
  fontSize: '45px',
  '@media (max-width: 600px)': {
    fontSize: '30px',
  },
  color: '#000060',
});

const cardTextCss = css({
  component: 'h4',
  fontSize: '20px',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const WordcardDetail: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { uuid } = router.query;
  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';

  const [open, handleOpen, handleClose] = useModal();
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [, setSnackbar] = useSnackbarState();
  const [user] = useUserState();

  const { data: card, error: cardFetchError } = useSWR(uuid ? url + uuid : null, fetcher, {
    revalidateOnFocus: false,
  });
  const { data: comments, error: commentFetchError } = useSWR(
    uuid ? url + uuid + '/comments' : null,
    fetcher,
  );

  useEffect(() => {
    if (cardFetchError | commentFetchError) {
      setSnackbar({
        message: 'エラーが発生しました',
        severity: 'error',
        pathname: '/wordcards/[uuid]',
      });
    }
  }, [cardFetchError, commentFetchError, setSnackbar]);

  const fetchedCard: WordcardData = card ? camelcaseKeys(card.card) : null;
  const fetchedAuthor: AuthorData = card ? camelcaseKeys(card.user) : null;
  const fetchedCategories: CategoryData = card ? camelcaseKeys(card.categories) : null;
  const fetchedLike: LikeData = card ? camelcaseKeys(card.like) : null;
  const fetchedComments: CommentData[] = camelcaseKeys(comments);

  if (!card && !cardFetchError && !comments && !commentFetchError) return <div>Loading...</div>;

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    handleOpen();
  };

  const handleCloseModal = () => {
    setModalContent(null);
    handleClose();
  };

  const headers = { 'Content-Type': 'application/json' };

  console.log(fetchedLike);
  const deleteWordcard = async () => {
    try {
      const res: AxiosResponse = await axios({
        method: 'DELETE',
        url: url + uuid,
        headers: headers,
        withCredentials: true,
      });
      mutate(url);
      setSnackbar({
        message: res.data.message,
        severity: 'success',
        pathname: '/wordcards',
      });
      router.push('/wordcards');
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
        setSnackbar({
          message: e.response?.data.error,
          severity: 'error',
          pathname: '/wordcards',
        });
      }
      router.push('/wordcards');
    }
  };

  return (
    fetchedCard &&
    fetchedComments && (
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
              <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                <Typography css={styles.pageTitle}>{fetchedCard.title}</Typography>
              </Box>
            </Grid>

            <Grid container item spacing={2} xs={12} md={8} justifyContent="center">
              <Grid container item sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid item>
                  <Grid container item sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item>
                      <Typography css={cardTextCss}>{fetchedAuthor.userName}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <LikeButton like={fetchedLike.like} numberOfLikes={fetchedLike.numberOfLikes} />
                </Grid>
              </Grid>
              <Grid
                item
                xs={user.id === fetchedAuthor.userId ? 6 : 12}
                md={user.id === fetchedAuthor.userId ? 6 : 12}
              >
                <Link href={'/wordcards/flashcard/' + uuid}>
                  <Card sx={{ borderRadius: 3 }} elevation={2}>
                    <CardContent>
                      <Stack
                        spacing={1}
                        direction="row"
                        sx={{ justifyContent: 'center', alignItems: 'center' }}
                      >
                        <SellIcon css={buttonIconCss} />
                        <Typography component="h3" css={buttonFontCss}>
                          覚える
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              {user.id === fetchedAuthor.userId && (
                <Grid item xs={6} md={6}>
                  <Link href={'/wordcards/conjugation/' + uuid}>
                    <Card sx={{ borderRadius: 3 }} elevation={2}>
                      <CardContent>
                        <Stack
                          spacing={1}
                          direction="row"
                          sx={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                          <AutoFixNormalIcon css={buttonIconCss} />
                          <Typography component="h3" css={buttonFontCss} sx={{ fontSize: 15 }}>
                            動詞生成
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              )}
            </Grid>
            {user.id === fetchedAuthor.userId && (
              <Grid container item spacing={2} xs={12} md={8} justifyContent="center">
                <Grid item xs={6} md={6}>
                  <Link href={'/vocabularies/create/' + uuid}>
                    <Card sx={{ borderRadius: 3 }} elevation={2}>
                      <CardContent>
                        <Stack
                          spacing={1}
                          direction="row"
                          sx={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                          <AddIcon css={buttonIconCss} />
                          <Typography component="h3" css={buttonFontCss}>
                            カードを追加
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Link href={'/vocabularies/edit/' + uuid}>
                    <Card sx={{ borderRadius: 3 }} elevation={2}>
                      <CardContent>
                        <Stack
                          spacing={1}
                          direction="row"
                          sx={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                          <EditIcon css={buttonIconCss} />
                          <Typography component="h3" css={buttonFontCss}>
                            カードを編集
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              </Grid>
            )}
            {fetchedCategories.name.length !== 0 && (
              <Grid item xs={12} md={8}>
                <Grid container item>
                  <Box sx={{ mb: 2, justifyContent: 'left', textAlign: 'left' }}>
                    <Typography css={styles.subTitle}>カテゴリー</Typography>
                  </Box>
                </Grid>
                <Card sx={{ borderRadius: 3, p: 1 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        px: 5,
                      }}
                    >
                      {fetchedCategories.name.map((category: string, i: number) => (
                        <CategoryBox name={[category]} deletable={false} key={i} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <Grid container item>
                <Box sx={{ mb: 2, justifyContent: 'left', textAlign: 'left' }}>
                  <Typography css={styles.subTitle}>コメント</Typography>
                </Box>
              </Grid>
              <Card sx={{ borderRadius: 3 }}>
                <List sx={{ width: '100%', p: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'right',
                      maxHeight: 30,
                      pb: 1,
                      pr: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleOpenModal(<CommentBox closeModal={handleClose} />);
                      }}
                    >
                      <CommentIcon />
                    </IconButton>
                  </Box>
                  <Divider />
                  {fetchedComments.length === 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pt: 2,
                      }}
                    >
                      <Typography component="p" css={cardTextCss}>
                        コメントがありません
                      </Typography>
                    </Box>
                  )}
                  {fetchedComments.map((comment: CommentData, i: number) => (
                    <Box key={i}>
                      <CommentCard
                        id={comment.id}
                        userId={comment.userId}
                        userName={comment.userName}
                        body={comment.body}
                      />
                      {fetchedComments.indexOf(comment) < fetchedComments.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </Card>
            </Grid>

            {user.id === fetchedAuthor.userId && (
              <Grid item xs={12} md={8}>
                <Grid container item>
                  <Box sx={{ mb: 2, justifyContent: 'left', textAlign: 'left' }}>
                    <Typography css={styles.subTitle}>カード設定</Typography>
                  </Box>
                </Grid>
                <Card sx={{ borderRadius: 3, p: 2 }}>
                  <CardContent>
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
                                <Typography>{fetchedCard?.title}</Typography>
                              </Box>
                              <Box
                                onClick={() => {
                                  handleOpenModal(
                                    // モーダル要素
                                    <EditMenuForModal
                                      card={fetchedCard}
                                      category={fetchedCategories}
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
                                <Typography>{fetchedCard?.status}</Typography>
                              </Box>
                              <Box
                                onClick={() => {
                                  handleOpenModal(
                                    // モーダル要素
                                    <EditMenuForModal
                                      card={fetchedCard}
                                      category={fetchedCategories}
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
                                <Typography>{fetchedCard?.createdAt}</Typography>
                              </Box>
                            </Stack>
                          </ListItem>
                          <Divider />
                        </List>
                        <Grid item>
                          <Button onClick={deleteWordcard} variant="contained" color="error">
                            削除
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Container>
        {/* setModalContentにReactNode型でコンポーネントを渡す */}
        <ModalCard title="" open={open} handleClose={handleCloseModal}>
          {modalContent}
        </ModalCard>
      </Box>
    )
  );
};

export default WordcardDetail;
