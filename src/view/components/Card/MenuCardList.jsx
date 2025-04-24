import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CustomPagination from "../CustomPagination/CustomPagination";

const MenuCardList = ({
  items,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  page,
  setPage,
}) => {
  const itemsPerPage = 12;

  const flatItems = items
    .flatMap((category) =>
      category.menu_items?.map((item) => ({
        ...item,
        category_name: category.category_name,
      }))
    )
    .filter(Boolean);

  const pageCount = Math.ceil(flatItems.length / itemsPerPage);

  useEffect(() => {
    if (page > pageCount && pageCount > 0) {
      setPage(pageCount);
    }
  }, [flatItems.length, pageCount, page, setPage]);

  const paginatedItems = flatItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="start" gap={2}>
        {paginatedItems.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              width: { xs: "100%", sm: "45%", md: "30%", lg: "22%", xl: "14%" },
              mb: 3,
              mr: { xs: 0, xl: (index + 1) % 6 === 0 ? 0 : 3.8 },
            }}
          >
            <Card sx={{ borderRadius: 4, boxShadow: 3, height: "94%" }}>
              <CardMedia
                component="img"
                height="156"
                image={
                  item.image ||
                  (Array.isArray(item.images) && item.images[0]) ||
                  "/placeholder.jpg"
                }
                alt={item.item_name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                  {item?.item_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.category_name || "Category"} / {item.type || ""}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }} color="primary">
                  ₹ {item.item_price}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Tooltip title="View">
                    <IconButton onClick={() => onView(item)} color="success">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(item)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip title="Duplicate">
                    <IconButton onClick={() => onDuplicate(item)} color="info">
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip> */}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <CustomPagination
        page={page}
        count={pageCount}
        onChange={handlePageChange}
      />
    </>
  );
};

export default MenuCardList;
