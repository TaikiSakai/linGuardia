import { css } from '@emotion/react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { styles } from '@/styles';

const textStyle = css({
  component: 'p',
  fontSize: '15px',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const tableTextStyle = css({
  fontSize: '15px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const ConjugationGenerator = () => {
  type ConjugationData = {
    [key: string]: string[];
  };

  type VerbDictionaryData = {
    infinitives: string[];
    conjugations: ConjugationData;
  };

  const verbList: VerbDictionaryData = {
    infinitives: ['saber', 'comprobar', 'tener', 'ir', 'leer'],
    conjugations: {
      saber: ['sé', 'sabe', 'sepa', 'supe', 'sabemos'],
      comprobar: ['compruebo', 'comproba', 'comprobaron', 'comprobasteis', 'compruebe'],
      tener: ['tengo', 'tenía', 'tuve', 'tuvieron', 'tuvimos'],
      ir: ['voy', 'va', 'vaya', 'vamos', 'fui', 'iré'],
      leer: ['leo', 'leyo', 'leísteis', 'leyo', 'leí'],
    },
  };

  const [conjugations, setConjugations] = useState<ConjugationData>({});

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const newConjugationsHandler = () => {
    const newConjugations: ConjugationData = {};

    verbList.infinitives.map((infinitive: string) => {
      const index = randomNumber(0, 4);
      newConjugations[infinitive] = [verbList.conjugations[infinitive][index]];
    });
    setConjugations({ ...newConjugations });
    console.log(conjugations);
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'center', px: 2 }}
        >
          <Box
            sx={{
              p: 2,
              mx: { xs: 2, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography css={textStyle}>linGuardiaでは、動詞として登録された単語を自動で抽出し、</Typography>
            <Typography css={textStyle}>活用形を生成することができます</Typography>
            <Button
              css={styles.styledButton}
              variant="contained"
              onClick={newConjugationsHandler}
              sx={{ mt: 2 }}
            >
              生成!
            </Button>
          </Box>
          <Box>
            <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
              <Table sx={{ width: { xs: 300, md: 500 } }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography css={tableTextStyle} align="left">
                        活用前
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography css={tableTextStyle} align="left">
                        活用後
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {verbList.infinitives.map((infinity: string, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell css={tableTextStyle} align="left">
                        {infinity}
                      </TableCell>
                      <TableCell css={tableTextStyle} align="left">
                        {conjugations[infinity]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ConjugationGenerator;
