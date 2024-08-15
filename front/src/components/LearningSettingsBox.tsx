import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography, TextField, IconButton } from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type LearningData = {
  dailyAim: number;
  closeModal: () => void;
};

const LearningSettingsBoxForModal = (props: LearningData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentWordCount, setWordCount] = useState<number>(props.dailyAim);
  const [, setSnackbar] = useSnackbarState();

  const handleClose = props.closeModal;

  const countUp = () => {
    setWordCount(currentWordCount + 1);
  };

  const countDown = () => {
    setWordCount(currentWordCount - 1);
  };

  const handleWordCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setWordCount(value);
  };

  const onSubmit = async () => {
    const newDailyAim = JSON.stringify({ dailyAim: currentWordCount });
    const headers = { 'Content-Type': 'application/json' };
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth';

    try {
      const res: AxiosResponse = await axios({
        method: 'PATCH',
        url: url,
        data: newDailyAim,
        headers: headers,
        withCredentials: true,
      });
      console.log(res);
      setSnackbar({
        message: '学習目標を更新しました',
        severity: 'success',
        pathname: '/user/profile',
      });
      handleClose();
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
        setSnackbar({
          message: e.response?.data.errors.full_messages,
          severity: 'error',
          pathname: '/user/profile',
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <Stack direction="column" spacing={2} sx={{ px: 1 }}>
      <Typography component="h3" css={styles.modalTitle}>
        学習設定
      </Typography>
      <Typography css={styles.modalSubTitle}>毎日の学習目標を設定しましょう!</Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ pr: 5 }}>
          <IconButton
            onClick={countDown}
            disabled={currentWordCount === 0}
            sx={{
              p: 1,
              backgroundColor: '#000060',
              '&:hover': {
                backgroundColor: '#000040', // ホバー時の色
              },
            }}
          >
            <RemoveIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        <TextField
          type="number"
          size="small"
          variant="standard"
          onChange={handleWordCountChange}
          value={currentWordCount}
          sx={{ backgroundColor: 'white' }}
          InputProps={{
            sx: {
              textAlign: 'center',
              fontSize: 40,
              fontWeight: 'bold',
              color: '#000060',
            },
          }}
        />
        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: '#000060', pl: 1 }}>
          語
        </Typography>
        <Box sx={{ pl: 5 }}>
          <IconButton
            onClick={countUp}
            sx={{
              p: 1,
              backgroundColor: '#000060',
              '&:hover': {
                backgroundColor: '#000040', // ホバー時の色
              },
            }}
          >
            <AddIcon
              sx={{
                color: 'white',
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <LoadingButton
        css={styles.styledButton}
        type="button"
        onClick={onSubmit}
        variant="contained"
        loading={isLoading}
        sx={{ width: '100%' }}
      >
        変更
      </LoadingButton>
    </Stack>
  );
};

export default LearningSettingsBoxForModal;
