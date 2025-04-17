import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";

const SalarySlipPreview = ({ open, handleClose, data, staff }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `SalarySlip_${staff?.first_name}_${data?.payment_date}`,
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Salary Slip</DialogTitle>
      <DialogContent>
        <Box ref={componentRef} sx={{ p: 3, fontFamily: "Arial" }}>
          {/* Header */}
          <Typography variant="h5" align="center" fontWeight="bold">
            {staff?.restaurant_name || "Restaurant Name"}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Salary Slip for {new Date(data?.payment_date).toLocaleString("default", { month: "long", year: "numeric" })}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Employee Info */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>
              <Typography><strong>Name:</strong> {staff?.first_name} {staff?.last_name}</Typography>
              <Typography><strong>Designation:</strong> {staff?.designation || "N/A"}</Typography>
              <Typography><strong>Department:</strong> {staff?.department || "N/A"}</Typography>
            </Box>
            <Box>
              <Typography><strong>Employee ID:</strong> {data?.employee_id || staff?.id}</Typography>
              <Typography><strong>Bank Name:</strong> {staff?.bank_name || "N/A"}</Typography>
              <Typography><strong>Account No:</strong> {staff?.account_no || "N/A"}</Typography>
            </Box>
          </Box>

          {/* Earnings and Deductions Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}><strong>Earnings</strong></TableCell>
                  <TableCell colSpan={2}><strong>Deductions</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell>₹{data?.base_salary}</TableCell>
                  <TableCell>EPF</TableCell>
                  <TableCell>₹{data?.epf || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bonus</TableCell>
                  <TableCell>₹{data?.bonus || 0}</TableCell>
                  <TableCell>Health Insurance</TableCell>
                  <TableCell>₹{data?.health_insurance || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>Professional Tax</TableCell>
                  <TableCell>₹{data?.prof_tax || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>TDS</TableCell>
                  <TableCell>₹{data?.tds || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Gross Salary</strong></TableCell>
                  <TableCell><strong>₹{data?.gross_salary}</strong></TableCell>
                  <TableCell><strong>Total Deductions</strong></TableCell>
                  <TableCell><strong>₹{data?.total_deduction}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Net Pay */}
          <Box textAlign="center" mt={4}>
            <Typography variant="h6">
              <strong>Net Pay: ₹{data?.total_pay_amount}</strong>
            </Typography>
            <Typography variant="body2">
              <strong>In Words:</strong> {/* Optional: convert number to words */}
            </Typography>
          </Box>
        </Box>

        {/* Buttons */}
        <Box display="flex" justifyContent="center" mt={3} mb={1}>
          <Button variant="contained" color="primary" onClick={handlePrint} sx={{ mr: 2 }}>
            Print
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SalarySlipPreview;
