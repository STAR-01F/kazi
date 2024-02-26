import {Table, TableBody, TableContainer} from '@mui/material';
import JobList from './List';
import {Job} from 'src/@types';
import {useSearchParams} from 'react-router-dom';

type ListViewProps = {
  jobs: Job[];
};
const ListView = ({jobs}: ListViewProps) => {
  const [searchParam] = useSearchParams();
  const searchStatus = searchParam.get('status');

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {jobs
            .filter(
              (job) =>
                searchStatus === 'all' ||
                searchStatus === null ||
                job.status?.toLowerCase() === searchStatus?.toLowerCase()
            )
            .map((job) => (
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
