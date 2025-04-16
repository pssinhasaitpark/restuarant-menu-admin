

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
  const { loading, error } = useSelector((state) => state.staff);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    mobile_no: "",
    address: "",
    designation: "",
    department: "",
    employment_type: "",
    joining_date: "",
    other_details: "",
    profile_image: null,
  });
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editingTable) {
      setFormData({
        first_name: editingTable.first_name || "",
        last_name: editingTable.last_name || "",
        email: editingTable.email || "",
        gender: editingTable.gender || "",
        mobile_no: editingTable.mobile_no || "",
        address: editingTable.address || "",
        designation: editingTable.designation || "",
        department: editingTable.department || "",
        employment_type: editingTable.employment_type || "",
        joining_date: editingTable.joining_date || "",
        other_details: editingTable.other_details || "",
        profile_image: editingTable.profile_image || null,
      });
    }
  }, [editingTable]);

  useEffect(() => {
    if (formData.profile_image) {
      if (typeof formData.profile_image === "string") {
        setPreview(formData.profile_image);
      } else {
        const objectUrl = URL.createObjectURL(formData.profile_image);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreview("");
    }
  }, [formData.profile_image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const staffPayload = {
      ...formData,
      profile_image:
        formData.imageFile ||
        editingTable?.profile_image ||
        formData.profile_image,
    };

    const resultAction = editingTable
      ? await dispatch(
          updateStaff({ id: editingTable.id, staffData: staffPayload })
        )
      : await dispatch(createStaff(staffPayload));

    if (
     
      (editingTable && updateStaff.fulfilled.match(resultAction))
    ) {
      toast.success(
        `Staff member ${editingTable ? "updated" : "created"} successfully!`
      );
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
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        {editingTable ? "Edit Staff Member" : "Add Staff Member"}
      </Typography>



      {[
        [
          <TextField
            label="First Name"
            name="first_name"
            fullWidth
            value={formData.first_name}
            onChange={handleChange}
          />,
          <TextField
            label="Last Name"
            name="last_name"
            fullWidth
            value={formData.last_name}
            onChange={handleChange}
          />,
        ],
        [
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />,
          <TextField
            label="Mobile Number"
            name="mobile_no"
            fullWidth
            value={formData.mobile_no}
            onChange={handleChange}
          />,
        ],
        [
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
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
            value={formData.joining_date}
            onChange={handleChange}
          />,
        ],
        [
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />,
          <FormControl fullWidth>
            <InputLabel>Designation</InputLabel>
            <Select
              name="designation"
              value={formData.designation}
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
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              label="Department"
            >
              <MenuItem value="Kitchen">Kitchen</MenuItem>
              <MenuItem value="Front of House">Front of House</MenuItem>
              <MenuItem value="Management">Management</MenuItem>
            </Select>
          </FormControl>,
          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>
            <Select
              name="employment_type"
              value={formData.employment_type}
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
            value={formData.other_details}
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
        sx={{ width: 64, height: 64, cursor: "pointer", border: "1px solid #ccc" }}
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
        onChange={handleImageChange}
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
      <Dialog open={imageModalOpen} onClose={() => setImageModalOpen(false)} maxWidth="sm" fullWidth>
  <Box p={2} display="flex" justifyContent="center">
    <img src={preview} alt="Full Preview" style={{ maxWidth: "100%", maxHeight: "80vh" }} />
  </Box>
</Dialog>
    </form>
  );
};

export default StaffManagementForm;

