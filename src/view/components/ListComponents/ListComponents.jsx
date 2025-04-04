// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// const ListComponent = ({ items, onEdit, onDelete, isRestaurant, isTable, isMenu }) => {
//   return (
//     <TableContainer component={Paper} sx={{ mt: 3 }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {isRestaurant ? (
//               <>
//                 <TableCell>
//                   <strong>Image</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Restaurant Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Owner Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Email</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Mobile</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Location</strong>
//                 </TableCell>
//               </>
//             ) : isTable ? (
//               <>
//                 <TableCell>
//                   <strong>Table Number</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Capacity</strong>
//                 </TableCell>
//               </>
//             ) : isMenu ? (
//               <>
//                 <TableCell>
//                   <strong>Category Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Sub Category Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Item Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Item Price</strong>
//                 </TableCell>
//               </>
//             ) : (
//               <>
//                 <TableCell>
//                   <strong>Customer Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Contact No</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Booking Time</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Number of People</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Total Charge</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Table Number</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Capacity</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Status</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Restaurant Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Location</strong>
//                 </TableCell>
//               </>
//             )}
//             <TableCell>
//               <strong>Actions</strong>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {items.length > 0 ? (
//             items.map((item) => (
//               <TableRow key={item.id}>
//                 {isRestaurant ? (
//                   <>
//                     <TableCell>
//                       {Array.isArray(item.images) && item.images.length > 0 ? (
//                         <img
//                           src={item.images[0]}
//                           alt={item.restaurant_name || "Restaurant Image"}
//                           style={{
//                             width: 50,
//                             height: 50,
//                             borderRadius: "5px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       ) : (
//                         "No Image"
//                       )}
//                     </TableCell>
//                     <TableCell>{item.restaurant_name}</TableCell>
//                     <TableCell>{item.owner_name}</TableCell>
//                     <TableCell>{item.email}</TableCell>
//                     <TableCell>{item.mobile}</TableCell>
//                     <TableCell>{item.location}</TableCell>
//                   </>
//                 ) : isTable ? (
//                   <>
//                     <TableCell>{item.table_number}</TableCell>
//                     <TableCell>{item.capacity}</TableCell>
//                   </>
//                 ) : isMenu ? (
//                   <>
//                     <TableCell>{item.category_name}</TableCell>
//                     <TableCell>{item.category_name.sub_category_name}</TableCell>
//                     <TableCell>{item.item_name}</TableCell>
//                     <TableCell>${item.item_price}</TableCell>
//                   </>
//                 ) : (
//                   <>
//                     <TableCell>{item.customer_name}</TableCell>
//                     <TableCell>{item.contact_no}</TableCell>
//                     <TableCell>{item.booking_time}</TableCell>
//                     <TableCell>{item.num_of_people}</TableCell>
//                     <TableCell>${item.total_charge}</TableCell>
//                     <TableCell>{item.table?.table_number || "N/A"}</TableCell>
//                     <TableCell>{item.table?.capacity || "N/A"}</TableCell>
//                     <TableCell>{item.table?.status || "N/A"}</TableCell>
//                     <TableCell>{item.restaurant?.restaurant_name || "N/A"}</TableCell>
//                     <TableCell>{item.restaurant?.location || "N/A"}</TableCell>
//                   </>
//                 )}
//                 <TableCell>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       color="success"
//                       onClick={() => onEdit(item.id)}
//                       size="small"
//                     >
//                       <Edit />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <IconButton
//                       color="error"
//                       onClick={() => onDelete(item.id)}
//                       size="small"
//                     >
//                       <Delete />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={isRestaurant ? 7 : isTable ? 3 : isMenu ? 5 : 10} align="center">
//                 No items available.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ListComponent;




