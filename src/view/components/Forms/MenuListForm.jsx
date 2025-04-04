import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import FormComponent from "../FormComponent/FormComponent";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  item_category: Yup.string().required("Item category is required"),
  item_subcategory: Yup.string().required("Item subcategory is required"),
  item_name: Yup.string().required("Item name is required"),
  item_price: Yup.number()
    .required("Item price is required")
    .positive("Item price must be positive"),
});

const MenuListForm = () => {
  const [menuItems, setMenuItems] = useState([
    {
      item_category: "",
      item_subcategory: "",
      item_name: "",
      item_price: "",
      item_image: "",
    },
  ]);

  const handleAddItem = () => {
    setMenuItems([
      ...menuItems,
      {
        item_category: "",
        item_subcategory: "",
        item_name: "",
        item_price: "",
        item_image: "",
      },
    ]);
  };

  const handleSubmit = (values, index) => {
    const updatedItems = [...menuItems];
    updatedItems[index] = values;
    setMenuItems(updatedItems);
  };

  return (
    <Box sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add Restaurant Menu Items
      </Typography>
      {menuItems.map((_, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <FormComponent
            specific={true}
            initialValues={menuItems[index]}
            validationSchemaRestaurant={validationSchema}
            handleSubmit={(values) => handleSubmit(values, index)}
            fields={[
              { name: "item_category", label: "Item Category", md: 6, lg: 6 },
              { name: "item_subcategory", label: "Item Subcategory", md: 6, lg: 6 },
              { name: "item_name", label: "Item Name", md: 6, lg: 6 },
              { name: "item_price", label: "Item Price", type: "number", md: 6, lg: 6 },
              { name: "item_image", label: "Item Image", type: "file", md: 12, lg: 12 },
            ]}
            buttonText="Save"
          />
        </Box>
      ))}
    </Box>
  );
};

export default MenuListForm;
