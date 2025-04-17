import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
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
import ListComponent from "../ListComponents/ListComponents";
import ConfirmationDialog from "../ConfirtmationDialog";
import CreateStaffForm from "../../pages/StaffForm/StaffForm";
import CustomPagination from "../CustomPagination/CustomPagination";

import {
  fetchAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../../redux/slices/staffSlice";

const StaffList = () => {
  const dispatch = useDispatch();
  const { staffList, loading, error } = useSelector((state) => state.staff);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTableId, setDeleteTableId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  const [filterBy, setFilterBy] = useState("first_name");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchAllStaff());
  }, [dispatch]);

  const filterStaffList = Array.isArray(staffList)
    ? staffList.filter((item) => {
        const value = searchValue.toLowerCase();
        if (filterBy === "first_name") {
          return item.first_name?.toLowerCase().includes(value);
        }
        if (filterBy === "designation") {
          return item.designation?.toLowerCase().includes(value);
        }
        return true;
      })
    : [];

  useEffect(() => {
    if (page > Math.ceil(filterStaffList.length / itemsPerPage)) {
      setPage(1);
    }
  }, [filterStaffList, page, itemsPerPage]);

  const handleOpenDialog = () => {
    setEditingTable(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveTable = async (tableData) => {
    if (editingTable) {
      await dispatch(updateStaff({ id: editingTable.id, tableData }));
    } else {
      await dispatch(createStaff(tableData));
    }
    dispatch(fetchAllStaff());
    handleCloseDialog();
  };

  const handleEditTable = (id) => {
    const selectedStaff = staffList.find((staff) => staff.id === id);
    if (selectedStaff) {
      setEditingTable(selectedStaff);
      setOpenDialog(true);
    }
  };

  const handleDeleteTable = (id) => {
    setDeleteTableId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTableId) {
      await dispatch(deleteStaff(deleteTableId));
      dispatch(fetchAllStaff());
      setOpenDeleteDialog(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTables = filterStaffList.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const pageCount = Math.ceil(filterStaffList.length / itemsPerPage);

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 2 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        {/* Filter Section (Left) */}
        <Grid item xs={12} sm={8} md={9} lg={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filter By</InputLabel>
                <Select
                  value={filterBy}
                  label="Filter By"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="first_name">First Name</MenuItem>
                  <MenuItem value="designation">Designation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label={`Search by ${filterBy}`}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Add Button (Right) */}
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={3}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenDialog}
          >
            Add Staff Member
          </Button>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* List and Pagination */}
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
      )  : (
        <>
          <ListComponent
            items={paginatedTables}
            onEdit={handleEditTable}
            onDelete={handleDeleteTable}
            isStaff={true}
          />
          <CustomPagination
            page={page}
            count={pageCount}
            onChange={(_, value) => setPage(value)}
          />
        </>
      )}

      {/* Staff Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 2 }}>
          <CreateStaffForm
            editingTable={editingTable}
            onClose={handleCloseDialog}
            onSave={handleSaveTable}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default StaffList;