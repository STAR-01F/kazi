import {Box, Container, Paper, Link} from '@mui/material';
import QueryString from '@utils/newsfeed/QueryString';
import {useEffect, useState} from 'react';

const FeedContainer = () => {
  const [feed, setFeed] = useState<{items: [{url: string; title: string}]}>({
    items: [{url: '', title: ''}],
  });

  const [loading, setLoading] = useState(true);
  const queryString = QueryString();

  //need to cache after initial fetch
  useEffect(() => {
    try {
      const GetArticles = async () => {
        try {
          const articles = await fetch(queryString);
          const asJSON = await articles.json();
          console.log('asJ', asJSON);
          setFeed(asJSON);
          setLoading(false);
        } catch (error) {
          console.error('Error from GetArticles', error);
          setLoading(false);
        }

        return null;
      };
      GetArticles();
    } catch (e) {
      console.log('Error getting articles', e);
    }
  }, []);

  console.log('feed??', feed);

  if (loading) {
    return (
      <Container
        component={Paper}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minWidth: '325px',
          height: '250px',
          flexDirection: 'column',
          mb: 3,
        }}
      >
        Loading...
      </Container>
    );
  }

  return (
    <Container
      component={Paper}
      sx={{
        display: 'block',
        justifyContent: 'center',
        minWidth: '325px',
        height: '250px',
        flexDirection: 'row',
        overflowY: 'auto',
        background: '#5836f7',

        // gap: 10,
        mb: 3,
      }}
    >
      {/* <Box
        width={{
          xs: '100%',
          sm: '50%',
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
         <TableRow style ={ index % 2? { background : "#fdffe0" }:{ background : "white" }}> 

    background-color: #5836f7

      > */}
      {feed &&
        feed.items.map((item, idx) => (
          <Box
            key={idx}
            sx={idx % 2 ? {background: '#5836f7'} : {background: ''}}
          >
            <Link
              sx={idx % 2 ? {color: 'white'} : {color: 'white'}}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              underline="hover"
            >
              {item.title}{' '}
            </Link>
          </Box>
        ))}
      {/* </Box> */}
    </Container>
  );
};

export default FeedContainer;
