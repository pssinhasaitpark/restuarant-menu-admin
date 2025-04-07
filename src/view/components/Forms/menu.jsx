import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { createMenuItem, resetMenuState } from "../../redux/slices/createmenuSlice";
import { Add, Delete } from "@mui/icons-material";

const validationSchema = Yup.object({
  category_name: Yup.string().required("Category is required"),
  items: Yup.array().of(
    Yup.object().shape({
      item_name: Yup.string().required("Item name is required"),
      item_price: Yup.number().required("Price is required"),
      images: Yup.mixed().required("At least one image is required"),
    })
  ),
});

const MenuForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.createmenu);

  const formik = useFormik({
    initialValues: {
      category_name: "",
      items: [
        {
          item_name: "",
          item_price: "",
          images: null,
        },
      ],
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("category_name", values.category_name);

      values.items.forEach((item, index) => {
        formData.append(`items[${index}][item_name]`, item.item_name);
        formData.append(`items[${index}][item_price]`, item.item_price);

        for (let i = 0; i < item.images.length; i++) {
          formData.append("images", item.images[i]);
        }
      });

      dispatch(createMenuItem(formData));
    },
  });

  useEffect(() => {
    if (success) {
      formik.resetForm();
      dispatch(resetMenuState());
    }
  }, [success, dispatch]);

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h5" gutterBottom>Create Menu</Typography>

        <TextField
          fullWidth
          label="Category Name"
          name="category_name"
          margin="normal"
          value={formik.values.category_name}
          onChange={formik.handleChange}
          error={formik.touched.category_name && Boolean(formik.errors.category_name)}
          helperText={formik.touched.category_name && formik.errors.category_name}
        />

        <FieldArray
          name="items"
          render={({ push, remove }) => (
            <>
              {formik.values.items.map((item, index) => (
                <Box key={index} sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2, mb: 2 }}>
                  <Typography variant="subtitle1">Item {index + 1}</Typography>

                  <TextField
                    fullWidth
                    label="Item Name"
                    name={`items[${index}].item_name`}
                    margin="normal"
                    value={item.item_name}
                    onChange={formik.handleChange}
                    error={formik.touched.items?.[index]?.item_name && Boolean(formik.errors.items?.[index]?.item_name)}
                    helperText={formik.touched.items?.[index]?.item_name && formik.errors.items?.[index]?.item_name}
                  />

                  <TextField
                    fullWidth
                    label="Item Price"
                    name={`items[${index}].item_price`}
                    type="number"
                    margin="normal"
                    value={item.item_price}
                    onChange={formik.handleChange}
                    error={formik.touched.items?.[index]?.item_price && Boolean(formik.errors.items?.[index]?.item_price)}
                    helperText={formik.touched.items?.[index]?.item_price && formik.errors.items?.[index]?.item_price}
                  />

                  <input
                    type="file"
                    multiple
                    name={`items[${index}].images`}
                    onChange={(e) =>
                      formik.setFieldValue(`items[${index}].images`, e.currentTarget.files)
                    }
                    style={{ marginTop: 8 }}
                  />
                  {formik.touched.items?.[index]?.images && formik.errors.items?.[index]?.images && (
                    <Typography color="error" fontSize={12}>
                      {formik.errors.items[index].images}
                    </Typography>
                  )}

                  {formik.values.items.length > 1 && (
                    <IconButton onClick={() => remove(index)} color="error" sx={{ mt: 1 }}>
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              ))}

              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() =>
                  push({
                    item_name: "",
                    item_price: "",
                    images: null,
                  })
                }
              >
                Add Item
              </Button>
            </>
          )}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>

        {error && <Typography color="error" mt={2}>{error}</Typography>}
        {success && <Typography color="green" mt={2}>Menu created successfully!</Typography>}
      </Box>
    </FormikProvider>
  );
};

export default MenuForm;
