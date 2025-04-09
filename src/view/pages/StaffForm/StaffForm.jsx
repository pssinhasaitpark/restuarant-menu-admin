import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Avatar,
  Stack,
  Box,
} from "@mui/material";

const StaffManagementForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    emergencyContact: "",
    jobTitle: "",
    department: "",
    supervisor: "",
    employmentType: "",
    availability: "",
    salary: "",
    overtimeRate: "",
    bonusEligibility: false,
    foodSafetyCert: false,
    alcoholServiceCert: false,
    bankAccount: "",
    status: "active",
    notes: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography variant="h4" gutterBottom>
        Staff Management Form
      </Typography>
  
        {/* Image Upload */}
        <Grid item xs={12} >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={formData.image} sx={{ width: 64, height: 64 }} />
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Stack>
        </Grid>


        {[
  [
    <TextField label="First Name" name="firstName" fullWidth value={formData.firstName} onChange={handleChange} />,
    <TextField label="Last Name" name="lastName" fullWidth value={formData.lastName} onChange={handleChange} />,
  ],
  [
    <FormControl fullWidth>
      <InputLabel>Gender</InputLabel>
      <Select value={formData.gender} name="gender" label="Gender" onChange={handleChange}>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>,
    <TextField label="Phone Number" name="phoneNumber" fullWidth value={formData.phoneNumber} onChange={handleChange} />,
  ],
  [
    <TextField label="Email Address" name="email" fullWidth value={formData.email} onChange={handleChange} />,
    <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} />,
  ],
  [
    <TextField label="Emergency Contact" name="emergencyContact" fullWidth value={formData.emergencyContact} onChange={handleChange} />,
    <FormControl fullWidth>
      <InputLabel>Job Title</InputLabel>
      <Select name="jobTitle" value={formData.jobTitle} onChange={handleChange}>
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
      <Select name="department" value={formData.department} onChange={handleChange}>
        <MenuItem value="kitchen">Kitchen</MenuItem>
        <MenuItem value="frontOfHouse">Front of House</MenuItem>
        <MenuItem value="management">Management</MenuItem>
      </Select>
    </FormControl>,
    <TextField label="Supervisor" name="supervisor" fullWidth value={formData.supervisor} onChange={handleChange} />,
  ],
  [
    <FormControl fullWidth>
      <InputLabel>Employment Type</InputLabel>
      <Select name="employmentType" value={formData.employmentType} onChange={handleChange}>
        <MenuItem value="fullTime">Full-Time</MenuItem>
        <MenuItem value="partTime">Part-Time</MenuItem>
        <MenuItem value="temporary">Temporary</MenuItem>
      </Select>
    </FormControl>,
    <TextField label="Availability" name="availability" fullWidth value={formData.availability} onChange={handleChange} />,
  ],
  [
    <TextField label="Salary" name="salary" fullWidth value={formData.salary} onChange={handleChange} />,
    <TextField label="Overtime Rate" name="overtimeRate" fullWidth value={formData.overtimeRate} onChange={handleChange} />,
  ],
  [
    <FormControlLabel control={<Checkbox checked={formData.bonusEligibility} onChange={handleChange} name="bonusEligibility" />} label="Bonus Eligibility" />,
    <FormControlLabel control={<Checkbox checked={formData.foodSafetyCert} onChange={handleChange} name="foodSafetyCert" />} label="Food Safety Certificate" />,
  ],
  [
    <FormControlLabel control={<Checkbox checked={formData.alcoholServiceCert} onChange={handleChange} name="alcoholServiceCert" />} label="Alcohol Service Certification" />,
    <TextField label="Bank Account Number" name="bankAccount" fullWidth value={formData.bankAccount} onChange={handleChange} />,
  ],
  [
    <FormControl fullWidth>
      <InputLabel>Status</InputLabel>
      <Select name="status" value={formData.status} onChange={handleChange}>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>
    </FormControl>,
    <TextField label="Notes" name="notes" fullWidth multiline rows={4} value={formData.notes} onChange={handleChange} />,
  ],
].map((row, rowIndex) => (
  <Grid  key={rowIndex} sx={{ display:"flex"}}>
    {row.map((field, colIndex) => (
      <Grid item sx={{width:"50%",padding:"5px"}} key={colIndex}>
        {field}
      </Grid>
    ))}
  </Grid>
))}


        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid>
    </form>
  );
};

export default StaffManagementForm;
