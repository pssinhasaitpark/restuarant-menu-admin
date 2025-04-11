import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import StockForm from "../Forms/StockForm";

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      itemName: "Tomatoes",
      category: "Vegetables",
      quantity: 20,
      unit: "kg",
      supplier: "Fresh Farm",
      purchaseDate: "2025-04-01",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setOpenDialog(false);
  };

  const handleSaveItem = (data) => {
    if (editingItem) {
      setStockItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...data, id: item.id } : item))
      );
    } else {
      setStockItems((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setStockItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Stock Management
      </Typography>
      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Add Stock Item
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.purchaseDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(item)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <StockForm
          initialValues={editingItem}
          onClose={handleCloseDialog}
          onSave={handleSaveItem}
        />
      </Dialog>
    </Box>
  );
};

export default StockManagement;
