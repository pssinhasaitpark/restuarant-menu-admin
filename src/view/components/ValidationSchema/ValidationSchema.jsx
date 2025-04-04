// src/components/ValidationSchema.jsx
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export const validationSchemaRestaurant = Yup.object({
  restaurant_name: Yup.string().required("Restaurant name is required"),
  owner_name: Yup.string().required("Owner name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  mobile: Yup.string().required("Mobile number is required"),
  opening_hours: Yup.string().required("Opening hours are required"),
  location: Yup.string().required("Location is required"),
  images: Yup.array().min(1, "At least one image is required").required("Images are required"),
});

export const restaurantValidationSchema = Yup.object({
  restaurant_name: Yup.string().required("Restaurant name is required"),
  owner_name: Yup.string().required("Owner name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  location: Yup.string().required("Location is required"),
});
