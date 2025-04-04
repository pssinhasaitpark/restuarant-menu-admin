import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createRestaurant, updateRestaurant } from "../../redux/slices/restaurantSlice";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const initialValues = {
  restaurant_name: "",
  owner_name: "",
  email: "",
  password: "",
  mobile: "",
  opening_hours: "",
  location: "",
  images: "",
};

const RestaurantForm = ({ setOpenDialog }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id))
        .unwrap()
        .then((restaurant) => {
          setFormValues(restaurant); // Populate form with fetched data
          if (restaurant.images?.length > 0) {
            setPreviewImages(restaurant.images);
          }
        })
        .catch((error) => console.error("Error fetching restaurant:", error));
    }
  }, [id, dispatch]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prevValues) => ({
      ...prevValues,
      images: files,
    }));

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        if (key === "images") {
          formValues.images.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, formValues[key]);
        }
      });

      if (id) {
        await dispatch(updateRestaurant({ id, restaurantData: formData })).unwrap();
      } else {
        await dispatch(createRestaurant(formData)).unwrap();
      }
      navigate("/restaurantform");
    } catch (error) {
      setError("Error occurred while submitting restaurant data");
    } finally {
      setLoading(false);
    }
    setOpenDialog(false);
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%" sx={{ backgroundColor: "#e0e0e0" }}>
      <Paper elevation={6} sx={{ p: 5, width: "100%", maxWidth: "600px", borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#D84315", textAlign: "center", mb: 2 }}>
          {id ? "Update Restaurant" : "Create Restaurant"}
        </Typography>

        <Typography variant="body1" mb={3} color="textSecondary" sx={{ textAlign: "center" }}>
          {id ? "Edit the restaurant details below." : "Please fill in the details to add your restaurant."}
        </Typography>

        <Grid container spacing={2}>
          {[
            { name: "restaurant_name", label: "Restaurant Name" },
            { name: "owner_name", label: "Owner Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
            { name: "mobile", label: "Mobile" },
            { name: "opening_hours", label: "Opening Hours" },
            { name: "location", label: "Location" },
          ].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                variant="outlined"
                label={field.label}
                type={field.type || "text"}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleInputChange}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              multiple
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span" startIcon={<PhotoCamera />} fullWidth>
                Upload Images
              </Button>
            </label>
          </Grid>

          {previewImages.length > 0 && (
            <Grid item xs={12}>
              <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                {previewImages.map((image, index) => (
                  <img key={index} src={image} alt={`Preview ${index}`} width="80px" height="80px" style={{ borderRadius: 5 }} />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : id ? "Update Restaurant" : "Create Restaurant"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" variant="body2" sx={{ textAlign: "center", marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>

    
    </Box>
  );
};

export default RestaurantForm;