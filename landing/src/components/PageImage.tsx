import { Box } from "@mui/material";
import KaziImage1 from "@assets/kazi-asset1.png";

const RenderPageImage = () => {
  return (
    <Box
      component={"img"}
      // position={"absolute"}
      src={KaziImage1}
      width={{ xs: "90%", md: "auto" }}
      height={{ xs: "auto", md: "550px" }}
      // sx={{
      //   top: "450px",
      //   left: { xs: "5%", md: "calc((100% - 1070px) / 2)" },
      //   borderRadius: "5px",
      // }}
    />
  );
};

export default RenderPageImage;
