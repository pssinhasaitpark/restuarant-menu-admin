// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   CircularProgress,
//   Grid,
//   TextField,
//   Button,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { createRestaurant, updateRestaurant, fetchRestaurantById } from "../../redux/slices/restaurantSlice";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";

// const initialValues = {
//   restaurant_name: "",
//   owner_name: "",
//   email: "",
//   password: "",
//   mobile: "",
//   opening_time: "",
//   closing_time: "",
//   location: "",
//   images: [],
//   logo: null,
// };

// const RestaurantForm = ({ setOpenDialog }) => {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formValues, setFormValues] = useState(initialValues);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [logoPreview, setLogoPreview] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchRestaurantById(id))
//         .unwrap()
//         .then((restaurant) => {
//           setFormValues((prev) => ({
//             ...prev,
//             ...restaurant,
//             images: [],
//             logo: null,
//           }));

//           if (restaurant.images?.length > 0) {
//             setPreviewImages(restaurant.images);
//           }

//           if (restaurant.logo) {
//             setLogoPreview(restaurant.logo);
//           }
//         })
//         .catch((error) => console.error("Error fetching restaurant:", error));
//     }
//   }, [id, dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       images: files,
//     }));

//     const imagePreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages(imagePreviews);
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         logo: file,
//       }));
//       setLogoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       Object.keys(formValues).forEach((key) => {
//         if (key === "images") {
//           formValues.images.forEach((file) => formData.append("images", file));
//         } else if (key === "logo" && formValues.logo) {
//           formData.append("logo", formValues.logo);
//         } else {
//           formData.append(key, formValues[key]);
//         }
//       });

//       if (id) {
//         await dispatch(updateRestaurant({ id, restaurantData: formData })).unwrap();
//       } else {
//         await dispatch(createRestaurant(formData)).unwrap();
//       }
//       navigate("/restaurantform");
//       setOpenDialog(false);
//     } catch (error) {
//       setError("Error occurred while submitting restaurant data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100%" sx={{ backgroundColor: "#e0e0e0" }}>
//       <Paper elevation={6} sx={{ p: 5, width: "100%", maxWidth: "600px", borderRadius: 3 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#D84315", textAlign: "center", mb: 2 }}>
//           {id ? "Update Restaurant" : "Create Restaurant"}
//         </Typography>

//         <Typography variant="body1" mb={3} color="textSecondary" sx={{ textAlign: "center" }}>
//           {id ? "Edit the restaurant details below." : "Please fill in the details to add your restaurant."}
//         </Typography>

//         <Grid container spacing={2}>
//           {[
//             { name: "restaurant_name", label: "Restaurant Name" },
//             { name: "owner_name", label: "Owner Name" },
//             { name: "email", label: "Email", type: "email" },
//             { name: "password", label: "Password", type: "password" },
//             { name: "mobile", label: "Mobile" },
//             { name: "opening_time", label: "Opening Time", type: "time" },
//             { name: "closing_time", label: "Closing Time", type: "time" },
//             { name: "location", label: "Location" },
//           ].map((field, index) => (
//             <Grid item xs={12} sm={6} key={index}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label={field.label}
//                 type={field.type || "text"}
//                 name={field.name}
//                 value={formValues[field.name]}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//           ))}

//           <Grid item xs={12}>
//             <input
//               accept="image/*"
//               type="file"
//               multiple
//               id="image-upload"
//               style={{ display: "none" }}
//               onChange={handleImageChange}
//             />
//             <label htmlFor="image-upload">
//               <Button variant="contained" component="span" startIcon={<PhotoCamera />} fullWidth>
//                 Upload Restaurant Images
//               </Button>
//             </label>
//           </Grid>

//           {previewImages.length > 0 && (
//             <Grid item xs={12}>
//               <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
//                 {previewImages.map((image, index) => (
//                   <img key={index} src={image} alt={`Preview ${index}`} width="80px" height="80px" style={{ borderRadius: 5 }} />
//                 ))}
//               </Box>
//             </Grid>
//           )}

