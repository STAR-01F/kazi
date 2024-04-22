import {Card, CardContent, CardHeader, Typography} from '@mui/material';
import {ReactNode} from 'react';

interface WelcomeCardProps {
  title: string;
  content?: string;
  component?: ReactNode;
}

const WelcomeCard = ({title, content, component}: WelcomeCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{maxWidth: 700, margin: '0 auto', border: 'none'}}
    >
      <CardHeader title={title} sx={{textAlign: 'center'}} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography fontSize={20} sx={{textAlign: 'center'}}>
          {content}
        </Typography>
        {component}
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
