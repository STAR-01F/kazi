import {List} from '@mui/material';
import JobList from './List';
import {Job} from 'src/@types';

type ListViewProps = {
  jobs: Job[];
};
const ListView = ({jobs}: ListViewProps) => {
  return (
    <List>
      {jobs.map((job) => (
        <JobList
          key={job.id!}
          jobID={job.id!}
          companyName={job.company}
          logoPath={`https://images.otta.com/search/width_200/${
            job.hiringorganization?.logo || ''
          }`}
          jobTitle={job.title}
        />
      ))}
    </List>
  );
};

export default ListView;
