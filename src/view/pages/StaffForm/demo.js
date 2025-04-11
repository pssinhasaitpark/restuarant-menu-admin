import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createStaff,
  updateStaff,
} from "../../redux/slices/staffSlice";
import { toast } from "react-toastify";

const StaffManagementForm = ({ editingTable, onClose, onSave }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.staff);

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
    profile_image: null, // preview URL
    imageFile: null, // actual file to send
  });

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
        imageFile: null,
      });
    }
  }, [editingTable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_image: URL.createObjectURL(file),
        imageFile: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      imageFile,
      profile_image, // for preview only
      ...staffData
    } = formData;

    const payload = {
      ...staffData,
      profile_image: imageFile || editingTable?.profile_image,
    };

    const resultAction = editingTable
      ? await dispatch(updateStaff({ id: editingTable.id, staffData: payload }))
      : await dispatch(createStaff(payload));

    if (
      (editingTable && updateStaff.fulfilled.match(resultAction)) ||
      (!editingTable && createStaff.fulfilled.match(resultAction))
    ) {
      toast.success(`Staff member ${editingTable ? "updated" : "created"} successfully!`);
      onSave?.();
      onClose?.();
    } else {
      toast.error(resultAction.payload || `Failed to ${editingTable ? "update" : "create"} staff`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {editingTable ? "Edit Staff Member" : "Add Staff Member"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            name="first_name"
            fullWidth
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            name="last_name"
            fullWidth
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Mobile No"
            name="mobile_no"
            fullWidth
            value={formData.mobile_no}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Gender"
            name="gender"
            select
            fullWidth
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Designation"
            name="designation"
            fullWidth
            value={formData.designation}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Department"
            name="department"
            fullWidth
            value={formData.department}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Employment Type"
            name="employment_type"
            fullWidth
            value={formData.employment_type}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Joining Date"
            name="joining_date"
            type="date"
            fullWidth
            value={formData.joining_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Other Details"
            name="other_details"
            multiline
            rows={3}
            fullWidth
            value={formData.other_details}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.profile_image && (
            <Box mt={1}>
              <img
                src={formData.profile_image}
                alt="Preview"
                width={100}
                height={100}
                style={{ borderRadius: "8px" }}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {editingTable ? "Update" : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default StaffManagementForm;
