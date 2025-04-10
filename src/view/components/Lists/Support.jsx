import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import ListComponent from "../../components/ListComponents/ListComponents";
import CustomPagination from "../CustomPagination/CustomPagination";
import ConfirmationDialog from "../ConfirtmationDialog";
import {
  fetchSupportQuery,
  deleteSupportQuery,
} from "../../redux/slices/supportSlice";

const Support = () => {
  const dispatch = useDispatch();
  const { support, loading, error } = useSelector((state) => state.support);

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Search Filter States
  const [filterBy, setFilterBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchSupportQuery());
  }, [dispatch]);

  // 🔍 Filter the support data
  const filteredSupport = support.filter((item) => {
    const value = searchValue.toLowerCase();
    if (filterBy === "name") {
      return item.name?.toLowerCase().includes(value);
    }
    if (filterBy === "email") {
      return item.email?.toLowerCase().includes(value);
    }
    return true;
  });

  // Reset page if filtered results get shorter
  useEffect(() => {
    if (page > Math.ceil(filteredSupport.length / itemsPerPage)) {
      setPage(1);
    }
  }, [filteredSupport, page, itemsPerPage]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedId) {
      dispatch(deleteSupportQuery(selectedId)).then(() => {
        dispatch(fetchSupportQuery());
      });
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedSupport = filteredSupport.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(filteredSupport.length / itemsPerPage);

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

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      {/* 🔍 Filter Controls */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Filter By</InputLabel>
            <Select value={filterBy} label="Filter By" onChange={handleFilterChange}>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={`Search by ${filterBy}`}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>

      {filteredSupport.length === 0 ? (
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

      {/* 🗑️ Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default Support;
