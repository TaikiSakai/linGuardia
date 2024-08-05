import { Box, Container, Typography, Grid } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import useSWR from 'swr';
import DailyCounter from '@/components/DailyCounter';
import RankedCard from '@/components/RankedCard';
import StudyRecordChart from '@/components/StudyRecordChart';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { AuthorData } from '@/types/AuthorType';
import { LikeData } from '@/types/LikeType';
import { StudyRecordData } from '@/types/StudyRecordType';
import { WordcardData } from '@/types/WordcardType';
import { fetcher } from '@/utils';

type WordcardDetail = {
  card: WordcardData;
  user: AuthorData;
  like: LikeData;
};

type RecordsSummary = {
  records: StudyRecordData[];
  dateList: string[];
  countsTodayLearned: number;
  ratio: number;
};

const Index: NextPage = () => {
  useRequireSignedIn();

  const url = process.env.NEXT_PUBLIC_API_URL;
  const { data: cards, error: cardFetchError } = useSWR(url + '/wordcard/ranked_cards', fetcher);
  const { data: studyRecs, error: studyRecFetchError } = useSWR(
    url + '/wordcard/study_records',
    fetcher,
  );

  if (cardFetchError || studyRecFetchError) return <div>An error has occurred.</div>;
  if (!cards || !studyRecs) return <div>Loading...</div>;

  const fetchedRankings: WordcardDetail[] = cards
    ? cards.map((cardData: WordcardDetail) => camelcaseKeys(cardData, { deep: true }))
    : null;

  const fetchedStudyRecs: RecordsSummary = studyRecs
    ? camelcaseKeys(studyRecs, { deep: true })
    : null;

  console.log(fetchedStudyRecs);

  return (
    fetchedRankings && (
      <Box css={styles.baseLayout}>
        <Container maxWidth="md">
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={2}
          >
            <Grid container item>
              <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                <Typography css={styles.pageTitle}>DashBoard</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 1, justifyContent: 'left', textAlign: 'left' }}>
                <Typography css={styles.subTitle}>今週の学習実績</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <StudyRecordChart
                  records={fetchedStudyRecs.records}
                  dateList={fetchedStudyRecs.dateList}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 1, justifyContent: 'left', textAlign: 'left' }}>
                <Typography css={styles.subTitle}>今日の実績</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <DailyCounter
                  countsTodayLearned={fetchedStudyRecs.countsTodayLearned}
                  ratio={fetchedStudyRecs.ratio}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 1, justifyContent: 'left', textAlign: 'left' }}>
                <Typography css={styles.subTitle}>トレンド</Typography>
              </Box>
              {fetchedRankings.map((card: WordcardDetail, i: number) => (
                <Box sx={{ mb: 2 }} key={i}>
                  <RankedCard
                    uuid={card.card.uuid}
                    title={card.card.title}
                    userName={card.user.userName}
                    like={card.like.like}
                    numberOfLikes={card.like.numberOfLikes}
                  />
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  );
};

export default Index;
