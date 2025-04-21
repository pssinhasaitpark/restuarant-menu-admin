import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ListComponent = ({
  items,
  onEdit,
  onDelete,
  handleOpenDialog,
  handleDelete,
  isRestaurant,
  isTable,
  isMenu,
  isSupport,
  isStaff,
  isUser,
  isOrder,
  isStock,
  noDataMessage,
  onReply,
}) => {
  const navigate = useNavigate();

  const handleManageSalary = (id) => {
    navigate(`/salarylist?id=${id}`);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {isRestaurant ? (
              <>
                <TableCell>
                  <strong>Image</strong>
                </TableCell>
                <TableCell>
                  <strong>Restaurant Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Owner Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Mobile</strong>
                </TableCell>
                <TableCell>
                  <strong>Location</strong>
                </TableCell>
              </>
            ) : isTable ? (
              <>
                <TableCell>
                  <strong>Table Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Capacity</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
              </>
            ) : isMenu ? (
              <>
                <TableCell>
                  <strong>Category Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Item Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Item Price</strong>
                </TableCell>
              </>
            ) : isSupport ? (
              <>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact No</strong>
                </TableCell>
                <TableCell>
                  <strong>Issues</strong>
                </TableCell>
                <TableCell>
                  <strong>Reply</strong>
                </TableCell>
              </>
            ) : isStaff ? (
              <>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Employee Id</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact No</strong>
                </TableCell>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell>
                  <strong>Designation</strong>
                </TableCell>
                <TableCell>
                  <strong>Department</strong>
                </TableCell>
                <TableCell>
                  <strong>Joining Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Salary</strong>
                </TableCell>
              </>
            ) : isUser ? (
              <>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact No</strong>
                </TableCell>
              </>
            ) : isOrder ? (
              <>
                <TableCell>
                  <strong>S.No</strong>
                </TableCell>
                <TableCell>
                  <strong>Token No.</strong>
                </TableCell>
                <TableCell>
                  <strong>Customer Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Item Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Qty</strong>
                </TableCell>
                <TableCell>
                  <strong>Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Subtotal</strong>
                </TableCell>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
                <TableCell>
                  <strong>Invoice</strong>
                </TableCell>
              </>
            ) : isStock ? (
              <>
                <TableCell>
                  <strong>Item Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Quantity</strong>
                </TableCell>
                <TableCell>
                  <strong>Unit</strong>
                </TableCell>
                <TableCell>
                  <strong>Supplier</strong>
                </TableCell>
                <TableCell>
                  <strong>Price per Unit</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Amount</strong>
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>
                  <strong>Customer Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact No</strong>
                </TableCell>
                <TableCell>
                  <strong>Booking Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Number of People</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Charge</strong>
                </TableCell>
                <TableCell>
                  <strong>Table Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Restaurant Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Location</strong>
                </TableCell>
              </>
            )}
            {!isOrder && (
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <React.Fragment key={item.id}>
                {isMenu ? (
                  item.menu_items.map((menuItem, idx) => (
                    <TableRow key={`${item.id}-${idx}`}>
                      {idx === 0 && (
                        <TableCell rowSpan={item.menu_items.length}>
                          {item.category_name}
                        </TableCell>
                      )}
                      <TableCell>{menuItem.item_name}</TableCell>
                      <TableCell>${menuItem.item_price}</TableCell>
                      {idx === 0 && (
                        <TableCell rowSpan={item.menu_items.length}>
                          <Tooltip title="Edit">
                            <IconButton
                              color="success"
                              onClick={() => onEdit(item.id)}
                              size="small"
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => onDelete(item.id)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : isOrder ? (
                  item.items.map((menuItem, idx) => (
                    <TableRow key={menuItem.id}>
                      {idx === 0 && (
                        <>
                          <TableCell rowSpan={item.items.length}>
                            {index + 1}
                          </TableCell>
                          <TableCell rowSpan={item.items.length}>
                            {item.token_number}
                          </TableCell>
                          <TableCell rowSpan={item.items.length}>
                            {item.customer_name}
                          </TableCell>
                          <TableCell rowSpan={item.items.length}>
                            {new Date(item.createdAt).toLocaleString()}
                          </TableCell>
                        </>
                      )}
                      <TableCell>{menuItem.name}</TableCell>
                      <TableCell>{menuItem.quantity}</TableCell>
                      <TableCell>₹{menuItem.price}</TableCell>
                      <TableCell>
                      ₹{(menuItem.quantity * menuItem.price).toFixed(2)}
                      </TableCell>
                      {idx === 0 && (
                        <>
                          <TableCell rowSpan={item.items.length}>
                          ₹{item.total_amount}
                          </TableCell>

                          <TableCell rowSpan={item.items.length}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => onEdit(item)}
                            >
                              Generate
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))
                ) : isStock ? (
                  <TableRow key={item.id}>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{item.category_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.supplier_name}</TableCell>
                    <TableCell>{item.price_per_unit}</TableCell>
                    <TableCell>{item.total_price}</TableCell>
                    <TableCell>
                      <IconButton
                        color="success"
                        onClick={() => handleOpenDialog(item)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    {isRestaurant ? (
                      <>
                        <TableCell>
                          {Array.isArray(item.images) &&
                          item.images.length > 0 ? (
                            <img
                              src={item.images[0]}
                              alt={item.restaurant_name || "Restaurant Image"}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: "5px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </TableCell>
                        <TableCell>{item.restaurant_name}</TableCell>
                        <TableCell>{item.owner_name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.location}</TableCell>
                      </>
                    ) : isTable ? (
                      <>
                        <TableCell>{item.table_number}</TableCell>
                        <TableCell>{item.capacity}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </>
                    ) : isSupport ? (
                      <>
                        <TableCell>{item.user_name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile_no}</TableCell>
                        <TableCell>{item.issues}</TableCell>
                        <TableCell>
                          {/* <button onClick={() => onReply(item)}>Reply</button> */}
                          <Button
                            variant="outlined"
                            sx={{
                              borderColor: "#4caf50",
                              color: "#4caf50",
                              "&:hover": {
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                              },
                            }}
                            onClick={() => onReply(item)}
                          >
                            Reply
                          </Button>
                        </TableCell>
                      </>
                    ) : isStaff ? (
                      <>
                        <TableCell>{item.first_name}</TableCell>
                        <TableCell>{item.last_name}</TableCell>
                        <TableCell>{item.employee_id}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile_no}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.designation}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>{item.joining_date}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            sx={{
                              borderColor: "#4caf50",
                              color: "#4caf50",
                              "&:hover": {
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                              },
                            }}
                            onClick={() => handleManageSalary(item.id)}
                          >
                            Manage Salary
                          </Button>
                        </TableCell>
                      </>
                    ) : isUser ? (
                      <>
                        <TableCell>{item.user_name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile_no}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{item.customer_name}</TableCell>
                        <TableCell>{item.contact_no}</TableCell>
                        <TableCell>{item.booking_time}</TableCell>
                        <TableCell>{item.num_of_people}</TableCell>
                        <TableCell>${item.total_charge}</TableCell>
                        <TableCell>
                          {item.tables[0]?.table_number || "N/A"}
                        </TableCell>
                        <TableCell>{item.tables[0]?.status || "N/A"}</TableCell>
                        <TableCell>
                          {item.restaurant?.restaurant_name || "N/A"}
                        </TableCell>
                        <TableCell>
                          {item.restaurant?.location || "N/A"}
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      {!isUser && !isSupport && (
                        <Tooltip title="Edit">
                          <IconButton
                            color="success"
                            onClick={() => onEdit(item.id)}
                            size="small"
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => onDelete(item.id)}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={
                  isOrder
                    ? 13
                    : isRestaurant
                    ? 7
                    : isTable
                    ? 4
                    : isMenu
                    ? 4
                    : isSupport
                    ? 6
                    : isStaff
                    ? 10
                    : isUser
                    ? 4
                    : isStock
                    ? 7
                    : 10
                }
                align="center"
              >
                {noDataMessage || "No items available."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListComponent;
