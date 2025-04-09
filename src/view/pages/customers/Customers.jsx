import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import ListComponent from "../../components/ListComponents/ListComponents";
import { fetchCustomers } from "../../redux/slices/customerDetailsSlice";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

    useEffect(() => {
      if (page > Math.ceil(customers.length / itemsPerPage)) {
        setPage(1);
      }
    }, [customers, page, itemsPerPage]);

  if (loading) {
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <CircularProgress />
    </Box>;
  }
  if (error) {
    <Typography variant="h6" color="error">
      {error.message}
    </Typography>;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedcustomers = customers.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  return (
    <Box sx={{ p: 3, textAlign: "center", mt: 4 }}>
      {customers.length === 0 ? (
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
            No customers available.
          </Typography>
        </Box>
      ) : (
      <>
        <ListComponent items={paginatedcustomers} isRestaurant={false} />
        <CustomPagination
            page={page}
            count={pageCount}
            onChange={(_, value) => setPage(value)}
          />
      </>
      )}
    </Box>
  );
};

export default CustomerList;
