import {Chip, Typography, Grid, Button} from '@mui/material';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import {SkeletonChip} from '@components/skeleton';
import {useState} from 'react';
import getKeywords from '@utils/openai';

type KeywordsProps = {
  description: string;
};

const Keywords = ({description}: KeywordsProps) => {
  const [generateClicked, setGenerateClicked] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);

  const handleGenerate = async () => {
    setGenerateClicked(true);
    setIsKeywordsLoading(true);
    const resp = await getKeywords(description);
    if (resp.status === 'Success') {
      setKeywords(resp.data.keywords.split(','));
    }
    setIsKeywordsLoading(false);
  };
  if (isKeywordsLoading) {
    return (
      <>
        {[30, 30, 30, 40, 40, 30, 30, 30, 50].map((size, index) => (
          <SkeletonChip key={index} size={size} />
        ))}
      </>
    );
  }
  return (
    <>
      {generateClicked ? null : (
        <>
          <Grid container item alignItems={'center'} direction={'column'}>
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
      <Grid
        container
        item
        direction="row"
        gap={2}
        justifyContent={'center'}
        p={2}
      >
        {keywords &&
          keywords.map((keyword, index) => {
            return (
              <Chip
                key={index}
                label={<Typography variant="h6">{keyword}</Typography>}
                sx={{padding: '1rem'}}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default Keywords;
