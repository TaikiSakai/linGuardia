import { css } from '@emotion/react';
import { Box, Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import { useContext } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import EditModal from './EditModal';
import useModal from './ModalState';
import { AddInputContext, DeleteInputContext } from '@/pages/wordcards/create/test';
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

const InputDisplayBoxTest = (props: VocabularyData) => {
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
    <Grid container item xs={10} md={10} spacing={2}>
      <Grid item xs={6} md={6}>
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
      <Grid item xs={6} md={6}>
        <Card css={cardListCss} onClick={handleOpen}>
          <CardContent>
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              xs={12}
              md={12}
            >
              <Grid item xs={6} md={6}>
                <Typography component="h3">{props.meaning}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Button onClick={() => deleteMyself(props.id)}>delete</Button>
      </Grid>
      <EditModal title="単語新規登録" open={open} handleClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit">submit</Button>
        </Box>
      </EditModal>
    </Grid>
  );
};

export default InputDisplayBoxTest;
