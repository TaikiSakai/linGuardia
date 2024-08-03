import { css } from '@emotion/react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts';

const cardStyle = css({
  '@media (max-width: 600px)': {
    height: '100px',
  },
  borderRadius: '12px',
  width: '100%',
  height: '120px',
});

const cardTextStyle = css({
  component: 'h4',
  fontSize: '30px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '25px',
  },
  color: '#000060',
  textAlign: 'center',
});

const gaugeStyle = css({
  '@media (max-width: 600px)': {
    height: '80px',
    width: '120px',
  },
  borderRadius: '12px',
  height: '100px',
  width: '150px',
});

type DailyRecordData = {
  countsTodayLearned: number;
  ratio: number;
};

const DailyCounter = (props: DailyRecordData) => {
  let gaugeValue;

  if (props.ratio < 0) {
    gaugeValue = 0;
  } else {
    gaugeValue = props.ratio;
  }

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
            <Gauge css={gaugeStyle} value={gaugeValue} startAngle={-100} endAngle={100} />
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
                  <Typography css={cardTextStyle}>{props.countsTodayLearned + '語'}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography>{'前日比: ' + props.ratio + '%'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DailyCounter;
