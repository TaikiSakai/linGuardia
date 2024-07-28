import { css } from '@emotion/react';
import { Card, CardContent } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { StudyRecordData } from '@/types/StudyRecordType';

const chartStyle = css({
  '@media (max-width: 600px)': {
    margin: '10px',
  },
});

const cardStyle = css({
  '@media (max-width: 600px)': {
    maxHeight: '180px',
  },
  borderRadius: '12px',
  alignItems: 'center',
  justifyContent: 'center',
});

type chartData = {
  data: number[];
  label: string;
  stack: string;
}[];

const StudyRecordChart = (props: StudyRecordData) => {
  const data: chartData = [];

  props.records.map((rec) => {
    data.push({ data: rec.wordCounts, label: rec.title, stack: 'A' });
  });

  console.log(data);

  return (
    <Card css={cardStyle}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <BarChart
          css={chartStyle}
          series={data}
          xAxis={[{ scaleType: 'band', data: props.dateList }]}
          width={550}
          height={180}
          borderRadius={10}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: -5,
              hidden: false,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default StudyRecordChart;
