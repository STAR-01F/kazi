import {Card, CardHeader, CardContent, Link, Breadcrumbs} from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import Notes from '../Notes/Notes';
import Keywords from '../Keywords/Keywords';
import {UserJob} from 'src/@types';
import {useState} from 'react';
import InterviewQs from '../InterviewQs/InterviewQs';
import QuizIcon from '@mui/icons-material/Quiz';

type BreadcrumbsCardProps = {
  userJob?: UserJob;
  description: string;
};

const BreadcrumbsCard = ({userJob, description}: BreadcrumbsCardProps) => {
  const [selectedComponent, setSelectedComponent] = useState('Notes');

  const breadcrumbs = [
    <Link
      underline="hover"
      key={'1'}
      sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onClick={() => setSelectedComponent('Notes')}
    >
      <NotesIcon sx={{mr: 0.5}}></NotesIcon>
      Notes
    </Link>,
    <Link
      underline="hover"
      key={'2'}
      sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onClick={() => setSelectedComponent('Keywords')}
    >
      <SavedSearchIcon sx={{mr: 0.5}}></SavedSearchIcon>
      Suggestions
    </Link>,
    <Link
      underline="hover"
      key={'3'}
      sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onClick={() => setSelectedComponent('InterviewQs')}
    >
      <QuizIcon sx={{mr: 0.5}}></QuizIcon>
      Interview Questions
    </Link>,
  ];
  return (
    <Card sx={{width: '100%', position: 'sticky', top: '5px'}}>
      <CardHeader
        style={{
          borderRadius: '5px 5px 0 0',
          background: '#D5D5D5',
          color: 'black',
        }}
        title={<Breadcrumbs separator="|">{breadcrumbs}</Breadcrumbs>}
        titleTypographyProps={{fontSize: '1.2rem', fontWeight: 'bold'}}
        sx={{height: '2.5rem'}}
      />
      <CardContent
        sx={{
          width: '100%',
          minHeight: '300px',
          display: 'flex',
        }}
      >
        {selectedComponent === 'Notes' && <Notes userJob={userJob}></Notes>}
        {selectedComponent === 'Keywords' && (
          <Keywords description={description} />
        )}
        {selectedComponent === 'InterviewQs' && <InterviewQs />}
      </CardContent>
    </Card>
  );
};

export default BreadcrumbsCard;
