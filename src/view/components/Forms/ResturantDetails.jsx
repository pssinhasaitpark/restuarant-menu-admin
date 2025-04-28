import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import { fetchAllRestaurantDetails, addOrUpdateRestaurantDetails } from "../../redux/slices/resturanrDetailsSlice";

const RestaurantDetails = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector((state) => state.restaurantDetails);
  const [formData, setFormData] = useState({
    gallery_images: [],
    about_us: "",
    services_name: [],
    privacy_policy: "",
    terms_and_conditions: "",
    newService: "",
    removeImages: [], // Track images to remove
  });

  useEffect(() => {
    if (!details) {
      dispatch(fetchAllRestaurantDetails());
    } else {
      setFormData({
        gallery_images: details.gallery_images || [],
        about_us: details.about_us || "",
        services_name: details.services_name || [],
        privacy_policy: details.privacy_policy || "",
        terms_and_conditions: details.terms_and_conditions || "",
        newService: "",
        removeImages: [],
      });
    }
  }, [dispatch, details]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevState) => ({
      ...prevState,
      gallery_images: [...prevState.gallery_images, ...Array.from(files)],
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewServiceChange = (e) => {
    setFormData({ ...formData, newService: e.target.value });
  };

  const handleAddService = () => {
    if (formData.newService.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        services_name: [...prevState.services_name, prevState.newService],
        newService: "",
      }));
    }
  };

  const handleDeleteImage = (imageUrl) => {
    setFormData((prevState) => ({
      ...prevState,
      gallery_images: prevState.gallery_images.filter(
        (image) => image !== imageUrl
      ),
      removeImages: [...prevState.removeImages, imageUrl], // Add to remove list
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("about_us", formData.about_us);
    formDataToSend.append("terms_and_conditions", formData.terms_and_conditions);
    formDataToSend.append("privacy_policy", formData.privacy_policy);
    formDataToSend.append("services_name", JSON.stringify(formData.services_name));

    formData.gallery_images.forEach((file) => {
      formDataToSend.append("gallery_images", file);
    });

    // Add the images to be removed
    formDataToSend.append("removeImages", JSON.stringify(formData.removeImages));

    dispatch(addOrUpdateRestaurantDetails(formDataToSend));
    dispatch(fetchAllRestaurantDetails());
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Restaurant Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            name="about_us"
            label="About Us"
            variant="outlined"
            multiline
            minRows={2}
            maxRows={6}
            fullWidth
            value={formData.about_us}
            onChange={handleTextChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="terms_and_conditions"
            label="Terms and Conditions"
            variant="outlined"
            multiline
            minRows={2}
            maxRows={6}
            fullWidth
            value={formData.terms_and_conditions}
            onChange={handleTextChange}
            sx={{ marginTop: 2 }}
          />

          <TextField
            name="privacy_policy"
            label="Privacy and Policy"
            variant="outlined"
            multiline
            minRows={2}
            maxRows={6}
            fullWidth
            value={formData.privacy_policy}
            onChange={handleTextChange}
            sx={{ marginTop: 3 }}
          />
        </Grid>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <TextField
            name="newService"
            label="Service Name"
            variant="outlined"
            fullWidth
            value={formData.newService}
            onChange={handleNewServiceChange}
            sx={{ marginBottom: 2 }}
          />

          <IconButton color="primary" onClick={handleAddService} sx={{ marginLeft: 1 }}>
            <AddCircle />
          </IconButton>
        </Box>

        {formData.services_name.length > 0 ? (
          <Box sx={{ marginTop: 1 }}>
            {formData.services_name.map((service, index) => (
              <Typography key={index} variant="body1">
                {service}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No services added yet.
          </Typography>
        )}

        {/* Gallery Section */}
        <Grid item xs={12} sx={{mt:2}}>
          <Typography variant="h6" gutterBottom>
            Gallery Images
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" component="label" sx={{ marginRight: 2 }}>
              Upload Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {formData.gallery_images.length > 0 && (
            <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
              {formData.gallery_images.map((image, index) => (
                <Box key={index} sx={{ position: "relative", marginRight: 2, marginBottom: 2 }}>
                  <img
                    src={image instanceof File ? URL.createObjectURL(image) : image} 
                    alt={`Gallery Image ${index + 1}`}
                    width="100"
                    height="100"
                  />
                  <IconButton 
                    onClick={() => handleDeleteImage(image)} 
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 3 }}>
            Save Details
          </Button>
        </Grid>
      </form>

      {error && (
        <Box sx={{ marginTop: 2, color: "red" }}>
          <Typography variant="body2">Error: {error}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RestaurantDetails;
