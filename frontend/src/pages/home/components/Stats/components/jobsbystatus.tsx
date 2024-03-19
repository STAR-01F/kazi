import {useJobs} from '@services/firebase/hooks/useJobs';
import {JobByStatus, JobStatus, groupJobsByStatus} from '@utils/groupJobStatus';
import {PieChart} from '@mui/x-charts/PieChart';
import {useEffect, useState} from 'react';
import {PieValueType} from '@mui/x-charts';
import {MakeOptional} from '@mui/x-charts/models/helpers';
import jobStatus from '@repository/job.json';
import {TriggerOptions} from '@mui/x-charts/ChartsTooltip/utils';

const JobsByStatus = () => {
  const {jobs} = useJobs();
  const [data, setData] = useState([{}]);
  const [trigger, setTrigger] = useState<TriggerOptions | undefined>('item');
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
    if (jobStatusStats.length === 0) {
      jobStatusStats.push({value: 100, color: 'rgba(0, 0, 0, 0.1)'});
      setTrigger('none');
    }
    setData(jobStatusStats);
  }, [jobs]);
  return (
    <PieChart
      colors={['#180573', '#731805', '#607305']} // Use palette
      height={190}
      tooltip={{trigger}}
      series={[
        {
          data: data as MakeOptional<PieValueType, 'id'>[],
          innerRadius: 30,
          outerRadius: 80,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
          faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
          highlightScope: {faded: 'global', highlighted: 'item'},
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
