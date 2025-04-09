import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import ListComponent from "../../components/ListComponents/ListComponents";
import CustomPagination from "../CustomPagination/CustomPagination";
import ConfirmationDialog from "../ConfirtmationDialog";
import { fetchSupportQuery, deleteSupportQuery } from "../../redux/slices/supportSlice";

const Support = () => {
  const dispatch = useDispatch();
  const { support, loading, error } = useSelector((state) => state.support);

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchSupportQuery());
  }, [dispatch]);

  useEffect(() => {
    if (page > Math.ceil(support.length / itemsPerPage)) {
      setPage(1);
    }
  }, [support, page, itemsPerPage]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedId) {
      dispatch(deleteSupportQuery(selectedId)).then(() => {
        dispatch(fetchSupportQuery()); // refresh list after deletion
      });
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedId(null);
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
      <Typography variant="h6" color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedSupport = support.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(support.length / itemsPerPage);

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      {support.length === 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}>
          <Typography variant="h6" color="textSecondary">
            No Query available.
          </Typography>
        </Box>
      ) : (
        <>
          <ListComponent
            items={paginatedSupport}
            isSupport={true}
            onDelete={handleDeleteClick}
          />
          <CustomPagination
            page={page}
            count={pageCount}
            onChange={(_, value) => setPage(value)}
          />
        </>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default Support;
