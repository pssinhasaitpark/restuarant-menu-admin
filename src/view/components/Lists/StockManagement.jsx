import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStockItems,
  createStockItem,
  updateStockItem,
  deleteStockItem,
} from "../../redux/slices/stockSlice";
import StockForm from "../Forms/StockForm";
import ListComponent from "../ListComponents/ListComponents";

const StockManagement = () => {
  const dispatch = useDispatch();
  const { items: stockItems, loading } = useSelector((state) => state.stock);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    dispatch(fetchAllStockItems());
  }, [dispatch]);

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
      dispatch(updateStockItem({ id: editingItem.id, data })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchAllStockItems());
          handleCloseDialog();
        }
      });
    } else {
      dispatch(createStockItem(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchAllStockItems());
          handleCloseDialog();
        }
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteStockItem(id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h5" mb={3}>
            Stock Management
          </Typography>
        </Box>

        <Button variant="contained" color="success" onClick={handleOpenDialog}>
          Add Stock Item
        </Button>
      </Box>

      <ListComponent
        items={stockItems}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        handleOpenDialog={handleOpenDialog}
        handleDelete={handleDelete}
        isStock={true}
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
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
