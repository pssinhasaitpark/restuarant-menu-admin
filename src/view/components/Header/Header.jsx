import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Notifications,
  Sunny,
  Bedtime,
  MoreVert, // More options (three dots)
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "../../contexts/ThemeContext";

// Styled SearchBar Component
const SearchBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  borderRadius: "20px",
  padding: "5px 10px",
  marginLeft: "10px",
  width: "250px",
  border: `1px solid ${theme.palette.divider}`,
}));

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClick = (event) => setMobileMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMobileMenuClose = () => setMobileMenuAnchor(null);

  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
    handleMobileMenuClose();
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    handleMenuClose();
    handleMobileMenuClose();
    setDrawerOpen(false);
  };

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: darkMode ? "#333" : "#e0e0e0",
        color: darkMode ? "#fff" : "#000",
        padding: "10px 20px",
        boxShadow: darkMode ? "none" : "0px 4px 8px rgba(255, 255, 255, 0.6)",
        border: darkMode ? "none" : "1px solid rgba(255, 255, 255, 0.6)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 34,
        }}
      >
        {/* Search Bar (Only visible on Desktop) */}
        {!isMobile && (
          <SearchBar>
            <InputBase
              placeholder="Search here"
              sx={{ flex: 1, color: darkMode ? "#fff" : "#000" }}
            />
            <IconButton>
              <Search sx={{ color: darkMode ? "#fff" : "#000" }} />
            </IconButton>
          </SearchBar>
        )}

        {/* Icons Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Notifications sx={{ color: darkMode ? "#90caf9" : "#2196f3" }} />
          </IconButton>

          {/* Theme Toggle Button */}
          <IconButton onClick={toggleTheme}>
            {darkMode ? (
              <Bedtime sx={{ color: "#ffeb3b" }} />
            ) : (
              <Sunny sx={{ color: "#ff9800" }} />
            )}
          </IconButton>

          {/* Mobile Menu (Three Dots) - Visible on Mobile */}
          {isMobile && (
            <IconButton onClick={handleMobileMenuClick}>
              <MoreVert sx={{ color: darkMode ? "#fff" : "#000" }} />
            </IconButton>
          )}

          {/* Desktop Profile Section (Avatar and Name) */}
          {!isMobile && (
            <>
              <Typography variant="body1">
                Welcome, <b>Admin</b>
              </Typography>
              <Avatar
                alt="Admin"
                src="https://via.placeholder.com/150"
                sx={{ width: 40, height: 40, cursor: "pointer" }}
                onClick={handleMenuClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Menu (Drawer) */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={handleProfileClick}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Mobile Menu Options */}
      {isMobile && (
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}
    </AppBar>
  );
};

export default Header;
