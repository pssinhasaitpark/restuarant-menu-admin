import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const roles = ["Chef", "Waiter", "Manager", "Cashier", "Cleaner"];

const StaffForm = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Must be a valid 10-digit number").required("Phone is required"),
      dateOfBirth: Yup.string().required("Date of Birth is required"),
      address: Yup.string().required("Address is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      console.log("Staff Data Submitted:", values);
      // Handle API call or state update here
    },
  });

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Card elevation={3} style={{ width: "60%", padding: "20px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Staff Member
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={2}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Upload Image</InputLabel>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && (
                  <div style={{ marginTop: "10px" }}>
                    <img src={image} alt="Staff" width="80" height="80" style={{ borderRadius: "50%" }} />
                  </div>
                )}
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
                <Button type="submit" variant="contained" color="primary">
                  Add Staff
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StaffForm;