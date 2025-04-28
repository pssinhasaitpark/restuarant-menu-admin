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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { menuvalidationSchema } from "../ValidationSchema/ValidationSchema";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const MenuForm = ({ initialValues, onSubmit, isEdit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      category_name: "",
      items: [
        {
          item_name: "",
          item_price: "",
          item_description: "",
          images: null,
          imagePreview: "",
        },
      ],
    },
    validationSchema: menuvalidationSchema,
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

                      {/* Render image preview or existing image URL */}
                      {item.imagePreview || (item.images && item.images[0]) ? (
                        <Box mt={1} display="flex" alignItems="center" gap={1}>
                          {/* If item.imagePreview exists, show it, otherwise show image URL */}
                          <img
                            src={
                              item.imagePreview
                                ? item.imagePreview
                                : item.images && item.images[0] // Display the first image URL from the array
                            }
                            alt="Preview"
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 8,
                              objectFit: "cover",
                            }}
                          />
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
                      ) : null}
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
                      item_description: "",
                      images: null,
                      imagePreview: "",
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
