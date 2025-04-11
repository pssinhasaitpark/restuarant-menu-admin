import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";

const dummyOrders = [
  {
    id: 1,
    customerName: "Victor Diaz",
    orderId: "COD-1462265017",
    orderDate: "2025-02-26",
    orderAmount: "350.00 $",
    paymentStatus: "Success",
    orderStatus: "New Order",
  },
  {
    id: 2,
    customerName: "Victor Diaz",
    orderId: "COD-1462265018",
    orderDate: "2025-03-01",
    orderAmount: "300.00 $",
    paymentStatus: "Success",
    orderStatus: "New Order",
  },
  {
    id: 3,
    customerName: "Victor Diaz",
    orderId: "COD-1462265019",
    orderDate: "2025-04-10",
    orderAmount: "550.00 $",
    paymentStatus: "Success",
    orderStatus: "New Order",
  },
  // Add more dummy orders here if needed
];

const OrderManagement = () => {
  const [filters, setFilters] = useState({
    orderId: "",
    fromDate: "",
    toDate: "",
    orderStatus: "New Order",
  });

  const [filteredOrders, setFilteredOrders] = useState(dummyOrders);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    let filtered = dummyOrders.filter((order) => {
      return (
        (!filters.orderId || order.orderId.includes(filters.orderId)) &&
        (!filters.orderStatus || order.orderStatus === filters.orderStatus) &&
        (!filters.fromDate || new Date(order.orderDate) >= new Date(filters.fromDate)) &&
        (!filters.toDate || new Date(order.orderDate) <= new Date(filters.toDate))
      );
    });
    setFilteredOrders(filtered);
  };

  const handleReset = () => {
    setFilters({ orderId: "", fromDate: "", toDate: "", orderStatus: "" });
    setFilteredOrders(dummyOrders);
  };

  return (
    <Box p={3}>
     
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
  <Typography variant="h5" gutterBottom>Search Filter</Typography>

  {/* Row 1: Order ID & Order Status */}
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Order ID"
        name="orderId"
        value={filters.orderId}
        onChange={handleFilterChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        select
        fullWidth
        label="Order Status"
        name="orderStatus"
        value={filters.orderStatus}
        onChange={handleFilterChange}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="New Order">New Order</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </TextField>
    </Grid>

    {/* Row 2: From Date & To Date */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="date"
        label="From Date"
        name="fromDate"
        value={filters.fromDate}
        InputLabelProps={{ shrink: true }}
        onChange={handleFilterChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="date"
        label="To Date"
        name="toDate"
        value={filters.toDate}
        InputLabelProps={{ shrink: true }}
        onChange={handleFilterChange}
      />
    </Grid>

    {/* Row 3: Buttons */}
    <Grid item xs={12} sx={{ textAlign: "right", mt: 2 }}>
      <Button variant="contained" onClick={handleSearch} sx={{ mr: 2 }}>
        Search
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Grid>
  </Grid>
</Paper>


      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order Amount</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.orderAmount}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>
                  <Button size="small">View</Button>
                </TableCell>
                <TableCell>
                  <Button size="small">Track Order</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredOrders.length === 0 && (
          <Typography variant="body2" p={2}>
            No orders found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default OrderManagement;