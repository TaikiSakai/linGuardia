import { Box, Button, Container, Grid, TextField } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import useSWR from 'swr';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';
import { useState } from 'react';

const AddVocabPage: NextPage = () => {
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();
  const { uuid } = router.query;

  
  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container item spacing={2} xs={10} md={10}>
            <Grid item xs={6} md={6}>
              
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddVocabPage;