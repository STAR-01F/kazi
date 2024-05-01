import { Box } from "@mui/material";
import KaziImage1 from "@assets/job-page-overlay.png";

const RenderPageImage = () => {
  return (
    <Box
      component={"img"}
      src={KaziImage1}
      width={{ xs: "90%", md: "auto" }}
      height={{ xs: "auto", md: "550px" }}
    />
  );
};

export default RenderPageImage;
