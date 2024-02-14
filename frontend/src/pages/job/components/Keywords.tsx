import {Chip, Typography} from '@mui/material';
import {SkeletonChip} from '@components/skeleton';

type KeywordsProps = {
  keywords: string[];
  isLoading: boolean;
};

const Keywords = ({keywords, isLoading}: KeywordsProps) => {
  if (isLoading) {
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
    </>
  );
};

export default Keywords;
