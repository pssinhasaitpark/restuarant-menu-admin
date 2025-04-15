import React from "react";
import { Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
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
      status: Yup.string().oneOf(["free", "booked"], "Status must be either 'free' or 'booked'").required("Status is required"),
    })
  ),
});

const CreateTableForm = ({ onSave, onClose, editingTable,isAddMore }) => {
  const handleSubmit = (values) => {
    const formattedValues = {
      table_number: values.table_number,
      capacity: String(values.capacity),
      status: values.status, 
    };
    if (editingTable) {
      onSave(formattedValues);
    } else {
      onSave({ tables: [formattedValues] });
    }
    onClose();
  };

  return (
    <Box sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {editingTable ? "Edit Table" : "Add Restaurant Table"}
      </Typography>
      <FormComponent
        initialValues={{
          table_number: editingTable?.table_number || "",
          capacity: editingTable?.capacity || "",
          status: editingTable?.status || "free", 
        }}
        validationSchemaRestaurant={validationSchema}
        handleSubmit={handleSubmit}
        fields={[
          { name: "table_number", label: "Table Number" },
          { name: "capacity", label: "Capacity", type: "number" },
          {
            name: "status",
            label: "Status",
            component: (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={editingTable?.status || "free"}
                  label="Status"
                >
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="booked">Booked</MenuItem>
                </Select>
              </FormControl>
            ),
          },
        ]}
        buttonText={editingTable ? "Update" : "Save"}
        isAddMore={isAddMore}
      />
      <Button onClick={onClose} color="error" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default CreateTableForm;