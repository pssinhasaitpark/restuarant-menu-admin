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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import dummyOrders from "../../utils/dummyOrders.json";

const OrderManagement = () => {
  const [filters, setFilters] = useState({
    orderId: "",
    fromDate: "",
    toDate: "",
    orderStatus: "",
  });

  const [filteredOrders, setFilteredOrders] = useState(dummyOrders);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filtered = dummyOrders.filter((order) => {
      return (
        (!filters.orderId || order.orderId.includes(filters.orderId)) &&
        (!filters.orderStatus || order.orderStatus === filters.orderStatus) &&
        (!filters.fromDate ||
          new Date(order.orderDate) >= new Date(filters.fromDate)) &&
        (!filters.toDate ||
          new Date(order.orderDate) <= new Date(filters.toDate))
      );
    });
    setFilteredOrders(filtered);
  };

  const handleReset = () => {
    setFilters({ orderId: "", fromDate: "", toDate: "", orderStatus: "" });
    setFilteredOrders(dummyOrders);
  };

  const handleGenerateInvoice = (order) => {
    setSelectedInvoice(order);
    setInvoiceDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setInvoiceDialogOpen(false);
    setSelectedInvoice(null);
  };

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box p={3}>
      {/* this is for search */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Search Filter
        </Typography>
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
              <TableCell>Token No.</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, orderIndex) => {
              const totalAmount = calculateTotal(order.items);
              return order.items.map((item, itemIndex) => (
                <TableRow key={`${order.id}-${itemIndex}`}>
                  {itemIndex === 0 && (
                    <>
                      <TableCell rowSpan={order.items.length}>
                        {orderIndex + 1}
                      </TableCell>
                      <TableCell rowSpan={order.items.length}>
                        {order.tokenNumber}
                      </TableCell>
                      <TableCell rowSpan={order.items.length}>
                        {order.customerName}
                      </TableCell>
                      <TableCell rowSpan={order.items.length}>
                        {order.orderId}
                      </TableCell>
                      <TableCell rowSpan={order.items.length}>
                        {order.orderDate}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                  {itemIndex === 0 && (
                    <>
                      <TableCell rowSpan={order.items.length}>
                        ₹{totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell rowSpan={order.items.length}>
                        {order.paymentStatus}
                      </TableCell>
                      <TableCell rowSpan={order.items.length}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleGenerateInvoice(order)}
                        >
                          Generate
                        </Button>
                      </TableCell>
                      <TableCell rowSpan={order.items.length}>
                        <Button size="small">Track</Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
        {filteredOrders.length === 0 && (
          <Typography variant="body2" p={2}>
            No orders found.
          </Typography>
        )}
      </Paper>

      <Dialog open={invoiceDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Invoice</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box>
              {/* Header */}
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  🍽️ Foodie's Delight Restaurant
                </Typography>
                <Typography variant="body2">
                  123 Main Street, Flavor Town, India
                </Typography>
                <Typography variant="body2">
                  GSTIN: 29ABCDE1234F2Z5 | Contact: +91 98765 43210
                </Typography>
              </Box>

              {/* Order Info */}
              <Box mb={2}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Order ID:</strong> {selectedInvoice.orderId}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Token No:</strong> {selectedInvoice.tokenNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" textAlign="right">
                      <strong>Order Date:</strong> {selectedInvoice.orderDate}
                    </Typography>
                    <Typography variant="body2" textAlign="right">
                      <strong>Customer:</strong> {selectedInvoice.customerName}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Items Table */}
              <Table size="small" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Item</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Qty</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Rate (₹)</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Amount (₹)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedInvoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">
                        {item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totals */}
              <Box>
                <Grid container>
                  <Grid item xs={6} />
                  <Grid item xs={6}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Subtotal:</Typography>
                      <Typography variant="body2">
                        ₹{calculateTotal(selectedInvoice.items).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">GST (5%):</Typography>
                      <Typography variant="body2">
                        ₹
                        {(calculateTotal(selectedInvoice.items) * 0.05).toFixed(
                          2
                        )}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="h6">Total Payable:</Typography>
                      <Typography variant="h6">
                        ₹
                        {(calculateTotal(selectedInvoice.items) * 1.05).toFixed(
                          2
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Footer */}
              <Box textAlign="center" mt={3}>
                <Typography variant="body2">
                  Payment Status:{" "}
                  <strong>{selectedInvoice.paymentStatus}</strong>
                </Typography>
                <Typography variant="body2" mt={1}>
                  Thank you for dining with us! 🙏
                </Typography>
              </Box>

              {/* Print Button */}
              <Box textAlign="center" mt={2}>
                <Button
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handlePrint}
                >
                  Print Invoice
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderManagement;
