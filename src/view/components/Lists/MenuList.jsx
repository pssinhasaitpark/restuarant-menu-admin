import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ConfirmationDialog from "../ConfirtmationDialog";
import MenuForm from "../Forms/menu";
import MenuCardList from "../Card/MenuCardList";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  resetMenuState,
  fetchQrCode,
  getMenuItemById,
} from "../../redux/slices/createmenuSlice";

const RestaurantMenuList = () => {
  const dispatch = useDispatch();
  const {
    items: menuItems,
    loading,
    error,
    success,
  } = useSelector((state) => state.createmenu);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteMenuItemId, setDeleteMenuItemId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getMenuItems());
      dispatch(resetMenuState());
      setEditingMenuItem(null);
      setOpenDialog(false);
      setIsEdit(false);
      setOpenSnackbar(true);
    }
  }, [success, dispatch]);

  const handleOpenDialog = () => {
    setEditingMenuItem(null);
    setIsEdit(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMenuItem(null);
    setIsEdit(false);
  };

  const handleDeleteMenuItem = (id) => {
    setDeleteMenuItemId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteMenuItemId) {
      await dispatch(deleteMenuItem(deleteMenuItemId));
      setOpenDeleteDialog(false);

      const totalItems = menuItems.reduce(
        (acc, cat) => acc + cat.menu_items.length,
        0
      );
      const newPageCount = Math.ceil((totalItems - 1) / 12);
      if (page > newPageCount && newPageCount > 0) {
        setPage(newPageCount);
      }
    }
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("category_name", values.category_name);

    values.items.forEach((item, index) => {
      formData.append(`items[${index}][item_name]`, item.item_name);
      formData.append(`items[${index}][item_price]`, item.item_price);

      if (item.images) {
        if (Array.isArray(item.images)) {
          // For handling FileList objects
          for (let i = 0; i < item.images.length; i++) {
            formData.append("images", item.images[i]);
          }
        } else if (item.images instanceof File) {
          // For handling single File objects
          formData.append("images", item.images);
        }
      }
    });

    if (isEdit && values.id) {
      dispatch(updateMenuItem({ id: values.id, formData }));
    } else {
      dispatch(createMenuItem(formData));
    }
  };

  const handleEdit = async (item) => {
    setFormLoading(true);
    setIsEdit(true);
    setOpenDialog(true);

    try {
      const result = await dispatch(getMenuItemById(item.id));
      const payload = result?.payload;

      if (payload) {
        console.log("Fetched Payload:", payload);

        const formattedData = {
          id: payload.id,
          category_name: payload.category_name || "",
          items: [
            {
              item_name: payload.item_name || "",
              item_price: payload.item_price || "",
              images: payload.images || [],
            },
          ],
        };

        console.log("Formatted Data for Editing:", formattedData);

        setEditingMenuItem(formattedData);
      }
    } catch (error) {
      console.error("Error fetching menu item:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDuplicate = (item) => {
    const { id, image, ...rest } = item;
    setEditingMenuItem({ ...rest, name: `${item.name} (Copy)` });

    setIsEdit(false);
    setOpenDialog(true);
  };

  const handleViewQR = async () => {
    const firstItem = menuItems.flatMap((cat) => cat.menu_items)[0];
    if (!firstItem) return alert("No menu item available");

    const res = await dispatch(fetchQrCode(firstItem.id));
    const url = res?.payload;
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("QR code not available");
    }
  };

  const handleView = (item) => {
    alert(`Viewing: ${item.name}`);
  };

  if (loading && !openDialog) {
    return (
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
    );
  }

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      {/* Top Bar Buttons */}
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
          <Button variant="outlined" color="primary" onClick={handleViewQR}>
            View And Download QR
          </Button>
        </Box>

        <Button variant="contained" color="success" onClick={handleOpenDialog}>
          Add Menu Item
        </Button>
      </Box>

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />

      {menuItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            No Items available.
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleOpenDialog}
          >
            Add Menu Item
          </Button>
        </Box>
      ) : (
        <MenuCardList
          items={menuItems}
          onEdit={handleEdit}
          onDelete={handleDeleteMenuItem}
          onDuplicate={handleDuplicate}
          onView={handleView}
          page={page}
          setPage={setPage}
        />
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          {formLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <MenuForm
              initialValues={editingMenuItem}
              isEdit={isEdit}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseDialog}
              loading={loading}
            />
          )}
        </Box>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Menu item {isEdit ? "updated" : "created"} successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RestaurantMenuList;
