import {PieValueType} from '@mui/x-charts';
import {PieChart} from '@mui/x-charts/PieChart';
import {MakeOptional} from '@mui/x-charts/models/helpers';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {useEffect, useState} from 'react';

const Goal = () => {
  const {jobs} = useJobs();
  const lengthJobsThatYouApplied = jobs.filter(
    (job) => job.status === 'Applied' || job.status === 'Interviewing'
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
          value: lengthJobsThatYouApplied || 0,
        },
        {
          value: defaultValue - lengthJobsThatYouApplied,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      ]);
    }
  }, [lengthJobsThatYouApplied]);

  return (
    <PieChart
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
          // endAngle: (percentage / 100) * 360,
          cx: '137%',
          // cy: '50%',
        },
      ]}
    ></PieChart>
  );
};

export default Goal;
