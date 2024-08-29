import {Stepper, Tooltip, Step, StepLabel} from '@mui/material';

const RejectedStepper = () => {
  <Stepper activeStep={0} alternativeLabel>
    <Step key={0}>
      <Tooltip
        title={'1 Aug 2024'}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <StepLabel sx={{color: 'red'}}>{'Rejected'}</StepLabel>
      </Tooltip>
    </Step>
  </Stepper>;
};

export {RejectedStepper};
