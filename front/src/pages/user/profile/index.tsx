import { css } from '@emotion/react';
import {
  Box,
  Button,
  Container,
  Card,
  Grid,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, ReactNode } from 'react';
import useSWR from 'swr';
import LearningSettingsBoxForModal from '@/components/LearningSettingsBox';
import ModalCard from '@/components/ModalCard';
import PasswordSettingsBoxForModal from '@/components/PasswordSettingsBox';
import UserSettingsBoxForModal from '@/components/userSettingsBox';
import useModal from '@/hooks/ModalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { fetcher } from '@/utils';

const listTextCss = css({
  component: 'h4',
  fontSize: '20px',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

type LearningData = {
  dailyAim: number;
};

const Index: NextPage = () => {
  useRequireSignedIn();

  const url = process.env.NEXT_PUBLIC_API_URL + '/current/learning_informations';
  const { data, error } = useSWR(url, fetcher);
  const fetchedLearningData: LearningData = data ? camelcaseKeys(data) : null;

  const [open, handleOpen, handleClose] = useModal();
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    handleOpen();
  };

  const handleCloseModal = () => {
    setModalContent(null);
    handleClose();
  };

  return (
    <Box css={styles.baseLayout}>
      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container item>
            <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
              <Typography css={styles.pageTitle}>ユーザー設定</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <List component={Card} sx={{ mb: 5, borderRadius: 3 }}>
              <ListItemButton
                onClick={() =>
                  handleOpenModal(
                    <LearningSettingsBoxForModal
                      dailyAim={fetchedLearningData.dailyAim}
                      closeModal={handleCloseModal}
                    />,
                  )
                }
              >
                <ListItemText
                  primary={
                    <Typography component="h3" css={listTextCss}>
                      学習設定
                    </Typography>
                  }
                />
              </ListItemButton>
            </List>
            <List component={Card} sx={{ mb: 5, borderRadius: 3 }}>
              <ListItemButton
                onClick={() =>
                  handleOpenModal(<UserSettingsBoxForModal closeModal={handleCloseModal} />)
                }
              >
                <ListItemText
                  primary={
                    <Typography component="h3" css={listTextCss}>
                      ユーザー情報変更
                    </Typography>
                  }
                />
              </ListItemButton>
              <Divider />
              <ListItemButton
                onClick={() =>
                  handleOpenModal(<PasswordSettingsBoxForModal closeModal={handleCloseModal} />)
                }
              >
                <ListItemText
                  primary={
                    <Typography component="h3" css={listTextCss}>
                      パスワード変更
                    </Typography>
                  }
                />
              </ListItemButton>
              <Divider />
              <ListItemButton disabled={true} onClick={() => handleOpenModal(<></>)}>
                <ListItemText
                  primary={
                    <Typography component="h3" css={listTextCss}>
                      アカウントの削除
                    </Typography>
                  }
                />
              </ListItemButton>
            </List>
            <Link href={'/user/sign_out'}>
              <Button css={styles.styledDangerButton} variant="contained" sx={{ width: '100%' }}>
                ログアウト
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <ModalCard title="" open={open} handleClose={handleCloseModal}>
        {modalContent}
      </ModalCard>
    </Box>
  );
};

export default Index;
