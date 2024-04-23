import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material/";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const CollateText = () => {
  return (
    <Container
      sx={{
        bgcolor: "#5836F7",
        height: "100%",
        color: "white",
        padding: "25px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#5836F7",
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "600" }}>
          Collate, organise and manage your job applications in one place
        </Typography>
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItem>
            <ListItemIcon>
              <CheckCircleRoundedIcon sx={{ background: "transparent" }} />
            </ListItemIcon>
            <ListItemText
              primary="Update and track the status of your applications as they progress"
              primaryTypographyProps={{ fontSize: "18px" }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleOutline />
            </ListItemIcon>
            <ListItemText
              primary="Set targets to help keep you focused during your search"
              primaryTypographyProps={{ fontSize: "18px" }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleOutline />
            </ListItemIcon>
            <ListItemText
              primary="Keep up to date with all your target companies with our newsfeed"
              primaryTypographyProps={{ fontSize: "18px" }}
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default CollateText;
