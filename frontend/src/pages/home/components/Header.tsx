import {Box, Button, ButtonGroup, Container, Typography} from '@mui/material';
import JobModal from './JobModal';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import {useState} from 'react';
import MenuListButton from '@components/button/MenuListButton';
import JobStatus from '@repository/job.json';
import {useSearchParams} from 'react-router-dom';

const icons = [<GridViewIcon />, <ViewListIcon />, <ViewModuleIcon />];

const Left = () => {
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  return (
    <Container component={Box} disableGutters>
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

  const sortBy = [
    'Name ascending (A-Z)',
    'Name desending (Z-A)',
    'Newest',
    'Oldest',
    'Last updated',
  ];
  const sortByActionList = sortBy.map((name) => ({
    name: name,
    action: () => setFilter({sort: name.toLowerCase()}),
  }));
  return (
    <Container
      component={Box}
      sx={{display: 'flex', justifyContent: 'end', gap: 2}}
      disableGutters
    >
      <MenuListButton
        size="small"
        variant="outlined"
        menuActionList={sortByActionList}
      >
        Sort
      </MenuListButton>
      <MenuListButton
        size="small"
        variant="outlined"
        menuActionList={statusActionList}
      >
        Status
      </MenuListButton>
      <JobModal />
    </Container>
  );
};
const Header = () => {
  return (
    <Box
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

export default Header;
