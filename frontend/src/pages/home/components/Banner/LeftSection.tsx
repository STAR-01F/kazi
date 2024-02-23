import {Box, Button, ButtonGroup, Container} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import {useState} from 'react';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';

const icons = [<GridViewIcon />, <ViewListIcon />, <ViewWeekIcon />];

const LeftSection = () => {
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

export default LeftSection;
