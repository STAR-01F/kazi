import {Box, Button, ButtonGroup, Container} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import {useSearchParams} from 'react-router-dom';

const icons = [<GridViewIcon />, <ViewListIcon />];

const LeftSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = ['grid', 'list'];
  const handleButtonClick = (index: number) => {
    setSearchParams((prev) => {
      prev.set('view', view[index]);
      return prev;
    });
  };
  const selectedButton = view.indexOf(searchParams.get('view') || 'grid');
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

export default LeftSection;
