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
import CreateTableForm from "../Forms/CreateTableForm";
import CustomPagination from "../CustomPagination/CustomPagination";

import {
  fetchTables,
  createTable,
  updateTable,
  deleteTable,
} from "../../redux/slices/createtableSlice";

const RestaurantTableList = () => {
  const dispatch = useDispatch();
  const { tables, loading, error } = useSelector((state) => state.createtable);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTableId, setDeleteTableId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // search filter
  const [filterBy, setFilterBy] = useState("table_number");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const filterRestauranttable = tables.filter((item) => {
    const value = searchValue.toLowerCase();

    if (filterBy === "table_number") {
      return item.table_number?.toString().toLowerCase().includes(value);
    }

    if (filterBy === "capacity") {
      return item.capacity?.toString().toLowerCase().includes(value);
    }

    return true; // Optional: to handle other filterBy values gracefully
  });

  useEffect(() => {
    if (page > Math.ceil(tables.length / itemsPerPage)) {
      setPage(1);
    }
  }, [tables, page, itemsPerPage]);

  const handleOpenDialog = () => {
    setEditingTable(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveTable = async (tableData) => {
    if (editingTable) {
      await dispatch(updateTable({ id: editingTable.id, tableData }));
    } else {
      await dispatch(createTable(tableData));
    }
    dispatch(fetchTables());
    handleCloseDialog();
  };

  const handleEditTable = (table) => {
    setEditingTable(table);
    setOpenDialog(true);
  };

  const handleDeleteTable = (id) => {
    setDeleteTableId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTableId) {
      await dispatch(deleteTable(deleteTableId));
      setOpenDeleteDialog(false);
      dispatch(fetchTables());
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
  const paginatedTables = filterRestauranttable.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const pageCount = Math.ceil(filterRestauranttable.length / itemsPerPage);

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
        <Grid container spacing={2} >
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Filter By</InputLabel>
              <Select
                value={filterBy}
                label="Filter By"
                onChange={handleFilterChange}
              >
                <MenuItem value="table_number">table_number</MenuItem>
                <MenuItem value="capacity">capacity</MenuItem>
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
            Create Table
          </Button>
        </Grid>
      </Grid>

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
        <>
          <ListComponent
            items={paginatedTables}
            onEdit={handleEditTable}
            onDelete={handleDeleteTable}
            isTable={true}
            // searchTerm={searchText}
          />
          <CustomPagination
            page={page}
            count={pageCount}
            onChange={(_, value) => setPage(value)}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
        <Box sx={{ p: 2 }}>
          <CreateTableForm
            onSave={handleSaveTable}
            onClose={handleCloseDialog}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default RestaurantTableList;
