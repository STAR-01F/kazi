import {
  Box,
  Typography,
  Container,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";

interface LandingText {
  title: string;
  blurbtext: string[];
}

const TextProp = ({ title, blurbtext }: LandingText) => {
  return (
    <Container
      disableGutters
      sx={{
        minWidth: "50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          minHeight: "300px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            pl: 3.5,
            "& .MuiListItem-root": {
              display: "list-item",
            },
          }}
        >
          {blurbtext &&
            blurbtext.length &&
            blurbtext.map((value, idx) => (
              <ListItem key={idx} disableGutters>
                <ListItemText primary={value} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Container>
  );
};

export default TextProp;
