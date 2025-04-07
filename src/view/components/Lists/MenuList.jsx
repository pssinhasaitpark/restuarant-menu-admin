// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Button,
//   Dialog,
//   Box,
//   Typography,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import ListComponent from "../ListComponents/ListComponents";
// import ConfirmationDialog from "../ConfirtmationDialog";
// import MenuForm from "../Forms/menu";

// import {
//   getMenuItems,
//   createMenuItem,
//   updateMenuItem,
//   deleteMenuItem,
//   resetMenuState,
// } from "../../redux/slices/createmenuSlice";

// const RestaurantMenuList = () => {
//   const dispatch = useDispatch();
//   const {
//     items: menuItems,
//     loading,
//     error,
//     success,
//   } = useSelector((state) => state.createmenu);

//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [deleteMenuItemId, setDeleteMenuItemId] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingMenuItem, setEditingMenuItem] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   // Fetch all menu items on load
//   useEffect(() => {
//     dispatch(getMenuItems());
//   }, [dispatch]);

//   // Show success message
//   useEffect(() => {
//     if (success) {
//       setOpenSnackbar(true);
//       dispatch(getMenuItems()); // refresh list
//       dispatch(resetMenuState()); // reset state after success
//       handleCloseDialog();
//     }
//   }, [success, dispatch]);

//   const handleOpenDialog = () => {
//     setEditingMenuItem(null);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingMenuItem(null);
//   };

//   const handleDeleteMenuItem = (id) => {
//     setDeleteMenuItemId(id);
//     setOpenDeleteDialog(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (deleteMenuItemId) {
//       await dispatch(deleteMenuItem(deleteMenuItemId));
//       setOpenDeleteDialog(false);
//     }
//   };

//   const handleFormSubmit = (values) => {
//     const formData = new FormData();
//     for (const key in values) {
//       if (values[key]) formData.append(key, values[key]);
//     }

//     if (editingMenuItem) {
//       dispatch(updateMenuItem({ id: editingMenuItem.id, formData }));
//     } else {
//       dispatch(createMenuItem(formData));
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingMenuItem(item);
//     setOpenDialog(true);
//   };

//   return (
//     <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//         <Button variant="contained" color="success" onClick={handleOpenDialog}>
//           Add Menu Item
//         </Button>
//       </Box>

//       <ConfirmationDialog
//         open={openDeleteDialog}
//         onClose={() => setOpenDeleteDialog(false)}
//         onConfirm={handleConfirmDelete}
//       />

//       {loading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "50vh",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       ) : (
//         <ListComponent
//           items={menuItems}
//           onEdit={handleEdit}
//           onDelete={handleDeleteMenuItem}
//           isMenu={true}
//         />
//       )}

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <Box sx={{ p: 2 }}>
//           <MenuForm
//             initialValues={editingMenuItem}
//             onSubmit={handleFormSubmit}
//             isEdit={Boolean(editingMenuItem)}
//             onCancel={handleCloseDialog}
//             loading={loading}
//           />
//         </Box>
//       </Dialog>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
//           Menu item {editingMenuItem ? "updated" : "created"} successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default RestaurantMenuList;








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

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setOpenSnackbar(true);
      dispatch(getMenuItems());
      dispatch(resetMenuState());
      handleCloseDialog();
    }
  }, [success, dispatch]);

  const handleOpenDialog = () => {
    setEditingMenuItem(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMenuItem(null);
  };

  const handleDeleteMenuItem = (id) => {
    setDeleteMenuItemId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteMenuItemId) {
      await dispatch(deleteMenuItem(deleteMenuItemId));
      setOpenDeleteDialog(false);
    }
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (values[key]) formData.append(key, values[key]);
    }

    if (editingMenuItem) {
      dispatch(updateMenuItem({ id: editingMenuItem.id, formData }));
    } else {
      dispatch(createMenuItem(formData));
    }
  };

  const handleEdit = (item) => {
    setEditingMenuItem(item);
    setOpenDialog(true);
  };

  const handleDuplicate = (item) => {
    const { id, image, ...rest } = item;
    setEditingMenuItem({ ...rest, name: `${item.name} (Copy)` });
    setOpenDialog(true);
  };

  const handleView = (item) => {
    alert(`Viewing: ${item.name}`);
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Typography variant="h6" color="error">
        {typeof error.message === "string" ? error.message : "Something went wrong."}
      </Typography>
    );
  }
  

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
              </Box>
      ) : (
        <MenuCardList
          items={menuItems}
          onEdit={handleEdit}
          onDelete={handleDeleteMenuItem}
          onDuplicate={handleDuplicate}
          onView={handleView}
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 2 }}>
          <MenuForm
            initialValues={editingMenuItem}
            onSubmit={handleFormSubmit}
            isEdit={Boolean(editingMenuItem)}
            onCancel={handleCloseDialog}
            loading={loading}
          />
        </Box>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Menu item {editingMenuItem ? "updated" : "created"} successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RestaurantMenuList;
