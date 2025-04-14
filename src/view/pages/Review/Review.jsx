import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Rating,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { fetchReviews, deleteReviews } from "../../redux/slices/reviewSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { review, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteReviews(id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here is customer review about your restaurant
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {review.length === 0 && !loading && (
        <Typography variant="body2">No reviews available.</Typography>
      )}

      <Grid container spacing={2}>
        {review.map((rev) => (
          <Grid item xs={12} key={rev.id} sx={{ width: "100%" }}>
<Card elevation={3}>
  <CardContent sx={{ display: "flex", flexDirection: "column", paddingBottom: 2 }}>
    {/* Avatar, User Name, Created At */}
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar sx={{ bgcolor: green[200] }}>
        {rev.user_name?.[0] || "U"}
      </Avatar>
      <Box>
        <Typography variant="h6">{rev.user_name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(rev.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Typography>
      </Box>
    </Box>

    {/* Review Text - Spans full width */}
    <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
  {/* Review text on the left, taking most of the width */}
  <Typography variant="body1" sx={{ flex: 1, pr: 2 }}>
    {rev.comment}
  </Typography>

  {/* Stars + Rating on the right */}
  <Box display="flex" alignItems="center" gap={1}>
    <Rating value={rev.stars} precision={0.5} readOnly size="small" />
    <Typography variant="body2" color="textSecondary">
      ({rev.stars})
    </Typography>
  </Box>
</Box>

  
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <IconButton onClick={() => handleDelete(rev.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
   
  </CardContent>
</Card>



          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ReviewPage;
