import { Button } from "@mui/material";

type CallToActionButtonProps = {
  text: string;
};

const CallToActionButton = ({ text }: CallToActionButtonProps) => {
  return (
    <Button
      variant="contained"
      href=""
      size="large"
      sx={{
        width: { md: "70%" },
        fontWeight: "bold",
        textTransform: "capitalize",
      }}
    >
      {text}
    </Button>
  );
};

export default CallToActionButton;
