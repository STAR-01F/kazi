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
      <Box fontWeight={'bold'} sx={{color: 'salmon'}} color={'white'}>
        {name}
      </Box>

      <Box width={'80%'} key={id}>
        <Link
          href={weblink}
          target="_blank"
          rel="noreferrer"
          underline="always"
        >
          {title}{' '}
        </Link>
      </Box>
    </Box>
  );
};
{
}

export default SingleFeedItem;
