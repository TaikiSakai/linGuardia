import { css } from '@emotion/react';
import { Card } from '@mui/material';
import { BarPlot, ChartsXAxis, ChartsLegend, ChartsYAxis, BarSeriesType } from '@mui/x-charts';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { styles } from '@/styles';
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

  const colors: string[] = styles.colorPalette;

  const data: ChartData = props.records.map((rec, idx) => ({
    type: 'bar',
    data: rec.wordCounts,
    label: rec.title,
    stack: 'A',
    color: colors[idx % colors.length],
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
        margin={{ top: 30, bottom: 40, left: 45, right: 20 }}
      >
        <BarPlot borderRadius={20} />
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
        <ChartsTooltip />
      </ResponsiveChartContainer>
    </Card>
  );
};

export default StudyRecordChart;