//           <Grid item xs={12}>
//             <input
//               accept="image/*"
//               type="file"
//               id="logo-upload"
//               style={{ display: "none" }}
//               onChange={handleLogoChange}
//             />
//             <label htmlFor="logo-upload">
//               <Button variant="contained" component="span" startIcon={<PhotoCamera />} fullWidth>
//                 Upload Logo
//               </Button>
//             </label>
//           </Grid>

//           {logoPreview && (
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center" mt={2}>
//                 <img src={logoPreview} alt="Logo Preview" width="100px" height="100px" style={{ borderRadius: 8 }} />
//               </Box>
//             </Grid>
//           )}
//         </Grid>

//         <Box mt={3}>
//           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} fullWidth>
//             {loading ? <CircularProgress size={24} /> : id ? "Update Restaurant" : "Create Restaurant"}
//           </Button>
//         </Box>

//         {error && (
//           <Typography color="error" variant="body2" sx={{ textAlign: "center", marginTop: 2 }}>
//             {error}
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default RestaurantForm;
import React, { useEffect, useState } from "react";
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

const defaultValues = {
  restaurant_name: "",
  owner_name: "",
  email: "",
  password: "",
  mobile: "",
  opening_time: "",
  closing_time: "",
  location: "",
  images: [],
  logo: null,
};

const RestaurantForm = ({ initialValues = defaultValues, onClose, onSave }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [previewImages, setPreviewImages] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormValues({ ...defaultValues, ...initialValues });
    if (initialValues?.images?.length > 0) {
      setPreviewImages(initialValues.images);
    }
    if (initialValues?.logo && typeof initialValues.logo === "string") {
      setLogoPreview(initialValues.logo);
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prev) => ({ ...prev, images: files }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prev) => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === "images" && value.length) {
          value.forEach((file) => formData.append("images", file));
        } else if (key === "logo" && value) {
          formData.append("logo", value);
        } else {
          formData.append(key, value);
        }
      });

      if (initialValues?.id) {
        await dispatch(updateRestaurant({ id: initialValues.id, restaurantData: formData })).unwrap();
      } else {
        await dispatch(createRestaurant(formData)).unwrap();
      }

      onSave(); // trigger parent handler (e.g. refresh list)
      onClose(); // close dialog
    } catch (err) {
      setError("Something went wrong while submitting the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Paper elevation={6} sx={{ p: 5, width: "100%", maxWidth: 600, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#D84315", textAlign: "center" }}>
          {initialValues?.id ? "Update Restaurant" : "Create Restaurant"}
        </Typography>

        <Grid container spacing={2}>
          {[
            { name: "restaurant_name", label: "Restaurant Name" },
            { name: "owner_name", label: "Owner Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
            { name: "mobile", label: "Mobile" },
            { name: "opening_time", label: "Opening Time", type: "time" },
            { name: "closing_time", label: "Closing Time", type: "time" },
            { name: "location", label: "Location" },
          ].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                variant="outlined"
                label={field.label}
                type={field.type || "text"}
                name={field.name}
                value={formValues[field.name] || ""}
                onChange={handleInputChange}
              />
            </Grid>
          ))}

          {/* Restaurant Images */}
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
                Upload Restaurant Images
              </Button>
            </label>
          </Grid>
          {previewImages.length > 0 && (
            <Grid item xs={12}>
              <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                {previewImages.map((img, idx) => (
                  <img key={idx} src={img} alt="preview" width={80} height={80} style={{ borderRadius: 6 }} />
                ))}
              </Box>
            </Grid>
          )}

          {/* Logo Upload */}
          <Grid item xs={12}>
            <input accept="image/*" type="file" id="logo-upload" style={{ display: "none" }} onChange={handleLogoChange} />
            <label htmlFor="logo-upload">
              <Button variant="contained" component="span" startIcon={<PhotoCamera />} fullWidth>
                Upload Logo
              </Button>
            </label>
          </Grid>
          {logoPreview && (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={2}>
                <img src={logoPreview} alt="logo-preview" width="100" height="100" style={{ borderRadius: 8 }} />
              </Box>
            </Grid>
          )}
        </Grid>

        <Box mt={3}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : initialValues?.id ? "Update" : "Create"}
          </Button>
        </Box>

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RestaurantForm;
