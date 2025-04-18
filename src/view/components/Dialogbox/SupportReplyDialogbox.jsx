import React, { useState, useEffect, useRef } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, Box, Paper
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getSupportQueryById, sendSupportReply } from "../../redux/slices/supportSlice";

const ReplyDialog = ({ open, onClose, selectedItem }) => {
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState("");
  const [chatData, setChatData] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && selectedItem?.id) {
      setReplyText("");
      dispatch(getSupportQueryById(selectedItem.id)).then((res) => {
        if (res.payload) {
          setChatData(res.payload);
        }
      });
    }
  }, [open, selectedItem, dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  const handleSubmit = () => {
    if (chatData?.issue?.id && replyText.trim()) {
      dispatch(sendSupportReply({
        id: chatData.issue.id,
        message: replyText
      }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getSupportQueryById(chatData.issue.id)).then((res) => {
            if (res.payload) {
              setChatData(res.payload);
              setReplyText("");
            }
          });
        }
      });
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Conversation with {chatData?.issue?.user_name || "User"}</DialogTitle>

      <DialogContent dividers sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          <strong>Issue:</strong> {chatData?.issue?.issues}
        </Typography>

        {chatData?.messages?.length > 0 ? (
          chatData.messages.map((msg, index) => (
            <Box
              key={msg.id || index}
              sx={{
                display: "flex",
                justifyContent: msg.sender === "restaurant_admin" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  px: 2,
                  py: 1,
                  maxWidth: "70%",
                  bgcolor: msg.sender === "restaurant_admin" ? "primary.light" : "grey.300"
                }}
              >
                <Typography variant="body2">{msg.message}</Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 0.5, textAlign: "right" }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </Typography>
              </Paper>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">No messages yet.</Typography>
        )}

        <div ref={chatEndRef} />
      </DialogContent>

      <DialogActions sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", p: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Type your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Send</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyDialog;
