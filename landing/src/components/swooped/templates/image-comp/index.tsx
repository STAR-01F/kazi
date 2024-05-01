import { Box, Container } from "@mui/material";

interface ImgProps {
  path: string;
}

const ImageProp = ({ path }: ImgProps) => {
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: "300px",
      }}
    >
      {" "}
      <Box
        component={"img"}
        src={path}
        sx={{
          p: "10px",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </Container>
  );
};

export default ImageProp;
