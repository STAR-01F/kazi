import {Card, CardContent, CardHeader, Typography} from '@mui/material';
import {ReactNode} from 'react';

interface WelcomeCardProps {
  title: string;
  content?: string;
  component?: ReactNode;
}

const WelcomeCard = ({title, content, component}: WelcomeCardProps) => {
  return (
    <Card variant="outlined" sx={{maxWidth: 700, margin: '0 auto'}}>
      <CardHeader
        title={title}
        sx={{textAlign: 'center', backgroundColor: 'lightgrey'}}
      />
      <CardContent>
        <Typography fontSize={15} sx={{textAlign: 'center'}}>
          {content}
        </Typography>
        {component}
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
