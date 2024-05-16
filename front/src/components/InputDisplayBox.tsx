import { css } from '@emotion/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Card, CardContent, Typography, Grid, TextField, Button, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import ModalCard from './ModalCard';
import useModal from '@/hooks/ModalState';
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

type DisplayBoxType = VocabularyData & {
  addValue: (newValue: VocabularyData) => void;
  deleteValue: (valueId: number) => void;
};

const InputDisplayBox = (props: DisplayBoxType) => {
  // const addInputValue = useContext(AddInputContext);
  // const deleteMyself = useContext(DeleteInputContext);
  const addInputValue = props.addValue;
  const deleteMyself = props.deleteValue;

  const { handleSubmit, control, reset } = useForm<VocabularyData>();
  // 値を更新しないでmodalを閉じた場合は、入力値をリセットする
  const [open, handleOpen, handleClose] = useModal(reset);

  const onSubmit = (data: VocabularyData) => {
    data['id'] = props.id;
    addInputValue(data);
    handleClose();
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
          <Controller
            name={'roles'}
            defaultValue={props.roles || []}
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                limitTags={3}
                // valueの初期値はundefinedになるので、uncontrolledコンポーネントになる
                // これを書き換えようとするとエラーになる
                value={field.value === undefined ? [] : field.value}
                options={['動詞', '名詞', '形容詞', '副詞']}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => <TextField type="text" {...params} label="品詞" />}
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
