// import React from "react";
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

// const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Confirm Deletion</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Are you sure you want to delete this restaurant? This action cannot be undone.
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={onConfirm} color="secondary">
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmationDialog;
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this restaurant? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
