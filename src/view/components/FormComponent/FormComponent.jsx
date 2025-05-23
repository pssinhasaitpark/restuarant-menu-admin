import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const FormComponent = ({
  isadd,
  isAddMore,
  initialValues,
  validationSchemaRestaurant,
  handleSubmit,
  error,
  loading,
  fields,
  buttonText,
  specific,
}) => {
  const [forms, setForms] = useState([
    { id: Date.now(), values: initialValues },
  ]);

  const handleAddForm = () => {
    const newFormValues = specific
      ? { itemName: "", itemPrice: "" }
      : initialValues;
    setForms([...forms, { id: Date.now(), values: newFormValues }]);
  };

  const handleRemoveForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const handleSubmitAll = async (values, actions) => {
    for (const [index, form] of forms.entries()) {
      await handleSubmit(values[`form_${form.id}`], index);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={forms.reduce((acc, form) => {
        acc[`form_${form.id}`] = form.values;
        return acc;
      }, {})}
      validationSchema={validationSchemaRestaurant}
      onSubmit={handleSubmitAll}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          {forms.map((form, index) => (
            <Box key={form.id} mb={3} p={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {!isadd ? (
                  <Typography variant="h6">Form {index + 1}</Typography>
                ) : (
                  <Box></Box>
                )}
                {forms.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveForm(form.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>

              {isadd ? (
                <Box>
                  {fields
                    .filter((field) =>
                      specific && index > 0
                        ? field.name === "item_name" ||
                          field.name === "item_price" ||
                          field.name === "item_image"
                        : true
                    )
                    .map((field) => (
                      <Box key={field.name} mb={2}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {field.label}
                        </Typography>
                        <Field
                          as={TextField}
                          name={`form_${form.id}.${field.name}`}
                          type={field.type || "text"}
                          fullWidth
                          variant="outlined"
                          error={
                            touched?.[`form_${form.id}`]?.[field.name] &&
                            Boolean(
                              errors?.[`form_${form.id}`]?.[field.name]
                            )
                          }
                          helperText={
                            touched?.[`form_${form.id}`]?.[field.name] &&
                            errors?.[`form_${form.id}`]?.[field.name]
                          }
                        />
                      </Box>
                    ))}
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {fields
                    .filter((field) =>
                      specific && index > 0
                        ? field.name === "item_name" ||
                          field.name === "item_price" ||
                          field.name === "item_image"
                        : true
                    )
                    .map((field) => (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {field.label}
                        </Typography>
                        <Field
                          as={TextField}
                          name={`form_${form.id}.${field.name}`}
                          type={field.type || "text"}
                          fullWidth
                          variant="outlined"
                          error={
                            touched?.[`form_${form.id}`]?.[field.name] &&
                            Boolean(
                              errors?.[`form_${form.id}`]?.[field.name]
                            )
                          }
                          helperText={
                            touched?.[`form_${form.id}`]?.[field.name] &&
                            errors?.[`form_${form.id}`]?.[field.name]
                          }
                        />
                      </Grid>
                    ))}
                </Grid>
              )}

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          ))}

          {/* Add New Form Button */}
          { !isAddMore && !isadd &&  (
            <Box mt={3} textAlign="center">
              <Button variant="outlined" color="primary" onClick={handleAddForm}>
                + Add More
              </Button>
            </Box>
          )}

          {/* Submit Button */}
          <Box mt={3} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                "&:hover": { backgroundColor: "#BF360C" },
              }}
              disabled={loading || isSubmitting}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                buttonText || "Submit"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;




