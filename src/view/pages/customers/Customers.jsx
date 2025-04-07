import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import ListComponent from "../../components/ListComponents/ListComponents";
import { fetchCustomers } from "../../redux/slices/customerDetailsSlice";

const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
if(loading){
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
  <CircularProgress />
</Box>
}
if(error){
  <Typography variant="h6" color="error">
  {error.message}
</Typography>
}

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
        <ListComponent
          items={customers}
          isRestaurant={false}
        />
      )}
    </Box>
  );
};

export default CustomerList;
