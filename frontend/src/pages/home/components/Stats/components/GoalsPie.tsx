import {PieValueType} from '@mui/x-charts';
import {PieChart} from '@mui/x-charts/PieChart';
import {MakeOptional} from '@mui/x-charts/models/helpers';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {useEffect, useState} from 'react';

const GoalsPie = () => {
  const {jobs} = useJobs();

  const lengthJobsThatYouApplied = jobs.filter(
    (job) =>
      job.status === 'Applied' ||
      job.status === 'Interview' ||
      job.status === 'Rejected' ||
      job.status === 'Offer'
  ).length;
  const [data, setData] = useState<MakeOptional<PieValueType, 'id'>[]>([
    {
      value: 100,
      color: 'rgba(0, 0, 0, 0.1)',
    },
  ]);

  // TODO: Replace with actual goal value
  const defaultValue = 10;

  useEffect(() => {
    if (lengthJobsThatYouApplied === 0) {
      setData([
        {
          value: 100,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      ]);
    } else if (lengthJobsThatYouApplied >= defaultValue) {
      setData([
        {
          value: 100,
        },
      ]);
    } else {
      setData([
        {
          label: 'Applied',
          value: lengthJobsThatYouApplied || 0,
        },
        {
          label: 'Applications left',
          value: defaultValue - lengthJobsThatYouApplied,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      ]);
    }
  }, [lengthJobsThatYouApplied]);

  return (
    <PieChart
      colors={['#7B4B94', '#7D82B8', '#CA3CFF', '#C9E4E7', '#B4A0E5']} // Use palette
      height={190}
      width={160}
      tooltip={{trigger: lengthJobsThatYouApplied === 0 ? 'none' : 'item'}}
      series={[
        {
          data: data as MakeOptional<PieValueType, 'id'>[],
          innerRadius: 30,
          outerRadius: 80,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
          highlightScope: {faded: 'global', highlighted: 'item'},
          faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
          cx: '137%',
          // cy: '50%',
        },
      ]}
      slotProps={{
        legend: {hidden: true},
      }}
    ></PieChart>
  );
};

export default GoalsPie;
