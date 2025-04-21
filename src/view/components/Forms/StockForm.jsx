import React from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const units = ["kg", "ltr", "pcs"];
const categories = ["Vegetables", "Meat", "Beverages", "Dairy", "Grains"];

const validationSchema = Yup.object({
  item_name: Yup.string().required("Item Name is required"),
  category_name: Yup.string().required("Category is required"),
  quantity: Yup.number().required("Quantity is required"),
  unit: Yup.string().required("Unit is required"),
  supplier_name: Yup.string().required("Supplier is required"),
  price_per_unit: Yup.number().required("Price per unit is required"),
});

const StockForm = ({ initialValues, onClose, onSave }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      item_name: "",
      category_name: "",
      quantity: "",
      unit: "",
      supplier_name: "",
      price_per_unit: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <>
      <DialogTitle>{initialValues ? "Edit Stock Item" : "Add Stock Item"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Item Name"
                name="item_name"
                value={formik.values.item_name}
                onChange={formik.handleChange}
                error={formik.touched.item_name && Boolean(formik.errors.item_name)}
                helperText={formik.touched.item_name && formik.errors.item_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                sx={{width:"300px"}}
                label="Category"
                name="category_name"
                value={formik.values.category_name}
                onChange={formik.handleChange}
                error={formik.touched.category_name && Boolean(formik.errors.category_name)}
                helperText={formik.touched.category_name && formik.errors.category_name}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                sx={{width:"300px"}}
                label="Unit"
                name="unit"
                value={formik.values.unit}
                onChange={formik.handleChange}
                error={formik.touched.unit && Boolean(formik.errors.unit)}
                helperText={formik.touched.unit && formik.errors.unit}
              >
                {units.map((u) => (
                  <MenuItem key={u} value={u}>{u}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Supplier"
                name="supplier_name"
                value={formik.values.supplier_name}
                onChange={formik.handleChange}
                error={formik.touched.supplier_name && Boolean(formik.errors.supplier_name)}
                helperText={formik.touched.supplier_name && formik.errors.supplier_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               
                label="Price/Unit"
                sx={{width:"300px"}}
                name="price_per_unit"
                type="number"
                value={formik.values.price_per_unit}
                onChange={formik.handleChange}
                error={formik.touched.price_per_unit && Boolean(formik.errors.price_per_unit)}
                helperText={formik.touched.price_per_unit && formik.errors.price_per_unit}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={formik.handleSubmit}>Save</Button>
      </DialogActions>
    </>
  );
};

export default StockForm;