import {Box, Typography, List, ListItem} from '@mui/material';

interface IQCardsProps {
  content: string[];
  title: string;
}

interface titleKeys {
  [key: string]: string;
}

const titlesObj: titleKeys = {
  generalQuestions: 'General Questions',
  situationalQuestions: 'Situational Questions',
  technicalQuestions: 'Technical Questions',
};

const IQCards = ({content, title}: IQCardsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {titlesObj[title]}
      </Typography>
      {content.map((q, index) => (
        <List
          sx={{
            listStyleType: 'disc',
            pl: 2,
            '& .MuiListItem-root': {
              display: 'list-item',
            },
          }}
          key={index}
        >
          <ListItem>{q}</ListItem>
        </List>
      ))}
    </Box>
  );
};

export {IQCards};
