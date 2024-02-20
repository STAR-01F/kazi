import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import JobModal from '../Modal/JobModal';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import {useState} from 'react';
import MenuListButton from '@components/button/MenuListButton';
import JobStatus from '@repository/job.json';
import {useSearchParams} from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
const icons = [<GridViewIcon />, <ViewListIcon />, <ViewWeekIcon />];

const Left = () => {
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  return (
    <Container component={Box} disableGutters flex={0}>
      <ButtonGroup
        variant="text"
        aria-label="Basic button group"
        sx={{border: '1px solid primary'}}
      >
        {icons.map((icon, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(index)}
            color={selectedButton === index ? 'primary' : 'inherit'}
          >
            {icon}
          </Button>
        ))}
      </ButtonGroup>
    </Container>
  );
};
const Right = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = (newParams: {[key: string]: string}) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key in newParams) {
      params.set(key, newParams[key]);
    }
    setSearchParams(params);
  };

  const statusActionList = [
    {
      name: 'All',
      action: () => setFilter({status: 'all'}),
    },
    ...JobStatus.status.map((status) => ({
      name: <Typography>{status}</Typography>,
      action: () => setFilter({status: status.toLowerCase()}),
    })),
  ];

  const sortBy = ['Newest', 'Oldest', 'Last updated'];
  const sortByActionList = sortBy.map((name) => ({
    name: name,
    action: () => setFilter({sort: name.toLowerCase()}),
  }));
  return (
    <Container
      component={Box}
      sx={{display: 'flex', gap: 2, flex: 1}}
      justifyContent={{sm: 'end'}}
      disableGutters
      mb={{xs: 2, sm: 0}}
    >
      <MenuListButton
        size="small"
        variant="outlined"
        select
        menuActionList={sortByActionList}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography variant="caption">Sort</Typography>
      </MenuListButton>
      <MenuListButton
        size="small"
        variant="outlined"
        select
        menuActionList={statusActionList}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography variant="caption">Status</Typography>
      </MenuListButton>
      <JobModal />
    </Container>
  );
};
const Banner = () => {
  return (
    <Box
      component={Grid}
      flexDirection={{xs: 'column-reverse', sm: 'row'}}
      id="home-page-header"
      mb={2}
      display={'flex'}
      justifyContent={'space-between'}
      alignContent={'center'}
    >
      <Left />
      <Right />
    </Box>
  );
};

export default Banner;
