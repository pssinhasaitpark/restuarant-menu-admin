import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ListComponent from "../ListComponents/ListComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const invoiceRef = useRef();

  const { orders, loading, error } = useSelector((state) => state.orders);
  console.log("orders ===", orders);

  const [filters, setFilters] = useState({
    orderId: "",
    fromDate: "",
    toDate: "",
    orderStatus: "",
  });

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filtered = orders.filter((order) => {
      return (
        (!filters.orderId || order.order_id.includes(filters.orderId)) &&
        (!filters.orderStatus || order.status === filters.orderStatus) &&
        (!filters.fromDate ||
          new Date(order.createdAt) >= new Date(filters.fromDate)) &&
        (!filters.toDate ||
          new Date(order.createdAt) <= new Date(filters.toDate))
      );
    });
    setFilteredOrders(filtered);
  };

  const handleReset = () => {
    setFilters({ orderId: "", fromDate: "", toDate: "", orderStatus: "" });
    setFilteredOrders(orders);
  };

  const handleGenerateInvoice = (order) => {
    setSelectedInvoice(order);
    setInvoiceDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setInvoiceDialogOpen(false);
    setSelectedInvoice(null);
  };

  const handlePrint = () => {
    console.log("Printing invoice...");
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.autoPrint(); // Automatically trigger the print dialog
      window.open(pdf.output("bloburl"), "_blank"); // Open the PDF in a new tab
    }).catch((error) => {
      console.error("Error generating PDF:", error);
    });
  };

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <Box p={3}>
      <style>
        {`
          @media print {
            body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 12px;
              line-height: 1.2;
            }
            .dot-matrix {
              border: 1px solid #000;
              padding: 10px;
              width: 100%;
              max-width: 8.5in; /* Standard width for dot-matrix printers */
              margin: 0 auto;
            }
            .dot-matrix table {
              width: 100%;
              border-collapse: collapse;
            }
            .dot-matrix th, .dot-matrix td {
              border: 1px solid #000;
              padding: 5px;
              text-align: left;
            }
            .dot-matrix th {
              background-color: #f9f9f9;
            }
            .dot-matrix .header, .dot-matrix .footer {
              text-align: center;
              margin-bottom: 10px;
            }
            .dot-matrix .footer {
              margin-top: 20px;
            }
            .no-print {
              display: none;
            }
          }
        `}
      </style>

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

      <ListComponent
        items={filteredOrders}
        onEdit={handleGenerateInvoice}
        onDelete={() => {}}
        isOrder={true} // Ensure it's marked as orders
      />

      {/* Invoice Dialog */}
      <Dialog open={invoiceDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Invoice</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box ref={invoiceRef} className="dot-matrix">
              {/* Header */}
              <Box className="header" mb={2}>
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
                      <strong>Order ID:</strong> {selectedInvoice.order_id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Token No:</strong> {selectedInvoice.token_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" textAlign="right">
                      <strong>Order Date:</strong> {selectedInvoice.createdAt}
                    </Typography>
                    <Typography variant="body2" textAlign="right">
                      <strong>Customer:</strong> {selectedInvoice.customer_name}
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
              <Box className="footer" mt={3}>
                <Typography variant="body2">
                  Payment Status:{" "}
                  <strong>{selectedInvoice.payment_status}</strong>
                </Typography>
                <Typography variant="body2" mt={1}>
                  Thank you for dining with us! 🙏
                </Typography>
              </Box>

              {/* Print Button */}
              <Box textAlign="center" mt={2} className="no-print">
                <Button
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
