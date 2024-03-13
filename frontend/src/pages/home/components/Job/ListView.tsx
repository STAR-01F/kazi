import {Table, TableBody, TableContainer} from '@mui/material';
import JobList from './List';
import {UserJob} from 'src/@types';
import {useSearchParams} from 'react-router-dom';

type ListViewProps = {
  jobs: UserJob[];
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
                key={job.id}
                jobID={job.jobid}
                userJobsId={job.id}
                companyName={job.company}
                logoPath={`https://images.otta.com/search/width_200/${
                  job.hiringOrganization?.logo || ''
                }`}
                status={job.status || 'Saved'}
                jobTitle={job.title}
                time={job.statusUpdates[job.status]}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