import React, { useState } from "react";
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
  Card,
  CardContent,
  Typography,
  Collapse,
  Grid,
} from "@mui/material";
import { Edit, Delete, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ExpandIcon = styled(IconButton)(({ expanded }) => ({
  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
  transition: "transform 0.3s ease",
}));

const ListComponent = ({ items, onEdit, onDelete, isRestaurant, isTable, isMenu }) => {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const handleExpand = (categoryId) => {
    setExpanded(expanded === categoryId ? null : categoryId);
  };

  const handleRowClick = (id) => {
    if (isRestaurant) {
      navigate(`/createlist/${id}`); // Redirect with restaurant ID
    }
  };

  return isMenu ? (
    // ✅ Menu List UI
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {items.length > 0 ? (
        items.map((category) => (
          <Grid item xs={12} key={category.id}>
            <Card variant="outlined">
              {/* Category Header */}
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {category.category_name}
                </Typography>
                <ExpandIcon
                  expanded={expanded === category.id}
                  onClick={() => handleExpand(category.id)}
                >
                  <ExpandMore />
                </ExpandIcon>
              </CardContent>

              {/* Subcategory and Items */}
              <Collapse in={expanded === category.id} timeout="auto">
                <CardContent>
                  {category.sub_category?.length > 0 ? (
                    category.sub_category.map((sub) => (
                      <div key={sub.id}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            color: "#1976d2",
                            mt: 2,
                          }}
                        >
                          {sub.sub_category_name}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          {sub.menu_items?.length > 0 ? (
                            sub.menu_items.map((menuItem) => (
                              <Grid item xs={12} sm={6} md={4} key={menuItem.id}>
                                <Card
                                  variant="outlined"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 2,
                                  }}
                                >
                                  <Typography>
                                    {menuItem.item_name} - ₹{menuItem.item_price}
                                  </Typography>
                                  <div>
                                    <Tooltip title="Edit">
                                      <IconButton
                                        color="primary"
                                        onClick={() => onEdit(menuItem.id)}
                                        size="small"
                                      >
                                        <Edit />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton
                                        color="error"
                                        onClick={() => onDelete(menuItem.id)}
                                        size="small"
                                      >
                                        <Delete />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </Card>
                              </Grid>
                            ))
                          ) : (
                            <Typography sx={{ ml: 2, color: "#777" }}>
                              No menu items available.
                            </Typography>
                          )}
                        </Grid>
                      </div>
                    ))
                  ) : (
                    <Typography sx={{ color: "#777" }}>No subcategories available.</Typography>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography align="center" sx={{ width: "100%", mt: 3 }}>
          No categories available.
        </Typography>
      )}
    </Grid>
  ) : (
    // ✅ Table-based UI for Other Pages
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {isRestaurant ? (
              <>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Restaurant Name</strong></TableCell>
                <TableCell><strong>Owner Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Mobile</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
              </>
            ) : isTable ? (
              <>
                <TableCell><strong>Table Number</strong></TableCell>
                <TableCell><strong>Capacity</strong></TableCell>
              </>
            ) : (
              <>
                <TableCell><strong>Customer Name</strong></TableCell>
                <TableCell><strong>Contact No</strong></TableCell>
                <TableCell><strong>Booking Time</strong></TableCell>
                <TableCell><strong>Number of People</strong></TableCell>
                <TableCell><strong>Total Charge</strong></TableCell>
                <TableCell><strong>Table Number</strong></TableCell>
                <TableCell><strong>Capacity</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Restaurant Name</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
              </>
            )}
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow
                key={item.id}
                onClick={isRestaurant ? () => handleRowClick(item.id) : undefined}
                style={isRestaurant ? { cursor: "pointer" } : {}}
              >
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
                    <TableCell>{item.restaurant?.restaurant_name || "N/A"}</TableCell>
                    <TableCell>{item.restaurant?.location || "N/A"}</TableCell>
                  </>
                )}
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton color="success" onClick={() => onEdit(item.id)} size="small">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => onDelete(item.id)} size="small">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
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
