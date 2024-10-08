import { css } from '@emotion/react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  GaugeValueText,
} from '@mui/x-charts/Gauge';

const cardStyle = css({
  '@media (max-width: 600px)': {
    height: '100px',
  },
  borderRadius: '12px',
  width: '100%',
  height: '120px',
});

const cardTitleStyle = css({
  component: 'h4',
  fontSize: '30px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '25px',
  },
  color: '#000060',
  textAlign: 'center',
});

const cardSubTextStyle = css({
  component: 'h4',
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#000060',
  textAlign: 'center',
});

const gaugeStyle = css({
  '@media (max-width: 600px)': {
    fontSize: '20px',
    height: '90px',
    width: '120px',
  },
  fontSize: '25px',
  color: '#000060',
  borderRadius: '12px',
  height: '110px',
  width: '150px',
});

type DailyRecordData = {
  countsTodayLearned: number;
  achievementRate: number;
};

const DailyCounter = (props: DailyRecordData) => {
  return (
    <Card css={cardStyle}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          pt: 3,
        }}
      >
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid
            item
            xs={5}
            md={5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            <GaugeContainer
              css={gaugeStyle}
              value={props.achievementRate}
              startAngle={-100}
              endAngle={100}
              valueMax={100}
              valueMin={0}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugeValueText
                text={String(props.achievementRate) + '%'}
                style={{ fill: '#000060', textAnchor: 'middle' }}
              />
            </GaugeContainer>
          </Grid>
          <Grid
            item
            xs={7}
            md={7}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid item>
              <Grid
                container
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Grid>
                  <Typography css={cardTitleStyle}>{props.countsTodayLearned + '語'}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography css={cardSubTextStyle} sx={{ pt: 1 }}>
                  {'学習達成率: ' + props.achievementRate + '%'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DailyCounter;
