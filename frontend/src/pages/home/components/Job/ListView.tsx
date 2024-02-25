import {Table, TableBody, TableContainer} from '@mui/material';
import JobList from './List';
import {Job} from 'src/@types';

type ListViewProps = {
  jobs: Job[];
};
const ListView = ({jobs}: ListViewProps) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {jobs.map((job) => (
            <JobList
              key={job.id!}
              jobID={job.id!}
              companyName={job.company}
              logoPath={`https://images.otta.com/search/width_200/${
                job.hiringorganization?.logo || ''
              }`}
              status={job.status || 'Saved'}
              jobTitle={job.title}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
