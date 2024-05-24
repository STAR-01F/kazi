import useFetchJobs from '@hooks/useFetchJobs';
import {Button, Grid, Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {getInterviewQuestions} from '@utils/openai';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import PageCircular from '@components/progress/PageCircular';
import SaveIQs from '@services/firebase/userJobs/SaveIQs';
import {useFeedback} from '@hooks/useFeeback';
import {IQCards} from './IQCards';

const InterviewQs = () => {
  const {id} = useParams();
  const {jobs, setJobs} = useJobs();
  const userJob = jobs.find((job) => job.jobid === id);
  const {data} = useFetchJobs(userJob?.jobid || '');
  const {setFeedback} = useFeedback();

  const [isInterviewQsLoading, setInterviewQsLoading] = useState(false);

  const handleGenerate = async () => {
    setInterviewQsLoading(true);
    if (!data) return;
    if (!userJob) return;

    const resp = await getInterviewQuestions(data[0]);
    if (resp.status === 'Success') {
      const saveIQResp = await SaveIQs(userJob.id, resp.data);

      if (saveIQResp.status === 'Error') {
        setFeedback({
          type: 'error',
          message: saveIQResp.message,
        });
      } else {
        setJobs((prevJobs) => {
          return prevJobs.map((job) => {
            if (job.id === userJob.id) {
              return {...job, interviewQs: resp.data};
            }
            return job;
          });
        });
        setFeedback({
          type: 'success',
          message: resp.message,
        });
      }
      setInterviewQsLoading(false);
    } else {
      setFeedback({
        type: 'error',
        message: resp.message,
      });
      setInterviewQsLoading(false);
    }
  };

  if (isInterviewQsLoading) {
    return <PageCircular sx={{height: '300px', width: '100%'}} />;
  }

  return (
    <>
      {userJob && userJob.interviewQs?.questions ? (
        <>
          <Grid
            container
            item
            direction="column"
            gap={0}
            justifyContent={'center'}
            p={2}
          >
            <>
              {Object.entries(userJob.interviewQs?.questions).map(
                (q, index) => (
                  <IQCards key={index} content={q[1]} title={q[0]} />
                )
              )}
            </>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            container
            item
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
          >
            <QuizIcon sx={{fontSize: 80}} />
            <Typography mb={3} variant="subtitle1" fontWeight={'light'}>
              Generate practice interview questions for this job
            </Typography>
            <Button onClick={handleGenerate} variant="contained" size="small">
              Generate
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};

export default InterviewQs;
