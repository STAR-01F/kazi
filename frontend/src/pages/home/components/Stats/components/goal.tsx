import {PieChart} from '@mui/x-charts';
import {useJobs} from '@services/firebase/hooks/useJobs';

const Goal = () => {
  const {jobs} = useJobs();
  const lengthJobsThatYouApplied = jobs.filter(
    (job) => job.status === 'Applied' || job.status === 'Interviewing'
  ).length;
  // TODO: Replace with actual goal value
  const defaultValue = 10;

  const percentage =
    ((lengthJobsThatYouApplied > defaultValue
      ? defaultValue
      : lengthJobsThatYouApplied) /
      defaultValue) *
    100;
  console.log('percentage', percentage);
  return (
    <PieChart
      height={200}
      series={[
        {
          data: [
            {
              value: lengthJobsThatYouApplied,
            },
          ],
          innerRadius: 30,
          outerRadius: 80,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: (percentage / 100) * 360,
        },
      ]}
    ></PieChart>
  );
};

export default Goal;
