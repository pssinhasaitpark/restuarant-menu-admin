import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { addSalaryDetails } from "../../redux/slices/salarySlice";

const SalaryManagementForm = ({ open, handleClose, employeeId }) => {
  const [baseSalary, setBaseSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [absenceDays, setAbsenceDays] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const salaryData = {
      base_salary: parseFloat(baseSalary),
      bonus: parseFloat(bonus),
      health_insurance: parseFloat(healthInsurance),   
      absence_days: parseInt(absenceDays),   
      month,
      year: parseInt(year),
    };

    dispatch(addSalaryDetails({ employeeId, salaryData }));
    handleClose(); 
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Salary Management</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Base Salary"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bonus"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Health Insurance"
                value={healthInsurance}
                onChange={(e) => setHealthInsurance(e.target.value)}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Absence Days"
                value={absenceDays}
                onChange={(e) => setAbsenceDays(e.target.value)}
                type="number"
                required
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl  required>
                <InputLabel>Month</InputLabel>
                <Select
                  value={month}
                  label="Month"
                  onChange={(e) => setMonth(e.target.value)}
                 sx={{width:"235px"}}
                >
                  {months.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Year Field */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type="number"
                required
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SalaryManagementForm;
