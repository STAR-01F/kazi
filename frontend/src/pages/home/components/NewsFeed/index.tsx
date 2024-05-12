import {Container, Paper, Typography} from '@mui/material';
import {showPreciseFeed} from '@services/newsfeed/PreciseFeedData';
import QueryString from '@services/newsfeed/QueryString';
import {useEffect, useState} from 'react';
import SingleFeedItem from './components/SingleFeedItem';
import {LinearProgress} from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';

type NewsData = {
  url: string;
  image: string;
  title: string;
  banner_image: string;
  context_text: string;
};

type MatchingString = string[];

type FeedItem = {
  item: NewsData;
  matchingStrings: MatchingString;
};

type News = FeedItem[];

const FeedContainer = () => {
  const [feed, setFeed] = useState<News>({} as News);

  const [loading, setLoading] = useState(true);

  const [queryString, coNames] = QueryString();

  const [noArticles, setNoArticles] = useState(false);

  //need to cache after initial fetch, only rerender when adding a new job
  useEffect(() => {
    try {
      const GetArticles = async () => {
        setNoArticles(false);
        try {
          if (queryString === 'no-articles') {
            setNoArticles(true);
            setLoading(false);
            return;
          }

          const articles = await fetch(queryString);
          const asJSON = await articles.json();

          if (Object.keys(asJSON).length === 0) {
            setNoArticles(true);
            return;
          }

          const preciseArticles = showPreciseFeed(asJSON.items, coNames);
          setFeed(preciseArticles);
          setLoading(false);
        } catch (error) {
          console.error('Error from GetArticles', error);
          setLoading(true);
        }
      };

      GetArticles();
    } catch (e) {
      console.error('Error getting articles', e);
    }
  }, [coNames.length]);

  if (queryString === 'no-articles' || noArticles) {
    return (
      <Container
        component={Paper}
        sx={{
          display: {xs: 'none', sm: 'flex'},
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '325px',
          height: '250px',
          flexDirection: 'column',
          mb: 3,
        }}
      >
        <FeedIcon fontSize="large" />
        <Typography>No articles found</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container
        component={Paper}
        sx={{
          display: {xs: 'none', sm: 'flex'},
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '325px',
          height: '250px',
          mb: 3,
        }}
      >
        <LinearProgress style={{width: '100%'}} />
      </Container>
    );
  }

  return (
    <Container
      component={Paper}
      sx={{
        display: {xs: 'none', sm: 'flex'},
        minWidth: '325px',
        height: '250px',
        flexDirection: 'column',
        overflowY: 'auto',
        mb: 3,
        padding: '24px',
        '&::-webkit-scrollbar-track': {
          borderRadius: '5px',
        },
      }}
    >
      {Object.keys(feed).length !== 0 &&
        feed.map((fitem, idx) => (
          <SingleFeedItem
            name={fitem.matchingStrings[0]}
            weblink={fitem.item.url}
            title={fitem.item.title}
            id={idx}
            key={idx}
          />
        ))}
    </Container>
  );
};

export default FeedContainer;
