
import React from "react";
import {
  Dashboard,
  RestaurantMenu,
  TableChart,
  Group,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ drawerOpen, toggleDrawer}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const userType = localStorage.getItem("userType");


  // Define menu items
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Menu", icon: <RestaurantMenu />, path: "/menulist" },
    { text: "Customers Orders", icon: <Group />, path: "/customers" },
    // { text: "Feedback", icon: <Group />, path: "/review" },
    // { text: "Customers Review", icon: <Group />, path: "/review" },
    // { text: "Staff", icon: <Group />, path: "/staffform" },
    // { text: "salary", icon: <Group />, path: "/customers" },
    { text: "menu", icon: <Group />, path: "/menu" },
     { text: "Restaurant Table List", icon: <TableChart />, path: "/createlist" },
  ];

  // Conditionally add the Restaurant Form item based on user role
  if (userType === "super_admin") {
    menuItems.push({ text: "Restaurants", icon: <TableChart />, path: "/restaurantform" });
    menuItems.push({ text: "Feedback", icon: <TableChart />, path: "/customers" });
    menuItems.push({ text: "Document", icon: <TableChart />, path: "/menulist" });
    // menuItems.push({ text: "contact US", icon: <TableChart />, path: "/restaurantform" });
    // menuItems.push({ text: "support System", icon: <TableChart />, path: "/restaurantform" });
  }

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          transition: "width 0.3s ease-in-out",
          position: isMobile ? "fixed" : "relative",
        },
      }}
    >
      {/* Close Button for Mobile */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1500,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      {/* Sidebar Logo */}
      <Box sx={{ textAlign: "center", my: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Restaurant<span style={{ color: "#28a745" }}>.</span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Modern Admin Dashboard
        </Typography>
      </Box>
      <Divider />

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={isMobile ? toggleDrawer : undefined}
            sx={{
              backgroundColor: location.pathname === item.path ? "#d4edda" : "transparent",
              color: location.pathname === item.path ? "#155724" : "inherit",
              borderRadius: 1,
              marginBottom: 1,
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? "#28a745" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mt: "auto" }} />

      {/* Logout Button */}
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

