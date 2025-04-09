import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

const validationSchema = Yup.object({
  category_name: Yup.string().required("Category name is required"),
  items: Yup.array().of(
    Yup.object().shape({
      item_name: Yup.string().required("Item name is required"),
      item_price: Yup.number()
        .typeError("Price must be a number")
        .required("Item price is required"),
    })
  ),
});

const MenuForm = ({ initialValues, onSubmit, isEdit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
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
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {initialValues?.id ? "Edit Menu Category" : "Add Menu Category"}
        </Typography>

        <TextField
          label="Category Name"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("category_name")}
          error={
            formik.touched.category_name && Boolean(formik.errors.category_name)
          }
          helperText={
            formik.touched.category_name && formik.errors.category_name
          }
          disabled={isEdit}
        />

        <FieldArray
          name="items"
          render={(arrayHelpers) => (
            <>
              {formik.values.items.map((item, index) => (
                <Box key={index} mb={2} p={2} border={1} borderRadius={2}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Item Name"
                        {...formik.getFieldProps(`items[${index}].item_name`)}
                        error={
                          formik.touched.items?.[index]?.item_name &&
                          Boolean(formik.errors.items?.[index]?.item_name)
                        }
                        helperText={
                          formik.touched.items?.[index]?.item_name &&
                          formik.errors.items?.[index]?.item_name
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Item Price"
                        {...formik.getFieldProps(`items[${index}].item_price`)}
                        error={
                          formik.touched.items?.[index]?.item_price &&
                          Boolean(formik.errors.items?.[index]?.item_price)
                        }
                        helperText={
                          formik.touched.items?.[index]?.item_price &&
                          formik.errors.items?.[index]?.item_price
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={7}>
                      <TextField
                        fullWidth
                        label="Item Description"
                        multiline
                        minRows={3}
                        {...formik.getFieldProps(
                          `items[${index}].item_description`
                        )}
                        error={
                          formik.touched.items?.[index]?.item_description &&
                          Boolean(
                            formik.errors.items?.[index]?.item_description
                          )
                        }
                        helperText={
                          formik.touched.items?.[index]?.item_description &&
                          formik.errors.items?.[index]?.item_description
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Upload Food Image
                      </Typography>

                      <input
                        type="file"
                        accept="image/*"
                        id={`upload-${index}`}
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.currentTarget.files[0];
                          if (file) {
                            formik.setFieldValue(
                              `items[${index}].images`,
                              file
                            );
                            formik.setFieldValue(
                              `items[${index}].imagePreview`,
                              URL.createObjectURL(file)
                            );
                          }
                        }}
                      />

                      <label htmlFor={`upload-${index}`}>
                        <IconButton component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>

                      {item.images && (
                        <Box mt={1} display="flex" alignItems="center" gap={1}>
                          {item.imagePreview && (
                            <img
                              src={item.imagePreview}
                              alt="Preview"
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 8,
                                objectFit: "cover",
                              }}
                            />
                          )}

                          <Typography variant="caption">
                            {item.images.name}
                          </Typography>

                          <IconButton
                            onClick={() => {
                              formik.setFieldValue(
                                `items[${index}].images`,
                                null
                              );
                              formik.setFieldValue(
                                `items[${index}].imagePreview`,
                                ""
                              );
                            }}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    {formik.values.items.length > 1 && (
                      <IconButton onClick={() => arrayHelpers.remove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}

              {!isEdit && (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    arrayHelpers.push({
                      item_name: "",
                      item_price: "",
                      images: null,
                    })
                  }
                >
                  Add Item
                </Button>
              )}
            </>
          )}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {initialValues?.id ? "Update Menu" : "Save Menu"}
          </Button>
        </Box>
      </form>
    </FormikProvider>
  );
};

export default MenuForm;
