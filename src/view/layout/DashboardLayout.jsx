import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/Header/Header";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile); // Open by default on large screens

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Toggle Button for Mobile */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: 1500,
            backgroundColor: "white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ flexShrink: 0 }}>
          <Header />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: isMobile ? 2 : 3,
            mt:8,
            overflowY: "auto",
            minWidth: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
