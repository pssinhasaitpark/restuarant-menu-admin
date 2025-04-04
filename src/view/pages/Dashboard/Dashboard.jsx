import React from "react";
import { Box, Typography, Grid, Card, Paper } from "@mui/material";
import { People, Email, Chat, Event } from "@mui/icons-material";
import PieChartComponent from "../../components/Charts/PieChartComponent";
import LineChartComponent from "../../components/Charts/LineChartComponent";
import BarChartComponent from "../../components/Charts/BarChartComponent";
import LinearChartComponent from "../../components/Charts/LinearChartComponent";

const Dashboard = () => {
  return (
    <Box sx={{ p: 3,}}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: "Total Orders",
            value: "75",
            icon: <People sx={{ fontSize: 40, color: "#4CAF50" }} />,
          },
          {
            title: "Total Delivered",
            value: "357",
            icon: <Email sx={{ fontSize: 40, color: "#2196F3" }} />,
          },
          {
            title: "Total Canceled",
            value: "65",
            icon: <Chat sx={{ fontSize: 40, color: "#FF5722" }} />,
          },
          {
            title: "Total Revenue",
            value: "$128",
            icon: <Event sx={{ fontSize: 40, color: "#FFC107" }} />,
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} sx={{ width: "23%" }} key={index}>
            <Card sx={{ textAlign: "center", p: 3, boxShadow: 3 }}>
              {item.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {item.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ width: "48%" }}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Pie Chart
            </Typography>
            <Box sx={{ display: "flex" }}>
              <PieChartComponent />
              <PieChartComponent />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ width: "48%" }}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Total Revenue
            </Typography>
            <LinearChartComponent />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Customer Map
            </Typography>
            <BarChartComponent />
          </Paper>
        </Grid>

        <Grid item xs={6} sx={{ width: "50%" }}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Total Revenue
            </Typography>
            <LineChartComponent />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
