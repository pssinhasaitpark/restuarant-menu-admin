import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import ListComponent from "../../components/ListComponents/ListComponents";
import { fetchCustomers } from "../../redux/slices/customerDetailsSlice";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [filterBy, setFilterBy] = useState("customer_name");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = customers.filter((item) => {
    const value = searchValue.toLowerCase();
    if (filterBy === "customer_name") {
      return item.customer_name?.toLowerCase().includes(value);
    }
    if (filterBy === "location") {
      return item.restaurant.location?.toLowerCase().includes(value);
    }
    return true;
  });

  useEffect(() => {
    if (page > Math.ceil(filteredCustomers.length / itemsPerPage)) {
      setPage(1);
    }
  }, [filteredCustomers, page, itemsPerPage]);

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  if (loading) {
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

  if (error && !customers.length) {
    console.error("Customer fetch error:", error); 
  }
  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Filter By</InputLabel>
            <Select value={filterBy} label="Filter By" onChange={handleFilterChange}>
              <MenuItem value="customer_name">Customer Name</MenuItem>
              <MenuItem value="location">Location</MenuItem>
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

      <ListComponent
        items={paginatedCustomers}
        noDataMessage="No customers match your search."
      />

      {filteredCustomers.length > 0 && (
        <CustomPagination
          page={page}
          count={pageCount}
          onChange={(_, value) => setPage(value)}
        />
      )}
    </Box>
  );
};

export default CustomerList;
