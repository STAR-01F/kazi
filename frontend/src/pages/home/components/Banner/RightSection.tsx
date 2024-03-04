import {Box, Container, Typography} from '@mui/material';
import JobModal from '../Modal/JobModal';
import MenuListButton from '@components/button/MenuListButton';
import JobStatus from '@repository/job.json';
import {useSearchParams} from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const RightSection = () => {
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
      name: status,
      action: () => setFilter({status: status.toLowerCase()}),
    })),
  ];

  const sortBy = ['Newest', 'Oldest', 'Last updated'];
  const sortByActionList = sortBy.map((name) => ({
    name: name,
    action: () => setFilter({sort: name.toLowerCase()}),
  }));
  const selectedSortIndex = sortByActionList.findIndex(
    (action) => action.name.toLowerCase() === searchParams.get('sort')
  );
  const selectedStatusIndex = statusActionList.findIndex(
    (action) => action.name.toLowerCase() === searchParams.get('status')
  );

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
        menuSelected={selectedSortIndex === -1 ? 0 : selectedSortIndex}
        menuActionList={sortByActionList}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography variant="caption">Sort</Typography>
      </MenuListButton>
      <MenuListButton
        size="small"
        variant="outlined"
        select
        menuSelected={selectedStatusIndex === -1 ? 0 : selectedStatusIndex}
        menuActionList={statusActionList}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography variant="caption">Status</Typography>
      </MenuListButton>
      <JobModal />
    </Container>
  );
};

export default RightSection;
