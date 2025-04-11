import React, { useEffect } from "react";
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
  itemName: Yup.string().required("Item Name is required"),
  category: Yup.string().required("Category is required"),
  quantity: Yup.number().required("Quantity is required"),
  unit: Yup.string().required("Unit is required"),
  supplier: Yup.string().required("Supplier is required"),
  purchaseDate: Yup.date().required("Purchase date is required"),
});

const StockForm = ({ initialValues, onClose, onSave }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      itemName: "",
      category: "",
      quantity: "",
      unit: "",
      supplier: "",
      purchaseDate: "",
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
                name="itemName"
                value={formik.values.itemName}
                onChange={formik.handleChange}
                error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                helperText={formik.touched.itemName && formik.errors.itemName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
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
                fullWidth
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
                name="supplier"
                value={formik.values.supplier}
                onChange={formik.handleChange}
                error={formik.touched.supplier && Boolean(formik.errors.supplier)}
                helperText={formik.touched.supplier && formik.errors.supplier}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Purchase Date"
                name="purchaseDate"
                InputLabelProps={{ shrink: true }}
                value={formik.values.purchaseDate}
                onChange={formik.handleChange}
                error={formik.touched.purchaseDate && Boolean(formik.errors.purchaseDate)}
                helperText={formik.touched.purchaseDate && formik.errors.purchaseDate}
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
