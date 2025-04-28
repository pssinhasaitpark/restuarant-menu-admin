import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import ListComponent from "../ListComponents/ListComponents";
import CustomPagination from "../CustomPagination/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { debounce } from "lodash";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const invoiceRef = useRef();
  const { orders } = useSelector((state) => state.orders);

  const [filters, setFilters] = useState({
    searchValue: "",
    filterType: "orderId", 
    fromDate: "",
    toDate: "",
    orderStatus: "",
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const debouncedSearch = debounce((value) => {
    const filtered = orders.filter((order) => {
      if (filters.filterType === "orderId") {
        return order.order_id?.toLowerCase().includes(value.toLowerCase());
      }
      if (filters.filterType === "customerName") {
        return order.customer_name?.toLowerCase().includes(value.toLowerCase());
      }
      if (filters.filterType === "tokenNumber") {
        return order.token_number?.toString().toLowerCase().includes(value.toLowerCase());
      }
      return true;
    });

    setFilteredOrders(filtered);
  }, 500);

  useEffect(() => {
    if (page > Math.ceil(filteredOrders.length / itemsPerPage)) {
      setPage(1);
    }
  }, [filteredOrders, page, itemsPerPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevState) => {
      const updatedFilters = { ...prevState, [name]: value };
      if (name === "searchValue") {
        debouncedSearch(value);
      }
      return updatedFilters;
    });
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
    html2canvas(invoiceRef.current)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", [120, 200]);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        window.open(pdf.output("bloburl"), "_blank");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <Box p={3}>
      <style>
        {`
          @media print {
            .thermal-print {
              width: 80mm;
              margin: 0 auto;
              padding: 10px;
              border: 1px solid #000;
            }
            .thermal-print table {
              width: 100%;
              border-collapse: collapse;
            }
            .thermal-print th, .thermal-print td {
              border: 1px solid #000;
              padding: 5px;
              text-align: left;
            }
            .thermal-print .header, .thermal-print .footer {
              text-align: center;
              margin-bottom: 10px;
            }
            .no-print {
              display: none;
            }
          }
        `}
      </style>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Filter Type"
            name="filterType"
            value={filters.filterType}
            onChange={handleFilterChange}
          >
            <MenuItem value="orderId">Order ID</MenuItem>
            <MenuItem value="customerName">Customer Name</MenuItem>
            <MenuItem value="tokenNumber">Token Number</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search"
            name="searchValue"
            value={filters.searchValue}
            onChange={handleFilterChange}
            placeholder="Search by Order ID, Name, or Token Number"
          />
        </Grid>
      </Grid>

      <ListComponent
        items={paginatedOrders}
        onEdit={handleGenerateInvoice}
        onDelete={() => {}}
        isOrder={true}
      />
      <CustomPagination
        page={page}
        count={pageCount}
        onChange={(_, value) => setPage(value)}
      />

      <Dialog open={invoiceDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Invoice</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box ref={invoiceRef} className="thermal-print">
              <Box className="header" mb={2} textAlign="center">
                <Typography variant="h6" fontWeight="bold">
                  🍽️
                  {selectedInvoice.restaurant?.name || "Restaurant Name"}
                </Typography>
                <Typography variant="body2">
                  Address: {selectedInvoice.restaurant?.location || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Email: {selectedInvoice.restaurant?.email || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Contact: +91 {selectedInvoice.restaurant?.mobile || "N/A"}
                </Typography>
                <Typography variant="body2">GSTIN: 29ABCDE1234F2Z5</Typography>
              </Box>

              <Box mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Order ID:</strong> {selectedInvoice.order_id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Token No:</strong> {selectedInvoice.token_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Customer:</strong> {selectedInvoice.customer_name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Order Date:</strong>{" "}
                      {new Date(selectedInvoice.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Table size="small" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Item</strong></TableCell>
                    <TableCell align="center"><strong>Qty</strong></TableCell>
                    <TableCell align="right"><strong>Rate (₹)</strong></TableCell>
                    <TableCell align="right"><strong>Amount (₹)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedInvoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">{item.price.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        {(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

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
                        ₹{(calculateTotal(selectedInvoice.items) * 0.05).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="h6">Total Payable:</Typography>
                      <Typography variant="h6">
                        ₹{(calculateTotal(selectedInvoice.items) * 1.05).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box className="footer" mt={3}>
                <Typography variant="body2" textAlign="center">
                  Thank you for dining with us! 🙏
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <Box textAlign="center" mt={2} className="no-print">
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Generate PDF
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default OrderManagement;
