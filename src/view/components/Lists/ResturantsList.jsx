import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Box,
  Typography,
  CircularProgress,
  Pagination,
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
  const [editLoading, setEditLoading] = useState(false);

  // Frontend pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(restaurants.length / itemsPerPage);
  const paginatedData = restaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      setEditLoading(true);
      const response = await dispatch(fetchRestaurantById(id)).unwrap();
      const restaurantData = response[0];
      setEditingRestaurant(restaurantData);
      setOpenDialog(true);
    } catch (error) {
      console.error("Failed to fetch restaurant details:", error);
    } finally {
      setEditLoading(false);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

      {loading || editLoading ? (
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
        <>
          <ListComponent
            items={paginatedData}
            onEdit={handleEditRestaurant}
            onDelete={handleDeleteRestaurant}
            isRestaurant={true}
          />
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {editLoading ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <RestaurantForm
            initialValues={
              editingRestaurant
                ? editingRestaurant
                : {
                    restaurant_name: "",
                    owner_name: "",
                    email: "",
                    mobile: "",
                    location: "",
                    opening_time: "",
                    closing_time: "",
                    logo: "",
                    images: [],
                  }
            }
            onSave={handleSaveRestaurant}
            onClose={handleCloseDialog}
            enableReinitialize
          />
        )}
      </Dialog>
    </Box>
  );
};

export default RestaurantList;
