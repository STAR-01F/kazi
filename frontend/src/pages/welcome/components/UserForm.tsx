import { FormControlLabel, Radio, RadioGroup } from "@mui/material"

interface UserFormProps {
    labels: string[];
}

const UserForm: React.FC<UserFormProps> = ({ labels }) => {
    return (
        <RadioGroup name="use-radio-group" defaultValue="first">
            {labels.map((label, index) => (
                <FormControlLabel
                    key={index}
                    value={`option-${index}`}
                    label={label}
                    control={<Radio />}
                />
            ))}
        </RadioGroup>
    );
}

export default UserForm;
