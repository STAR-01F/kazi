import { Button } from "@mui/material";

type CallToActionButtonProps = {
  text: string;
};

const CallToActionButton = ({ text }: CallToActionButtonProps) => {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <Button
      variant="contained"
      href={`${siteUrl}/signup`}
      size="large"
      component="a"
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
