import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Avatar,
  Stack,
  Box,
  Dialog,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createStaff, updateStaff } from "../../redux/slices/staffSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { staffValidationSchema } from "../../components/ValidationSchema/ValidationSchema";

const StaffManagementForm = ({ editingTable, onClose, onSave }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.staff);

  const [preview, setPreview] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const initialValues = {
    first_name: editingTable?.first_name || "",
    last_name: editingTable?.last_name || "",
    email: editingTable?.email || "",
    gender: editingTable?.gender || "",
    mobile_no: editingTable?.mobile_no || "",
    address: editingTable?.address || "",
    designation: editingTable?.designation || "",
    department: editingTable?.department || "",
    employment_type: editingTable?.employment_type || "",
    joining_date: editingTable?.joining_date || "",
    other_details: editingTable?.other_details || "",
    profile_image: editingTable?.profile_image || null,
  };

  useEffect(() => {
    if (initialValues.profile_image) {
      if (typeof initialValues.profile_image === "string") {
        setPreview(initialValues.profile_image);
      }
    }
  }, [editingTable]);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFieldValue("profile_image", file);
    }
  };

  const handleSubmit = async (values) => {
    const staffPayload = {
      ...values,
      profile_image: imageFile || values.profile_image,
    };

    const resultAction = editingTable
      ? await dispatch(
          updateStaff({ id: editingTable.id, staffData: staffPayload })
        )
      : await dispatch(createStaff(staffPayload));

    if (editingTable && updateStaff.fulfilled.match(resultAction)) {
      toast.success("Staff member updated successfully!");
      onSave?.();
      onClose?.();
    } else if (!editingTable && createStaff.fulfilled.match(resultAction)) {
      toast.success("Staff member created successfully!");
      onSave?.();
      onClose?.();
    } else {
      toast.error(
        resultAction.payload ||
          `Failed to ${editingTable ? "update" : "create"} staff`
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={staffValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, touched, errors, setFieldValue }) => (
        <Form>
          <Typography variant="h4" gutterBottom>
            {editingTable ? "Edit Staff Member" : "Add Staff Member"}
          </Typography>

          {[
            [
              <TextField
                label="First Name"
                name="first_name"
                fullWidth
                value={values.first_name}
                onChange={handleChange}
                error={touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
              />,
              <TextField
                label="Last Name"
                name="last_name"
                fullWidth
                value={values.last_name}
                onChange={handleChange}
                error={touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
              />,
            ],
            [
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />,
              <TextField
                label="Mobile Number"
                name="mobile_no"
                fullWidth
                value={values.mobile_no}
                onChange={handleChange}
                error={touched.mobile_no && !!errors.mobile_no}
                helperText={touched.mobile_no && errors.mobile_no}
              />,
            ],
            [
              <FormControl fullWidth error={touched.gender && !!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>,
              <TextField
                label="Joining Date"
                name="joining_date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={values.joining_date}
                onChange={handleChange}
                error={touched.joining_date && !!errors.joining_date}
                helperText={touched.joining_date && errors.joining_date}
              />,
            ],
            [
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={values.address}
                onChange={handleChange}
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />,
              <FormControl
                fullWidth
                error={touched.designation && !!errors.designation}
              >
                <InputLabel>Designation</InputLabel>
                <Select
                  name="designation"
                  value={values.designation}
                  onChange={handleChange}
                  label="Designation"
                >
                  <MenuItem value="server">Server</MenuItem>
                  <MenuItem value="chef">Chef</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="bartender">Bartender</MenuItem>
                </Select>
              </FormControl>,
            ],
            [
              <FormControl
                fullWidth
                error={touched.department && !!errors.department}
              >
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  label="Department"
                >
                  <MenuItem value="Kitchen">Kitchen</MenuItem>
                  <MenuItem value="Front of House">Front of House</MenuItem>
                  <MenuItem value="Management">Management</MenuItem>
                </Select>
              </FormControl>,
              <FormControl
                fullWidth
                error={touched.employment_type && !!errors.employment_type}
              >
                <InputLabel>Employment Type</InputLabel>
                <Select
                  name="employment_type"
                  value={values.employment_type}
                  onChange={handleChange}
                  label="Employment Type"
                >
                  <MenuItem value="full-time">Full-Time</MenuItem>
                  <MenuItem value="part-time">Part-Time</MenuItem>
                  <MenuItem value="temporary">Temporary</MenuItem>
                </Select>
              </FormControl>,
            ],
            [
              <TextField
                label="Other Details"
                name="other_details"
                fullWidth
                multiline
                rows={3}
                value={values.other_details}
                onChange={handleChange}
              />,
            ],
          ].map((row, rowIndex) => (
            <Grid key={rowIndex} sx={{ display: "flex" }}>
              {row.map((field, colIndex) => (
                <Grid item sx={{ width: "50%", padding: "5px" }} key={colIndex}>
                  {field}
                </Grid>
              ))}
            </Grid>
          ))}

          {/* Image Upload */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignItems="center">
              {preview && (
                <Avatar
                  src={preview}
                  sx={{
                    width: 64,
                    height: 64,
                    cursor: "pointer",
                    border: "1px solid #ccc",
                  }}
                  onClick={() => setImageModalOpen(true)}
                  alt="Staff"
                />
              )}
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
              </Button>
            </Stack>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {editingTable ? "Update" : "Save"}
            </Button>
          </Box>

          <Dialog
            open={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <Box p={2} display="flex" justifyContent="center">
              <img
                src={preview}
                alt="Full Preview"
                style={{ maxWidth: "100%", maxHeight: "80vh" }}
              />
            </Box>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default StaffManagementForm;
