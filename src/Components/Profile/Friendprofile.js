import React from "react";
import { CalendarToday, Settings } from "@mui/icons-material";
import {
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navigation";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0099cc;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 600px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 24px;
`;

const AvatarWrapper = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

const IconButtonWrapper = styled(IconButton)`
  && {
    margin-bottom: 16px;
  }
`;

const SocialButtonContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 24px;
  }
`;

const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();

    window.location.href = "/login";
  };

  return (
    <CenteredContainer>
      <Container>
        <Header>
          <Link to="/calendar">
            <IconButtonWrapper>
              <CalendarToday />
            </IconButtonWrapper>
          </Link>
          <AvatarWrapper alt="Profile" src="https://via.placeholder.com/150" />
          <IconButtonWrapper onClick={handleMenuOpen}>
            <Settings />
          </IconButtonWrapper>
        </Header>
        <Menu
          id="settings-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleMenuClose}>Security</MenuItem>
          <MenuItem onClick={handleMenuClose}>Notification</MenuItem>
          <MenuItem onClick={handleMenuClose}>Get Help</MenuItem>
          <MenuItem onClick={handleMenuClose}>Contact Us</MenuItem>
        </Menu>
        <StyledTextField variant="outlined" label="Birthday" fullWidth />
        <StyledTextField variant="outlined" label="Location" fullWidth />
        <StyledTextField variant="outlined" label="Gender" fullWidth />
        <SocialButtonContainer>
          <Button variant="text" startIcon={<FacebookIcon />} color="primary">
            Connect to Facebook
          </Button>
        </SocialButtonContainer>
        <SocialButtonContainer>
          <Button variant="text" startIcon={<InstagramIcon />} color="primary">
            Connect to Instagram
          </Button>
        </SocialButtonContainer>
      </Container>
      <Navbar />
    </CenteredContainer>
  );
};

export default Profile;
