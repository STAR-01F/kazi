import {Box} from '@mui/material';
import {Link} from '@mui/material';

type singleFeed = {name: string; title: string; weblink: string; id: number};

const SingleFeedItem = ({name, weblink, id, title}: singleFeed) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      alignContent={'center'}
      justifyContent={'space-between'}
    >
      <Box
        fontWeight={'bold'}
        sx={id % 2 ? {color: 'darkgreen'} : {color: 'darkorange'}}
        color={'white'}
      >
        {name}
      </Box>

      <Box width={'65%'} key={id}>
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
