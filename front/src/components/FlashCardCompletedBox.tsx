import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, Stack, Typography } from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { styles } from '@/styles';

type NewStudyRecordData = {
  wordCount: number;
};

const FlashcardFinishedBoxForModal = (props: NewStudyRecordData & { closeModal: () => void }) => {
  const router = useRouter();
  const { uuid } = router.query;
  const closeModal = props.closeModal;

  const onSubmit = async (data: NewStudyRecordData) => {
    const newStudyRecord = JSON.stringify({ newStudyRecord: data });
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
    const headers = { 'Content-Type': 'application/json' };

    console.log(newStudyRecord);

    try {
      const res: AxiosResponse = await axios({
        method: 'POST',
        url: url + uuid + '/study_records',
        headers: headers,
        data: newStudyRecord,
        withCredentials: true,
      });
      console.log(res);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
      }
    }
    closeModal();
    router.back();
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ px: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography component="h3" css={styles.modalTitle}>
        終了しました
      </Typography>
      <Button variant="text" sx={{ width: 120, height: 20 }} onClick={closeModal}>
        <Typography component="h3" css={styles.modalText}>
          <RefreshIcon />
          最初に戻る
        </Typography>
      </Button>
      <Button
        css={styles.styledButton}
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => onSubmit(props)}
      >
        終了
      </Button>
    </Stack>
  );
};

export default FlashcardFinishedBoxForModal;
