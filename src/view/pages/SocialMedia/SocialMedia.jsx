import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  fetchSocialMedia,
  updateSocialMedia,
  addSocialMedia,
} from "../../redux/slices/socialMediaSlice";
import { WhatsApp, Facebook, Instagram, YouTube } from "@mui/icons-material";

const SocialMedia = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // <-- Get theme for light/dark mode

  const { links, id, loading } = useSelector((state) => state.socialMedia);
  const [showLoader, setShowLoader] = useState(true);
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchSocialMedia());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (links) {
      setSocialLinks({
        whatsapp: links.whatsapp || "",
        facebook: links.facebook || "",
        instagram: links.instagram || "",
        youtube: links.youtube || "",
      });
    }
  }, [links]);

  const handleChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      if (id) {
        await dispatch(updateSocialMedia({ id, updatedLinks: socialLinks })).unwrap();
        setSnackbar({
          open: true,
          message: "Social media links updated successfully!",
          severity: "success",
        });
      } else {
        await dispatch(addSocialMedia(socialLinks)).unwrap();
        setSnackbar({
          open: true,
          message: "Social media links added successfully!",
          severity: "success",
        });
      }
      dispatch(fetchSocialMedia());
    } catch (error) {
      setSnackbar({
        open: true,
        message: error || "Something went wrong. Try again.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const iconMap = {
    whatsapp: <WhatsApp sx={{ color: "#25D366", fontSize: 32 }} />,
    facebook: <Facebook sx={{ color: "#1877F2", fontSize: 32 }} />,
    instagram: <Instagram sx={{ color: "#E1306C", fontSize: 32 }} />,
    youtube: <YouTube sx={{ color: "red", fontSize: 32 }} />,
  };

  if (loading || showLoader) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper, // dynamic background
          mt: 10,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 5, color: theme.palette.text.primary }} // dynamic text color
        >
          Social Media Links
        </Typography>

        {Object.keys(socialLinks).map((key) => (
          <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box sx={{ width: 40, display: "flex", justifyContent: "center" }}>
              {iconMap[key]}
            </Box>
            <TextField
              fullWidth
              label={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
              name={key}
              value={socialLinks[key]}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  py: 1.2,
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : "transparent", // Conditionally apply background color
                },
              }}
            />
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleSaveAll}
            disabled={saving}
            sx={{
              minWidth: 140,
              py: 1,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {saving ? <CircularProgress size={24} /> : "Update All"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SocialMedia;
