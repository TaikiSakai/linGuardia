import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { WordcardData } from '@/types/WordcardType';

const Wordcard = (props: WordcardData) => {
  const router = useRouter();
  const openWordcard = () => {
    router.push('wordcards/' + props.uuid);
  };

  return (
    <Box>
      <Box onClick={openWordcard}>
        <Card sx={{ borderRadius: 3, height: 100 }}>
          <CardContent>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={6} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component="h3"
                    sx={{
                      mb: 3,
                      minHeight: 50,
                      fontSize: 20,
                      color: '#000040',
                      fontWeight: 'bold',
                      lineHeight: 1.5,
                    }}
                  >
                    {props.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 12 }}>作成日: {props.createdAt}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Wordcard;
