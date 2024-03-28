import {Box, Container, Paper, Typography} from '@mui/material';
import QueryString from '@utils/newsfeed/QueryString';
import {useEffect, useState} from 'react';

const FeedContainer = () => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    try {
      const queryString = QueryString();

      const GetArticles = async () => {
        try {
          const articles = await fetch(queryString);
          const asJSON = await articles.json();
          setFeed(asJSON);
        } catch (error) {
          console.error('Error from GetArticles', error);
        }

        return null;
      };

      GetArticles();
    } catch (e) {
      console.log('Error getting articles', e);
    }
  }, [feed]);

  console.log('feed??', feed);
  return (
    <Container
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '250px',
        flexDirection: 'row',
        minWidth: '325px',
        // gap: 10,
        mb: 3,
      }}
    >
      <Box
        width={{
          xs: '100%',
          sm: '50%',
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography>Feed</Typography>
      </Box>
    </Container>
  );
};

export default FeedContainer;
