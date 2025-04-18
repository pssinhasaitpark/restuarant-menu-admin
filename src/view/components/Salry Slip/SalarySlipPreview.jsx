import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const SalarySlip = ({ data, staff }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "auto",
        fontFamily: "Georgia, serif",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >

      {/* Printable Area */}
      <Box id="print-section">
        
        <Typography variant="h4" align="center" gutterBottom>
          SALARY SLIP
        </Typography>
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Foodie's Delight Restaurant
          </Typography>
          <Typography variant="subtitle2">fooddelight@gmail.com</Typography>
          <Typography variant="subtitle2">123 Corporate Street</Typography>
          <Typography variant="subtitle2">Mumbai, India</Typography>
        </Box>

      </Box>
        <Divider sx={{ my: 2 }} />

        {/* Pay Period & Employee Info */}
        <Box mb={2}>
          <Typography>
            <strong>Employee Name:</strong> {staff.first_name} {staff.last_name}
          </Typography>
          <Typography>
            <strong>Position:</strong> {staff.designation}
          </Typography>
          <Typography>
            <strong>Pay Date:</strong>{" "}
            {new Date(data.payment_date).toLocaleDateString()}
          </Typography>
          {/* <Typography>
            <strong>Employee ID:</strong> {staff.employee_id}
          </Typography> */}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Full Salary Table */}
        <TableContainer component={Paper} elevation={1}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell><strong>Base Salary</strong></TableCell>
                <TableCell>₹{data.base_salary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Bonus</strong></TableCell>
                <TableCell>₹{data.bonus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Gross Salary</strong></TableCell>
                <TableCell>₹{data.gross_salary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Absence Days</strong></TableCell>
                <TableCell>{data.absence_days}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Total Deductions</strong></TableCell>
                <TableCell>₹{data.total_deduction}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Net Pay</strong></TableCell>
                <TableCell><strong>₹{data.total_pay_amount}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Signature */}
        <Box display="flex" justifyContent="space-between" mt={5}>
          <Typography>Employee Signature: ______________</Typography>
          <Typography>Authorized Signature: ______________</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SalarySlip;
