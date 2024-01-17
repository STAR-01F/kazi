import { Box, Button, TextField, Typography } from '@mui/material';
import { useState, MouseEvent, ChangeEvent } from 'react';
import SavedJob from './components/SavedJob';

const Homepage = () => {
  const [inputText, setInputText] = useState('');

  const handleSumbit = (e: MouseEvent<HTMLButtonElement>) => {
    // send the prompt along with the job description to the OpenAi API
    e.preventDefault();
    console.log(inputText);
  };

  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Typography variant="h6">Copy Job Description</Typography>
        <Box
          component="div"
          display="flex"
          gap="10px"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            type="text"
            value={inputText}
            size="medium"
            multiline
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputText(e.target.value);
            }}
          />
          <Button
            onClick={handleSumbit}
            variant="contained"
            sx={{ height: '24px' }}
          >
            Upload
          </Button>
        </Box>
        <SavedJob />
      </Box>
    </>
  );
};

export default Homepage;
