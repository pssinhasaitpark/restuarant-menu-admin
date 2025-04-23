import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalaryDetails } from "../../redux/slices/salarySlice";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SalaryManagementForm from "../Forms/SalaryManagementForm";
import SalarySlip from "../Salry Slip/SalarySlipPreview";
const SalaryManagementList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [openSlipDialog, setOpenSlipDialog] = useState(false);

  const dispatch = useDispatch();
  const staffId = new URLSearchParams(window.location.search).get("id");

  const { staff, salaryDetails, restaurantDetails, loading, error } = useSelector(
    (state) => state.salary
  );

  useEffect(() => {
    if (staffId) {
      dispatch(fetchSalaryDetails(staffId));
    }
  }, [dispatch, staffId]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenSlipDialog = (rowData) => {
    setSelectedSlip(rowData);
    setOpenSlipDialog(true);
  };

  const handleCloseSlipDialog = () => {
    setSelectedSlip(null);
    setOpenSlipDialog(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box p={3}>
      {/* Employee Info */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={16} alignItems="center">
          <Grid item xs={12} sm={2.5}>
            <Typography variant="subtitle1">
              <strong>Employee ID:</strong> {salaryDetails[0]?.employee_id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Typography variant="subtitle1">
              <strong>First Name:</strong> {staff.first_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Typography variant="subtitle1">
              <strong>Last Name:</strong> {staff.last_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Typography variant="subtitle1">
              <strong>Designation:</strong> {staff.designation}
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenDialog}
            >
              Manage Salary
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table or Loader */}
      {loading ? (
        <CircularProgress />
      ) : error && salaryDetails.length === 0 ? (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          {error || "No salary details found."}
        </Typography>
      ) : salaryDetails.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No salary details found.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Base Salary</TableCell>
                <TableCell>Bonus</TableCell>
                <TableCell>Absence Days</TableCell>
                <TableCell>Salary Deduction</TableCell>
                <TableCell>Gross Salary</TableCell>
                <TableCell>Net Salary</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Credit Date</TableCell>
                <TableCell>Salary Slip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryDetails.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>₹{row.base_salary}</TableCell>
                  <TableCell>₹{row.bonus}</TableCell>
                  <TableCell>{row.absence_days}</TableCell>
                  <TableCell>₹{row.total_deduction}</TableCell>
                  <TableCell>₹{row.gross_salary}</TableCell>
                  <TableCell>₹{row.total_pay_amount}</TableCell>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>
                    {new Date(row.payment_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenSlipDialog(row)}
                    >
                      Generate Slip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Manage Salary Dialog */}
      <SalaryManagementForm
        open={openDialog}
        handleClose={handleCloseDialog}
        employeeId={staff.id}
      />

      {/* Salary Slip Preview Dialog */}
      <Dialog
        open={openSlipDialog}
        onClose={handleCloseSlipDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          {selectedSlip && (
            <SalarySlip
              data={selectedSlip}
              staff={staff}
              restaurantDetails={restaurantDetails} 
            />
          )}
        </DialogContent>
        <DialogActions className="no-print">
          <Button onClick={handlePrint} variant="contained" color="primary">
            Print Slip
          </Button>
          <Button onClick={handleCloseSlipDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalaryManagementList;