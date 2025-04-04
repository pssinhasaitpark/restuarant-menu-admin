import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, Box, Typography, CircularProgress } from "@mui/material";
import ListComponent from "../ListComponents/ListComponents";
import ConfirmationDialog from "../ConfirtmationDialog";
import MenuListForm from "../Forms/MenuListForm";
import { fetchMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../../redux/slices/createmenuSlice";

const RestaurantMenuList = () => {
  const dispatch = useDispatch();
  const { menuItems, loading, error } = useSelector((state) => state.createmenu);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteMenuItemId, setDeleteMenuItemId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setEditingMenuItem(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveMenuItem = async (menuData) => {
    if (editingMenuItem) {
      await dispatch(updateMenuItem({ id: editingMenuItem.id, menuData }));
    } else {
      await dispatch(createMenuItem(menuData));
    }
    dispatch(fetchMenuItems());
    handleCloseDialog();
  };

  const handleEditMenuItem = (menuItem) => {
    setEditingMenuItem(menuItem);
    setOpenDialog(true);
  };

  const handleDeleteMenuItem = (id) => {
    setDeleteMenuItemId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteMenuItemId) {
      await dispatch(deleteMenuItem(deleteMenuItemId));
      setOpenDeleteDialog(false);
      dispatch(fetchMenuItems());
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button variant="contained" color="success" onClick={handleOpenDialog}>
          Add Menu Item
        </Button>
      </Box>

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        <ListComponent
          items={menuItems}
          onEdit={handleEditMenuItem}
          onDelete={handleDeleteMenuItem}
          isMenu={true}
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 2 }}>
          <MenuListForm 
            onSave={handleSaveMenuItem} 
            onClose={handleCloseDialog} 
            initialData={editingMenuItem} 
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default RestaurantMenuList;
