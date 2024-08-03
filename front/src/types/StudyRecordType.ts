export type StudyRecordData = {
  records: {
    title: string;
    wordCounts: number[];
  }[];
  dateList: string[];
  countsTodayLearned: number;
  ratio: number;
};
