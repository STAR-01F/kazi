import {Stepper, Tooltip, StepLabel} from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';

const RejectedStepper = () => {
  return (
    <Stepper sx={{color: 'red', fontWeight: '900'}}>
      {/* <Step  > */}
      <LensIcon />
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
        <StepLabel error>{'Rejected'}</StepLabel>
      </Tooltip>
      {/* </Step> */}
    </Stepper>
  );
};

export {RejectedStepper};
