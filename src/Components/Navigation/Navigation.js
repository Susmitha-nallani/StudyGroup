import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import FriendsIcon from "@mui/icons-material/People";
import ProfileIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 240;

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [avatarInitials, setAvatarInitials] = useState("");
  const [value, setValue] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const bottomNavItems = [
    { text: "Groups", icon: <GroupIcon />, link: "/groups" },
    { text: "Chat", icon: <ChatIcon />, link: "/chat" },
    { text: "Home", icon: <HomeIcon />, link: "/home" },
    { text: "Friends", icon: <FriendsIcon />, link: "/friends" },
    { text: "Profile", icon: <ProfileIcon />, link: "/profile" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ background: "black" }}>
          <Typography variant="h6" noWrap component="div">
            Digi Telescope
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleAvatarClick}>
              {userData ? <Avatar>{avatarInitials}</Avatar> : <Avatar />}
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          {bottomNavItems.map(({ text, icon, link }, index) => (
            <ListItem
              key={text}
              button
              onClick={() => {
                setValue(index);
                handleNavigation(link);
              }}
              sx={{
                justifyContent: "center",
                ...(location.pathname === link && {
                  background: " #dcb989",
                }),
              }}
            >
              <ListItemIcon sx={{ color: "#b37400" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, height: "100%" }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Sidebar;
