import { css } from '@emotion/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Card, CardContent, Typography, Grid, TextField, Button, Stack } from '@mui/material';
import { useContext } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import ModalCard from './ModalCard';
import useModal from './ModalState';
import { AddInputContext, DeleteInputContext } from '@/pages/wordcards/create/[uuid]';
import { VocabularyData } from '@/types/VocabularyType';

const cardListCss = css({
  fontSize: 20,
  borderRadius: 12,
  maxHeight: 52,
  display: 'flex',
  alignItems: 'center',
  color: '#000040',
  justifyContent: 'center',
});

const InputDisplayBox = (props: VocabularyData) => {
  const addInputValue = useContext(AddInputContext);
  const deleteMyself = useContext(DeleteInputContext);

  const { handleSubmit, control, reset } = useForm<VocabularyData>();
  // 値を更新しないでmodalを閉じた場合は、入力値をリセットする
  const [open, handleOpen, handleClose] = useModal(reset);

  const onSubmit: SubmitHandler<VocabularyData> = (data, event) => {
    if (event) {
      event.preventDefault();
    }
    data['id'] = props.id;
    addInputValue(data);
  };

  return (
    <Grid container item xs={11} md={11} spacing={2}>
      <Grid item xs={5} md={5}>
        <Card css={cardListCss} onClick={handleOpen}>
          <CardContent>
            <Grid
              container
              item
              spacing={2}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item>
                <Typography component="h3">{props.word}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={5} md={5}>
        <Card css={cardListCss} onClick={handleOpen}>
          <CardContent>
            <Grid
              container
              item
              spacing={2}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item>
                <Typography component="h3">{props.meaning}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1} md={1}>
        <Box sx={{ color: 'gray', py: 1 }} onClick={() => deleteMyself(props.id)}>
          <DeleteForeverIcon />
        </Box>
      </Grid>
      <ModalCard title="単語編集" open={open} handleClose={handleClose}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <Controller
            name={'word'}
            defaultValue={props.word}
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
          <Controller
            name={'meaning'}
            defaultValue={props.meaning}
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
          <Button variant="contained" type="submit">
            変更
          </Button>
        </Stack>
      </ModalCard>
    </Grid>
  );
};

export default InputDisplayBox;
