import {Box, Link} from '@mui/material';

type singleFeed = {name: string; title: string; weblink: string; id: number};

const SingleFeedItem = ({name, weblink, id, title}: singleFeed) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      alignContent={'center'}
      justifyContent={'space-between'}
      pb={1.5}
    >
      <Box sx={{color: '#836FF8', fontWeight: 'bold'}}>{name}</Box>

      <Box width={'80%'} key={id} textOverflow="ellipsis" overflow="hidden">
        <Link
          href={weblink}
          target="_blank"
          rel="noreferrer"
          underline="hover"
          whiteSpace="nowrap"
        >
          {title}{' '}
        </Link>
      </Box>
    </Box>
  );
};

export default SingleFeedItem;
