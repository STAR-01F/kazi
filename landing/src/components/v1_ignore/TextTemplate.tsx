import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

interface TextTemplateProps {
  Title: string;
  Content: string[];
}

const TextTemplate = ({ Title, Content }: TextTemplateProps): JSX.Element => {
  return (
    <Container
      sx={{
        bgcolor: "#5836F7",
        color: "white",
        padding: "25px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#5836F7",
        }}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "600" }}>
          {Title}
        </Typography>
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {Content.map((item) => {
            return (
              <ListItem>
                <ListItemIcon>
                  <CheckCircleRoundedIcon sx={{ background: "transparent" }} />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ fontSize: "18px" }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export { TextTemplate };
