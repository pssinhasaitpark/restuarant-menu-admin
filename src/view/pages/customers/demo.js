import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/slices/customerDetailsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);
  console.log("abc", customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const onEdit = (id) => {
    // Handle edit action
    console.log("Edit customer with ID:", id);
  };

  const onDelete = (id) => {
    // Handle delete action
    console.log("Delete customer with ID:", id);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Customer Name</strong>
            </TableCell>
            <TableCell>
              <strong>Contact No</strong>
            </TableCell>
            <TableCell>
              <strong>Booking Time</strong>
            </TableCell>
            <TableCell>
              <strong>Number of People</strong>
            </TableCell>
            <TableCell>
              <strong>Total Charge</strong>
            </TableCell>
            <TableCell>
              <strong>Table number</strong>
            </TableCell>
            <TableCell>
              <strong>capacity</strong>
            </TableCell>
            <TableCell>
              <strong>status</strong>
            </TableCell>
            <TableCell>
              <strong>restaurant_name</strong>
            </TableCell>
            <TableCell>
              <strong>Location</strong>
            </TableCell>
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.customer_name}</TableCell>
                <TableCell>{customer.contact_no}</TableCell>
                <TableCell>{customer.booking_time}</TableCell>
                <TableCell>{customer.num_of_people}</TableCell>
                <TableCell>${customer.total_charge}</TableCell>
                <TableCell>{customer.table.table_number}</TableCell>
                <TableCell>{customer.table.capacity}</TableCell>
                <TableCell>{customer.table.status}</TableCell>
                <TableCell>{customer.restaurant.restaurant_name}</TableCell>
                <TableCell>{customer.restaurant.location}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="success"
                      onClick={() => onEdit(customer.id)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(customer.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No customers available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerList;
