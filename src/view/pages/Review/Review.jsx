import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Rating,
  CircularProgress,
  Box,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { fetchReviews } from "../../redux/slices/reviewSlice";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { review, loading, error } = useSelector((state) => state.reviews);

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    if (page > Math.ceil(review.length / itemsPerPage)) {
      setPage(1);
    }
  }, [review, page, itemsPerPage]);

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedReviews = review.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(review.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here is customer review about your restaurant
      </Typography>

      {loading && <CircularProgress />}
      {/* {error && <Typography color="error">{error}</Typography>} */}
      {review.length === 0 && !loading && (
        <Typography variant="body2">No reviews available.</Typography>
      )}

      <Grid container spacing={2}>
        {paginatedReviews.map((rev) => (
          <Grid item xs={12} key={rev.id} sx={{ width: "100%" }}>
            <Card elevation={3}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: 2,
                }}
              >
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

                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" sx={{ flex: 1, pr: 2 }}>
                    {rev.comment}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Rating
                      value={rev.stars}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" color="textSecondary">
                      ({rev.stars})
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <CustomPagination
            page={page}
            count={pageCount}
            onChange={(event, value) => setPage(value)}
          />
        </Box>
      )}
    </div>
  );
};

export default ReviewPage;
