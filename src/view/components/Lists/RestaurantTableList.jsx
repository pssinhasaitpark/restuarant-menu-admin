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
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);


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

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTables = tables.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(tables.length / itemsPerPage);

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button variant="contained" color="success" onClick={handleOpenDialog}>
          Create Table
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
          <CreateTableForm onSave={handleSaveTable} onClose={handleCloseDialog} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default RestaurantTableList;
