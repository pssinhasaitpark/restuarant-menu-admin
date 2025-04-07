import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const MenuCardList = ({ items, onEdit, onDelete, onDuplicate, onView }) => {
  return (
    <Grid container spacing={3}>
      {items.map((category) =>
        category.menu_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={item.images?.[0] || "/placeholder.jpg"}
                alt={item.item_name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.item_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.category_name || "Category"} / {item.type || ""}
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
                  <Tooltip title="Duplicate">
                    <IconButton onClick={() => onDuplicate(item)} color="info">
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MenuCardList;
