import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material';

interface UserFormProps {
  labels: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({labels, onChange}) => {
  return (
    <RadioGroup onChange={onChange} name="use-radio-group" defaultValue="first">
      <FormHelperText>Please select an option</FormHelperText>
      {labels.map((label, index) => (
        <FormControlLabel
          key={index}
          value={label}
          label={label}
          control={<Radio />
          }
        />
      ))}
    </RadioGroup>
  );
};

export default UserForm;
