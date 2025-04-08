import React from "react";
import { Box, Pagination } from "@mui/material";

const CustomPagination = ({ page, count, onChange }) => {
  if (count <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        size="large"
      />
    </Box>
  );
};

export default CustomPagination;
