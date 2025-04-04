import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ListComponent from "../ListComponents/ListComponents";
import ConfirmationDialog from "../ConfirtmationDialog";
import RestaurantForm from "../Forms/RestaurantForm";
import {
  fetchRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  fetchRestaurantById,
} from "../../redux/slices/restaurantSlice";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteRestaurantId, setDeleteRestaurantId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setEditingRestaurant(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveRestaurant = async (restaurantData) => {
    if (editingRestaurant) {
      await dispatch(
        updateRestaurant({ id: editingRestaurant.id, restaurantData })
      );
    } else {
      await dispatch(createRestaurant(restaurantData));
    }
    dispatch(fetchRestaurants());
    handleCloseDialog();
  };

  const handleEditRestaurant = async (id) => {
    try {
      const response = await dispatch(fetchRestaurantById(id)).unwrap();
      setEditingRestaurant(response);
      setOpenDialog(true);
    } catch (error) {
      console.error("Failed to fetch restaurant details:", error);
    }
  };

  const handleDeleteRestaurant = (id) => {
    setDeleteRestaurantId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteRestaurantId) {
      await dispatch(deleteRestaurant(deleteRestaurantId));
      setOpenDeleteDialog(false);
      dispatch(fetchRestaurants());
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button variant="contained" color="success" onClick={handleOpenDialog}>
          Create Restaurant
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
          items={restaurants}
          onEdit={handleEditRestaurant}
          onDelete={handleDeleteRestaurant}
          isRestaurant={true}
        />
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <RestaurantForm
          initialValues={
            editingRestaurant || {
              restaurant_name: "",
              owner_name: "",
              email: "",
              mobile: "",
              location: "",
            }
          }
          onSave={handleSaveRestaurant}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default RestaurantList;
