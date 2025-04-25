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

export const staffValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile_no: Yup.string().required("Mobile number is required"),
  gender: Yup.string().required("Gender is required"),
  joining_date: Yup.string().required("Joining date is required"),
  address: Yup.string().required("Address is required"),
  designation: Yup.string().required("Designation is required"),
  department: Yup.string().required("Department is required"),
  employment_type: Yup.string().required("Employment type is required"),
});

export  const menuvalidationSchema = Yup.object({
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