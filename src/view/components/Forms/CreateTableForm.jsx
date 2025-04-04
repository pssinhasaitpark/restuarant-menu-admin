import React from "react";
import { Button, Box, Typography } from "@mui/material";
import FormComponent from "../FormComponent/FormComponent";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  formData: Yup.array().of(
    Yup.object().shape({
      table_number: Yup.string().required("Table number is required"),
      capacity: Yup.number()
        .required("Capacity is required")
        .positive("Capacity must be positive")
        .integer("Capacity must be an integer"),
    })
  ),
});

const CreateTableForm = ({ onSave, onClose }) => {
const handleSubmit = (values) => {
  console.log("Final Data to Save:", values); 
  

  const formattedValues = {
    table_number: values.table_number,
    capacity: String(values.capacity), 
  };

  onSave({ tables: [formattedValues] }); 
  onClose(); 
};

  

  return (
    <Box sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Restaurant Table
      </Typography>
      <FormComponent
        initialValues={{ table_number: "", capacity: "" }}
        validationSchemaRestaurant={validationSchema}
        handleSubmit={handleSubmit}
        fields={[
          { name: "table_number", label: "Table Number" },
          { name: "capacity", label: "Capacity", type: "number" },
        ]}
        buttonText="Save"
      />
      <Button onClick={onClose} color="error" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default CreateTableForm;
