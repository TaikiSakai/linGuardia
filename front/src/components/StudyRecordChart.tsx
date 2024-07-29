import { css } from '@emotion/react';
import { Card } from '@mui/material';
import { BarPlot, ChartsXAxis, ChartsLegend, ChartsYAxis, BarSeriesType } from '@mui/x-charts';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { StudyRecordData } from '@/types/StudyRecordType';

const cardStyle = css({
  '@media (max-width: 600px)': {
    height: '150px',
  },
  borderRadius: '12px',
  width: '100%',
  height: '180px',
});

const StudyRecordChart = (props: StudyRecordData) => {
  type ChartData = BarSeriesType[];
  const data: ChartData = props.records.map((rec) => ({
    type: 'bar',
    data: rec.wordCounts,
    label: rec.title,
    stack: 'A',
  }));

  console.log(data);

  return (
    <Card css={cardStyle}>
      <ResponsiveChartContainer
        series={data}
        xAxis={[
          {
            data: props.dateList,
            scaleType: 'band',
            id: 'x-axis-id',
          },
        ]}
        yAxis={[{ id: 'x-axis-id', scaleType: 'linear' }]}
        margin={{ top: 40, bottom: 40, left: 40, right: 15 }}
      >
        <BarPlot borderRadius={10} />
        <ChartsXAxis position="bottom" axisId="x-axis-id" />
        <ChartsYAxis position="left" axisId="x-axis-id" />
        <ChartsLegend
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: -5,
              hidden: true,
            },
          }}
        />
      </ResponsiveChartContainer>
    </Card>
  );
};

export default StudyRecordChart;
