import {Container, Paper} from '@mui/material';
import {showPreciseFeed} from '@utils/newsfeed/PreciseFeedData';
import QueryString from '@utils/newsfeed/QueryString';
import {useEffect, useState} from 'react';
import SingleFeedItem from './components/SingleFeedItem';
import {LinearProgress} from '@mui/material';

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

  //need to cache after initial fetch
  useEffect(() => {
    try {
      console.log('hello...');
      const GetArticles = async () => {
        try {
          const articles = await fetch(queryString);
          const asJSON = await articles.json();
          const preciseArticles = showPreciseFeed(asJSON.items, coNames);
          setFeed(preciseArticles);
          setLoading(false);
        } catch (error) {
          console.error('Error from GetArticles', error);
          setLoading(false);
        }

        return null;
      };
      GetArticles();
    } catch (e) {
      console.error('Error getting articles', e);
    }
  }, []);

  if (loading) {
    return (
      <Container
        component={Paper}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minWidth: '325px',
          height: '250px',
          mb: 3,
        }}
      >
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        minWidth: '325px',
        height: '250px',
        flexDirection: 'column',

        overflowY: 'auto',
        background: 'white',
        mb: 3,
      }}
    >
      {feed &&
        feed.map((fitem, idx) => (
          <SingleFeedItem
            name={fitem.matchingStrings[0]}
            weblink={fitem.item.url}
            title={fitem.item.title}
            id={idx}
          />
        ))}
    </Container>
  );
};

export default FeedContainer;
