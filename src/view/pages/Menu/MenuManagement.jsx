import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MenuManagement = () => {
  const navigate = useNavigate();

  // Static menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 12.99 },
    { id: 2, name: "Cheeseburger", category: "Burger", price: 9.99 },
    { id: 3, name: "Pasta Alfredo", category: "Pasta", price: 14.99 },
  ]);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
    }
  };

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Menu Management
      </Typography>

      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={() => navigate("/add-menu-item")}
        sx={{ mb: 2, }}
      >
        Add New Item
      </Button>

      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell><b>#</b></TableCell>
              <TableCell><b>Item Name</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.length > 0 ? (
              menuItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => navigate(`/edit-menu-item/${item.id}`)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No menu items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MenuManagement;
