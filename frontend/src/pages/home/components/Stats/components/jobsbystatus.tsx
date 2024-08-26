import {useJobs} from '@services/firebase/hooks/useJobs';
import {JobByStatus, JobStatus, groupJobsByStatus} from '@utils/groupJobStatus';
import {PieChart} from '@mui/x-charts/PieChart';
import {useEffect, useState} from 'react';
import {PieValueType} from '@mui/x-charts';
import {MakeOptional} from '@mui/x-charts/models/helpers';
import jobStatus from '@repository/job.json';

const JobsByStatus = () => {
  const {jobs} = useJobs();
  const [data, setData] = useState<MakeOptional<PieValueType, 'id'>[]>([
    {
      value: 100,
      color: 'rgba(0, 0, 0, 0.1)',
    },
  ]);

  useEffect(() => {
    const alljobs: JobByStatus = groupJobsByStatus(jobs);
    const jobStatusStats = jobStatus.status.reduce(
      (acc, status) => {
        const value =
          alljobs && alljobs[status as JobStatus]
            ? alljobs[status as JobStatus].length
            : 0;
        if (value && value > 0) {
          acc.push({
            label: status,
            value: value || 0,
          });
        }
        return acc;
      },
      [] as MakeOptional<PieValueType, 'id'>[]
    );
    if (jobs.length === 0) {
      setData([
        {
          value: 100,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      ]);
      return;
    }
    setData(jobStatusStats);
  }, [jobs]);
  return (
    <PieChart
      colors={['#7B4B94', '#7D82B8', '#CA3CFF', '#C9E4E7', '#B4A0E5']} // Use palette
      height={190}
      tooltip={{trigger: jobs.length === 0 ? 'none' : 'item'}}
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
          cy: '50%',
        },
      ]}
      slotProps={{
        legend: {hidden: true},
      }}
    />
  );
};
export default JobsByStatus;
