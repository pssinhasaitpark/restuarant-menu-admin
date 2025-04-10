import React, { useState } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createStaff } from "../../redux/slices/staffSlice";
import { toast } from "react-toastify";

const StaffManagementForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_image: URL.createObjectURL(file),

      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const staffPayload = {
      ...formData,
      profile_image: formData.imageFile,
    };

    const resultAction = await dispatch(createStaff(staffPayload));

    if (createStaff.fulfilled.match(resultAction)) {
      toast.success("Staff member created successfully!");
      setFormData({
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
    } else {
      toast.error(resultAction.payload || "Failed to create staff");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Staff Management Form
      </Typography>

      {/* Image Upload */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={formData.profile_image} sx={{ width: 64, height: 64 }} />
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Stack>
      </Grid>

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
            <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
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
            <Select name="designation" value={formData.designation} onChange={handleChange} label="Designation">
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
            <Select name="department" value={formData.department} onChange={handleChange} label="department">
              <MenuItem value="Kitchen">Kitchen</MenuItem>
              <MenuItem value="Front of House">Front of House</MenuItem>
              <MenuItem value="Management">Management</MenuItem>
            </Select>
          </FormControl>,
          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>
            <Select name="employment_type" value={formData.employment_type} onChange={handleChange} label="employment_type">
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

      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Grid>
    </form>
  );
};

export default StaffManagementForm;
