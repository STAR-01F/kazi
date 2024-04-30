import { Box } from "@mui/material";

interface ImgProps {
  path: string;
}

const ImageProp = ({ path }: ImgProps) => {
  return (
    <Box
      component={"img"}
      src={path}
      sx={{
        width: "30%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        border: 2,
        borderColor: "blue",
      }}
    />
  );
};

export default ImageProp;
