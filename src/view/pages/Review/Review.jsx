import React from "react";
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Button, Rating, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { blue, orange } from "@mui/material/colors";

const reviews = [
  {
    name: "James Kowalski",
    role: "Hotel Receptionist",
    date: "2 June 2020",
    tags: ["Good Service", "Best Place"],
    rating: 3.5,
    review:
      "We recently had dinner with friends at David CC and we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back! I will give a good recommendation to my friend, family, and people who I look.",
  },
  // Add more reviews here...
];

const dishes = [
  {
    title: "Chicken Curry Special",
    reviewer: "Robert Jr.",
    rating: 4.5,
  },
  {
    title: "Spaghetti Special with Barbeque",
    reviewer: "Lord Neal Stark",
    rating: 4.5,
  },
  {
    title: "Pizza Mozarella with Spicy Cream",
    reviewer: "Frady Mercury",
    rating: 4.5,
  },
];

const ReviewPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Others Review
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here is customer review about your restaurant
      </Typography>

      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid item xs={12} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar sx={{ bgcolor: orange[500] }}>{review.name[0]}</Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">{review.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {review.role} - {review.date}
                    </Typography>
                    <div style={{ margin: "10px 0" }}>
                      {review.tags.map((tag, idx) => (
                        <Chip key={idx} label={tag} color="primary" sx={{ marginRight: 1 }} />
                      ))}
                    </div>
                    <Typography variant="body2">{review.review}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="primary">
                      {review.rating}
                    </Typography>
                    <Rating value={review.rating} precision={0.5} readOnly />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Load More
      </Button>
    </div>
  );
};

export default ReviewPage;