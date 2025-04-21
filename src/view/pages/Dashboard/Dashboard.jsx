import React, { useEffect } from "react";
import { Box, Typography, Grid, Card, Paper } from "@mui/material";
import { People, Chat, Fastfood, TableRestaurant } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerOrdersCount, fetchStaffCount, fetchtablecount, fetchSupportCount } from "../../redux/slices/dashboardSlice";
import PieChartComponent from "../../components/Charts/PieChartComponent";
import LinearChartComponent from "../../components/Charts/LinearChartComponent";
import BarChartComponent from "../../components/Charts/BarChartComponent";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalCustomerOrders, totalStaff, totaltable, totalSupport, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCustomerOrdersCount());
    dispatch(fetchStaffCount());
    dispatch(fetchtablecount()); // Adding the missing dispatch
    dispatch(fetchSupportCount()); // Adding the missing dispatch
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {[
          {
            title: "Total Orders",
            value: loading ? "Loading..." : totalCustomerOrders,
            icon: <Fastfood sx={{ fontSize: 40, color: "#4CAF50" }} />,
          },
          {
            title: "Total Staff",
            value: loading ? "Loading..." : totalStaff,
            icon: <People sx={{ fontSize: 40, color: "#2196F3" }} />,
          },
          {
            title: "Total Tables",
            value: loading ? "Loading..." : totaltable,
            icon: <TableRestaurant sx={{ fontSize: 40, color: "#FF5722" }} />,
          },
          {
            title: "Total Support Query",
            value: loading ? "Loading..." : totalSupport,
            icon: <Chat sx={{ fontSize: 40, color: "#FFC107" }} />,
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
              Total Orders
            </Typography>
            <LinearChartComponent totalOrders={totalCustomerOrders} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={6} sx={{ width: "48%" }}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Customer Map
            </Typography>
            <BarChartComponent />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{ width: "48%" }}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Total Revenue
            </Typography>
            <LinearChartComponent totalOrders={totalCustomerOrders} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
