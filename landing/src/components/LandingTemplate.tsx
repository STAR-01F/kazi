import { Grid } from "@mui/material";

interface WrapperProps {
  sectionOne: React.ReactNode;
  sectionTwo: React.ReactNode;
  sOnePriority: number;
  sTwoPriority: number;
  tHeight: string;
}

const LandingTemplate = ({
  sectionOne,
  sectionTwo,
  sOnePriority,
  sTwoPriority,
  tHeight,
}: WrapperProps) => {
  return (
    <Grid component={Grid} container spacing={1} height={tHeight}>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}
        xs={sOnePriority}
      >
        {sectionOne}
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}
        xs={sTwoPriority}
      >
        {sectionTwo}
      </Grid>
    </Grid>
  );
};

export default LandingTemplate;
