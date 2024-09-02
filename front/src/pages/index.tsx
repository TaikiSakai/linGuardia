import { css } from '@emotion/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Stack,
} from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import ConjugationGenerator from '@/components/ConjugationGenerator';
import { useUserState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';
import { fetcher } from '@/utils';

const titletStyle = css({
  omponent: 'h1',
  fontSize: '100px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '50px',
  },
  color: '#000060',
});

const subTitletStyle = css({
  omponent: 'h2',
  fontSize: '25px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const translatedTitleStyle = css({
  omponent: 'h2',
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#000060',
});

const textStyle = css({
  component: 'p',
  fontSize: '15px',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const tableTextStyle = css({
  component: 'p',
  fontSize: '15px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const Index: NextPage = () => {
  const [user] = useUserState();
  const url = process.env.NEXT_PUBLIC_API_URL + '/health_check';
  const { data, error } = useSWR(url, fetcher);

  console.log(user);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box css={styles.baseLayout}>
      <Container maxWidth="lg">
        <Box>
          <Grid container sx={{ justifyContent: 'center', textAlign: 'center', pt: 2 }}>
            <Grid item>
              <Stack direction="column" spacing={2}>
                <Box>
                  <Typography css={titletStyle}>linGuardia</Typography>
                </Box>
                <Box>
                  <Typography css={subTitletStyle}>スペイン語を効率よく学ぶための単語帳</Typography>
                  <Typography css={subTitletStyle}>
                    ¡Aprende conjugación de verbos más rápido!
                  </Typography>
                </Box>
                {!user.isSignedIn ? (
                  <Box>
                    <Link href={'/user/sign_in'}>
                      <Button
                        css={styles.styledButton}
                        variant="contained"
                        sx={{ mx: 1, textTransform: 'None' }}
                      >
                        Iniciar Sessión
                      </Button>
                    </Link>
                    <Link href={'/user/sign_up'}>
                      <Button
                        css={styles.styledButton}
                        variant="contained"
                        sx={{ mx: 1, textTransform: 'None' }}
                      >
                        Regístrate aquí
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Box>
                    <Link href={'/dashboard'}>
                      <Button
                        css={styles.styledButton}
                        variant="contained"
                        sx={{ mx: 1, textTransform: 'None' }}
                      >
                        ¡Empecemos aquí!
                      </Button>
                    </Link>
                  </Box>
                )}
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ pt: 5 }}>
                <Card sx={{ width: 370, height: 700, borderRadius: 3 }}>
                  <CardContent>
                    <Stack direction="column" spacing={2} sx={{ pt: 1 }}>
                      <Box>
                        <Typography css={subTitletStyle}>単語カード</Typography>
                        <Typography css={translatedTitleStyle}>Tarjetas de Vocabulario</Typography>
                      </Box>
                      <Box>
                        <Typography css={textStyle}>
                          覚えたい単語を登録して、自分だけの単語帳を作りましょう!
                          作成した単語帳は他のユーザーに公開することができます。
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Image
                          src="/preview/flashcard_image.jpg"
                          width={250}
                          height={480}
                          alt="topImage"
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ width: 370, height: 700, borderRadius: 3 }}>
                  <CardContent>
                    <Stack direction="column" spacing={2} sx={{ pt: 1 }}>
                      <Box>
                        <Typography css={subTitletStyle}>AIで作る活用系</Typography>
                        <Typography css={translatedTitleStyle}>
                          Generador de Conjugación de Verbos por IA
                        </Typography>
                      </Box>
                      <Box>
                        <Typography css={textStyle}>
                          スペイン語学習最大の難所といえば、動詞の活用ではないでしょうか?
                          linGuardiaではAIを用いて さまざまな活用形を生成することができます。
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Image
                          src="/preview/conjugation_image.jpg"
                          width={250}
                          height={480}
                          alt="topImage"
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ width: 370, height: 700, borderRadius: 3 }}>
                  <CardContent>
                    <Stack direction="column" spacing={2} sx={{ pt: 1 }}>
                      <Box>
                        <Typography css={subTitletStyle}>学習記録</Typography>
                        <Typography css={translatedTitleStyle}>Registros de Aprendizaje</Typography>
                      </Box>
                      <Box>
                        <Typography css={textStyle}>
                          学習が完了すると、自動で記録が保存されます。
                          1週間分の学習をみえる化することができます。
                          学習目標を設定して、学習を習慣化しましょう!
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Image
                          src="/preview/top_image.jpg"
                          width={250}
                          height={480}
                          alt="topImage"
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
              <Stack direction="column" spacing={2} sx={{ pt: 5 }}>
                <Box>
                  <Typography css={subTitletStyle}>動詞の活用形について</Typography>
                </Box>
                <Box>
                  <Card
                    sx={{
                      borderRadius: 3,
                      '@media (max-width: 600px)': {
                        maxWidth: 370,
                      },
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
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
                          <Typography css={textStyle}>
                            スペイン語には動詞の活用形がたくさんあります。
                            英語では3人称単数系の語尾に(s)をつけますよね。
                            しかしスペイン語の場合は、主語によって動詞の語形を変化させる必要があり、
                            不規則変化が多いので、初心者には負担になります。
                          </Typography>
                        </Box>
                        <Box>
                          <Typography css={textStyle}>
                            ※下記の表は英語のgiveに相当する単語の活用形の一例です
                          </Typography>
                        </Box>
                        <Box sx={{ overflow: 'auto', width: '100%' }}>
                          <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell css={tableTextStyle} align="left">
                                    主語
                                  </TableCell>
                                  <TableCell css={tableTextStyle} align="left">
                                    直説法現在形
                                  </TableCell>
                                  <TableCell css={tableTextStyle} align="left">
                                    直説法点過去形
                                  </TableCell>
                                  <TableCell css={tableTextStyle} align="left">
                                    直説線過去形
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell css={tableTextStyle}>yo(私)</TableCell>
                                  <TableCell css={tableTextStyle}>doy</TableCell>
                                  <TableCell css={tableTextStyle}>di</TableCell>
                                  <TableCell css={tableTextStyle}>daba</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell css={tableTextStyle}>tú(君)</TableCell>
                                  <TableCell css={tableTextStyle}>das</TableCell>
                                  <TableCell css={tableTextStyle}>diste</TableCell>
                                  <TableCell css={tableTextStyle}>dabas</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell css={tableTextStyle}>él, ella(彼、彼女)</TableCell>
                                  <TableCell css={tableTextStyle}>da</TableCell>
                                  <TableCell css={tableTextStyle}>dio</TableCell>
                                  <TableCell css={tableTextStyle}>daba</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell css={tableTextStyle}>nosotros(私たち)</TableCell>
                                  <TableCell css={tableTextStyle}>damos</TableCell>
                                  <TableCell css={tableTextStyle}>dimos</TableCell>
                                  <TableCell css={tableTextStyle}>dábamos</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell css={tableTextStyle}>vosotros(君たち)</TableCell>
                                  <TableCell css={tableTextStyle}>dais</TableCell>
                                  <TableCell css={tableTextStyle}>daisteis</TableCell>
                                  <TableCell css={tableTextStyle}>dabais</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell css={tableTextStyle}>
                                    ellos(as)(彼ら、彼女ら)
                                  </TableCell>
                                  <TableCell css={tableTextStyle}>dan</TableCell>
                                  <TableCell css={tableTextStyle}>dieron</TableCell>
                                  <TableCell css={tableTextStyle}>daban</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                        <Typography css={textStyle}>
                          linGuardiaの自動生成機能で、様々な活用形を効率よく学びましょう!
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </Stack>
              <Stack direction="column" spacing={2} sx={{ pt: 5 }}>
                <Box>
                  <Typography css={subTitletStyle}>AIで活用形を生成してみよう!(デモ)</Typography>
                </Box>
                <Box>
                  <ConjugationGenerator />
                </Box>
              </Stack>
              <Stack direction="column" spacing={2} sx={{ pt: 10 }}>
                <Box>
                  <Link href={'/term_of_use'}>
                    <Typography sx={{ color: '#000060' }}>Términos y Condiciones de Uso</Typography>
                  </Link>
                  <Link href={'/privacy_policy'}>
                    <Typography sx={{ color: '#000060' }}>Política de Privacidad</Typography>
                  </Link>
                  <Link href={'https://forms.gle/3NckAAHvVdJjzfzw5'}>
                    <Typography sx={{ color: '#000060' }}>Contacto</Typography>
                  </Link>
                </Box>
                <Box>
                  <Link href={'https://github.com/TaikiSakai'}>
                    <GitHubIcon sx={{ color: '#000060', mr: 2 }} />
                  </Link>
                  <Link href={'#'}>
                    <XIcon sx={{ color: '#000060' }} />
                  </Link>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
