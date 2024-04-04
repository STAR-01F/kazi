import {Chip, Typography, Grid, Button} from '@mui/material';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import {SkeletonChip} from '@components/skeleton';
import {useState} from 'react';
import {useFeedback} from '@hooks/useFeeback';
import getKeywords from '@utils/openai';
import {UpdateKeywords} from '@services/firebase/userJobs/Update';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {UserJob} from 'src/@types';

type KeywordsProps = {
  description: string;
  userJob?: UserJob;
};

const Keywords = ({description, userJob}: KeywordsProps) => {
  const {setFeedback} = useFeedback();
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);
  const {setJobs} = useJobs();

  const handleGenerate = async () => {
    if (!userJob) return;
    setIsKeywordsLoading(true);
    const resp = await getKeywords(description);
    if (resp.status === 'Success') {
      if (resp.data.keywords.split(',').length < 10) {
        setFeedback({
          type: 'error',
          message: 'Failed to generate keywords',
        });
        return;
      }
      // setKeywords(resp.data.keywords.split(','));
      setJobs((prevJobs) => {
        return prevJobs.map((job) => {
          if (job.id === userJob.id) {
            return {...job, keywords: resp.data.keywords.split(',')};
          }
          return job;
        });
      });

      const saveKeywords = await UpdateKeywords(
        userJob.id,
        resp.data.keywords.split(',')
      );

      if (saveKeywords.status === 'Success') {
        setFeedback({
          type: 'success',
          message: resp.message,
        });
      }
    }

    setIsKeywordsLoading(false);
  };
  if (isKeywordsLoading) {
    return (
      <>
        <Grid
          container
          item
          direction="row"
          gap={2}
          justifyContent={'center'}
          p={2}
        >
          {[30, 30, 30, 40, 40, 30, 30, 30, 50].map((size, index) => (
            <SkeletonChip key={index} size={size} />
          ))}
        </Grid>
      </>
    );
  }
  return (
    <>
      {userJob?.keywords ? (
        <Grid
          container
          item
          direction="row"
          gap={2}
          justifyContent={'center'}
          p={2}
        >
          {userJob?.keywords?.map((keyword, index) => {
            return (
              <Chip
                key={index}
                label={<Typography variant="h6">{keyword}</Typography>}
                sx={{padding: '1rem'}}
              />
            );
          })}
        </Grid>
      ) : (
        <>
          <Grid
            container
            item
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
          >
            <SavedSearchIcon sx={{fontSize: 80}} />
            <Typography mb={3} variant="subtitle1" fontWeight={'light'}>
              Generate personalised keywords to add to your CV
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

export default Keywords;
