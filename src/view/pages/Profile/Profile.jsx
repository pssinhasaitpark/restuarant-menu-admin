import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileData } from "../../redux/slices/profileSlice";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Paper,
  Grid,
  Divider,
  Container,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function Profile() {
  const dispatch = useDispatch();
  const {
    owner_name,
    restaurant_name,
    role_type,
    email,
    mobile,
    loading,
    error,
  } = useSelector((state) => state.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    owner_name: "",
    restaurant_name: "",
    role_type: "",
    email: "",
    mobile: "",
  });

  // Fetch profile data on mount
  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  // Update form data when profile data is loaded
  useEffect(() => {
    setFormData({
      owner_name,
      restaurant_name,
      role_type,
      email,
      mobile,
    });
  }, [owner_name, restaurant_name, role_type, email, mobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can dispatch an updateProfileData action here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      owner_name,
      restaurant_name,
      role_type,
      email,
      mobile,
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" alignItems="center">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        {!isEditing ? (
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  src="/api/placeholder/150/150"
                  alt={formData.owner_name}
                  sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                  <Typography variant="h5" component="h1" gutterBottom>
                    {formData.owner_name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {formData.email}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* First row with Restaurant Name only */}
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    Restaurant Name:
                  </Typography>
                  <Typography>{formData.restaurant_name}</Typography>
                </Box>
              </Grid>

              {/* Second row with Role Type */}
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    Role Type:
                  </Typography>
                  <Typography>{formData.role_type}</Typography>
                </Box>
              </Grid>

              {/* Third row with Mobile */}
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    Mobile:
                  </Typography>
                  <Typography>{formData.mobile}</Typography>
                </Box>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </CardActions>
          </Card>
        ) : (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                src="/api/placeholder/150/150"
                alt={formData.owner_name}
                sx={{ width: 80, height: 80, mr: 3 }}
              />
              <Typography variant="body2" color="text.secondary">
                (Avatar editing not implemented)
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="owner_name"
                  label="Owner Name"
                  fullWidth
                  value={formData.owner_name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="restaurant_name"
                  label="Restaurant Name"
                  fullWidth
                  value={formData.restaurant_name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="role_type"
                  label="Role Type"
                  fullWidth
                  value={formData.role_type}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="mobile"
                  label="Mobile"
                  fullWidth
                  value={formData.mobile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Profile;
