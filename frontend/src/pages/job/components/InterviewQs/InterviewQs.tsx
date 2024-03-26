import useFetchJobs from '@hooks/useFetchJobs';
import {Button, Grid, Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {getInterviewQuestions} from '@utils/openai';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import InterviewQ from 'src/@types/interviewQ';
import PageCircular from '@components/progress/PageCircular';

const InterviewQs = () => {
  const {id} = useParams();
  const {jobs} = useJobs();
  const userJob = jobs.find((job) => job.jobid === id);
  const [generateClicked, setGenerateClicked] = useState(false);
  const [iQs, setIQs] = useState<InterviewQ['questions']>();
  const {data} = useFetchJobs(userJob?.jobid || '');
  const [isInterviewQsLoading, setInterviewQsLoading] = useState(false);

  const handleGenerate = async () => {
    setGenerateClicked(true);
    setInterviewQsLoading(true);
    if (!data) return;
    const resp = await getInterviewQuestions(data[0]);
    if (resp.status === 'Success') {
      setIQs(resp.data.questions);
    }
    setInterviewQsLoading(false);
  };

  if (isInterviewQsLoading) {
    return <PageCircular sx={{height: '300px', width: '100%'}} />;
  }
  return (
    <>
      {generateClicked ? (
        <>
          <Grid
            container
            item
            direction="column"
            gap={2}
            justifyContent={'center'}
            p={2}
          >
            {iQs && (
              <>
                <Typography variant="h6">General Questions</Typography>
                {iQs.generalQuestions.map((q, index) => (
                  <Typography key={index} variant="body1">
                    {`${index + 1}. ${q}`}
                  </Typography>
                ))}
                <Typography variant="h6">Technical Questions</Typography>
                {iQs.technicalQuestions.map((q, index) => (
                  <Typography key={index} variant="body1">
                    {`${index + 1}. ${q}`}
                  </Typography>
                ))}
                <Typography variant="h6">Situational Questions</Typography>
                {iQs.situationalQuestions.map((q, index) => (
                  <Typography key={index} variant="body1">
                    {`${index + 1}. ${q}`}
                  </Typography>
                ))}
              </>
            )}
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
