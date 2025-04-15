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
  fetchTableById,
} from "../../redux/slices/createtableSlice";

const RestaurantTableList = () => {
  const dispatch = useDispatch();
  const { tables, loading, error, tableDetails } = useSelector(
    (state) => state.createtable
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTableId, setDeleteTableId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

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

    return true;
  });

  useEffect(() => {
    if (page > Math.ceil(tables.length / itemsPerPage)) {
      setPage(1);
    }
  }, [tables, page, itemsPerPage]);

  const handleOpenDialog = () => {
    setEditingTable(null);
    setIsEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTable(null);
    setIsEditMode(false);
  };

  const handleSaveTable = async (tableData) => {
    if (isEditMode && editingTable) {
      await dispatch(updateTable({ id: editingTable, tableData }));
    } else {
      await dispatch(createTable(tableData));
    }
    dispatch(fetchTables());
    handleCloseDialog();
  };

  const handleEditTable = async (table) => {
    console.log("Editing table object:", table);
    console.log("Editing table with ID:", table.id);
    await dispatch(fetchTableById(table));
    setEditingTable(table);
    setIsEditMode(true);
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Filter By</InputLabel>
              <Select
                value={filterBy}
                label="Filter By"
                onChange={handleFilterChange}
              >
                <MenuItem value="table_number">Table Number</MenuItem>
                <MenuItem value="capacity">Capacity</MenuItem>
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

      {loading && !openDialog ? (
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
          />
          <CustomPagination
            page={page}
            count={pageCount}
            onChange={(_, value) => setPage(value)}
          />
        </>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          {isEditMode && !tableDetails ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <CreateTableForm
              onSave={handleSaveTable}
              onClose={handleCloseDialog}
              editingTable={isEditMode ? tableDetails : null}
              isAddMore={isEditMode ? true : false}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default RestaurantTableList;
