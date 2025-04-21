import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStockItems,
  createStockItem,
  updateStockItem,
  deleteStockItem,
} from "../../redux/slices/stockSlice";
import StockForm from "../Forms/StockForm";
import ListComponent from "../ListComponents/ListComponents";

const StockManagement = () => {
  const dispatch = useDispatch();
  const { items: stockItems, loading } = useSelector((state) => state.stock);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [openReport, setOpenReport] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    dispatch(fetchAllStockItems());
  }, [dispatch]);

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setOpenDialog(false);
  };

  const handleSaveItem = (data) => {
    if (editingItem) {
      dispatch(updateStockItem({ id: editingItem.id, data })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchAllStockItems());
          handleCloseDialog();
        }
      });
    } else {
      dispatch(createStockItem(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchAllStockItems());
          handleCloseDialog();
        }
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteStockItem(id));
  };

  const handleGenerateReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handlePrintReport = () => {
    setIsPrinting(true);
    window.print();
  };

  const calculateTotalPrice = () => {
    return stockItems.reduce(
      (total, item) => total + item.price_per_unit * item.quantity,
      0
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h5" mb={3}>
            Stock Management
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Generate Report Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "transparent",
              color: "primary.main",
              border: "1px solid",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "#81C784",
                borderColor: "#81C784",
                color: "white",
              },
            }}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDialog(null)}
          >
            Add Stock Item
          </Button>
        </Box>
      </Box>

      {/* Stock Item List */}
      <ListComponent
        items={stockItems}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        handleOpenDialog={handleOpenDialog}
        handleDelete={handleDelete}
        isStock={true}
      />

      {/* Stock Item Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <StockForm
          initialValues={editingItem}
          onClose={handleCloseDialog}
          onSave={handleSaveItem}
        />
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog
        open={openReport}
        onClose={handleCloseReport}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Stock Report
          </Typography>

          <div id="report-section">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Item Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Category
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Price
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Quantity
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Total Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {stockItems.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {item.item_name}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {item.category_name}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      ₹{item.price_per_unit}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      ₹{item.price_per_unit * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Price Row */}
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Price: ₹{calculateTotalPrice()}
              </Typography>
            </Box>
          </div>

          {/* Print and Close Buttons */}

          <Box
            className="no-print"
            sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrintReport}
            >
              Print Report
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseReport}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default StockManagement;
