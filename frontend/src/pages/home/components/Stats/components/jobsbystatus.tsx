import {useJobs} from '@services/firebase/hooks/useJobs';
import {JobByStatus, JobStatus, groupJobsByStatus} from '@utils/groupJobStatus';
import {PieChart} from '@mui/x-charts/PieChart';

const JobsByStatus = () => {
  const {jobs} = useJobs();

  const alljobs: JobByStatus = groupJobsByStatus(jobs);
  const getJobCount = (status: JobStatus) =>
    alljobs && alljobs[status] ? alljobs[status].length : 0;

  return (
    <PieChart
      height={190}
      series={[
        {
          data: [
            {label: 'Saved', value: getJobCount('Saved')},
            {label: 'Interview', value: getJobCount('Interview')},
            {label: 'Applied', value: getJobCount('Applied')},
            {label: 'Rejected', value: getJobCount('Rejected')},
          ],
          innerRadius: 30,
          outerRadius: 80,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
          faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
          highlightScope: {faded: 'global', highlighted: 'item'},
          cx: '70%',
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
