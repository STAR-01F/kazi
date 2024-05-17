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
          message: 'Interview questions generated',
        });
      }
      setInterviewQsLoading(false);
    } else {
      setFeedback({
        type: 'error',
        message: 'Cannot generate interview questions',
      });
      setInterviewQsLoading(false);
    }
  };

  if (isInterviewQsLoading) {
    return <PageCircular sx={{height: '300px', width: '100%'}} />;
  }

  return (
    <>
      {userJob && userJob.interviewQs ? (
        <>
          <Grid
            container
            item
            direction="column"
            gap={2}
            justifyContent={'center'}
            p={2}
          >
            <>
              <Typography variant="h6">General Questions</Typography>
              {userJob.interviewQs?.questions.generalQuestions.map(
                (q, index) => (
                  <Typography key={index} variant="body1">
                    {`${index + 1}. ${q}`}
                  </Typography>
                )
              )}
              <Typography variant="h6">Technical Questions</Typography>
              {userJob.interviewQs?.questions.technicalQuestions?.map(
                (q, index) => (
                  <Typography key={index} variant="body1">
                    {`${index + 1}. ${q}`}
                  </Typography>
                )
              )}
              <Typography variant="h6">Situational Questions</Typography>
              {userJob.interviewQs?.questions.situationalQuestions?.map(
                (q, index) => (
                  <Typography key={index} variant="body1">
                    {`${index + 1}. ${q}`}
                  </Typography>
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
