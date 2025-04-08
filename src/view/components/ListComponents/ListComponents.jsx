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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ListComponent = ({
  items,
  onEdit,
  onDelete,
  isRestaurant,
  isTable,
  isMenu,
}) => {
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
                  <strong>Capacity</strong>
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
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                {isRestaurant ? (
                  <>
                    <TableCell>
                      {Array.isArray(item.images) && item.images.length > 0 ? (
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
                  </>
                ) : isMenu ? (
                  <>
                    <TableCell>{item.category_name}</TableCell>
                    
                    {items.length > 0 ? (
                      items.map((item) =>
                        item.menu_items.map((menuItem, index) => (

                          <TableRow key={`${item.id}-${index}`}>
                            <TableCell>{menuItem.item_name}</TableCell>
                            {/* <TableCell>${menuItem.item_price}</TableCell> */}
                          </TableRow>
                        ))
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>No items found.</TableCell>
                      </TableRow>
                    )}
                    <TableCell>
                     {items.length > 0 ? (
                      items.map((item) =>
                        item.menu_items.map((menuItem, index) => (
                          <TableRow key={`${item.id}-${index}`}>
                            {/* <TableCell>{menuItem.item_name}</TableCell> */}
                            <TableCell>${menuItem.item_price}</TableCell>
                          </TableRow>
                        ))
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>No items found.</TableCell>
                      </TableRow>
                    )}
                    </TableCell>
                    {/* <TableCell>${item.item_price}</TableCell> */}
                  </>
                ) : (
                  <>
                    <TableCell>{item.customer_name}</TableCell>
                    <TableCell>{item.contact_no}</TableCell>
                    <TableCell>{item.booking_time}</TableCell>
                    <TableCell>{item.num_of_people}</TableCell>
                    <TableCell>${item.total_charge}</TableCell>
                    <TableCell>{item.table?.table_number || "N/A"}</TableCell>
                    <TableCell>{item.table?.capacity || "N/A"}</TableCell>
                    <TableCell>{item.table?.status || "N/A"}</TableCell>
                    <TableCell>
                      {item.restaurant?.restaurant_name || "N/A"}
                    </TableCell>
                    <TableCell>{item.restaurant?.location || "N/A"}</TableCell>
                  </>
                )}
                <TableCell>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={isRestaurant ? 7 : isTable ? 3 : isMenu ? 5 : 10}
                align="center"
              >
                No items available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListComponent;

