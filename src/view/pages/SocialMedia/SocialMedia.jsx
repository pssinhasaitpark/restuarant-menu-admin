import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { WhatsApp, Facebook, Instagram, YouTube } from "@mui/icons-material";


const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: { url: "https://wa.me/123456789", logo: null },
    facebook: { url: "https://facebook.com/yourpage", logo: null },
    instagram: { url: "https://instagram.com/yourprofile", logo: null },
    youtube: { url: "https://youtube.com/yourchannel", logo: null },
  });

  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newLogo, setNewLogo] = useState(null);

  // Handle input change for platform URL
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({
      ...socialLinks,
      [name]: { ...socialLinks[name], url: value },
    });
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewLogo(reader.result); // Store image as base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Open dialog box to add a new social media platform
  const handleAddField = () => {
    setOpenDialog(true);
  };

  // Close dialog box
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUrl("");
    setNewLogo(null);
  };

  // Save new social media platform
  const handleSaveNewField = () => {
    if (newUrl && newLogo) {
      // Extract platform name from URL
      const platformName = newUrl
        .split(".")[1] // Get platform name from URL (e.g., "facebook" from "https://facebook.com")
        .toLowerCase();

      setSocialLinks({
        ...socialLinks,
        [platformName]: {
          url: newUrl,
          logo: newLogo,
        },
      });
      handleCloseDialog();
    }
  };

  // Save the data (simulated)
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: "Social media links saved!",
        severity: "success",
      });
      setSaving(false);
    }, 1000);
  };

  // Icon mapping
  const iconMap = {
    whatsapp: <WhatsApp sx={{ color: "#25D366", fontSize: 32 }} />,
    facebook: <Facebook sx={{ color: "#1877F2", fontSize: 32 }} />,
    instagram: <Instagram sx={{ color: "#E1306C", fontSize: 32 }} />,
    youtube: <YouTube sx={{ color: "red", fontSize: 32 }} />,
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, marginTop: 5 }}>
        <Typography variant="h5" fontWeight="bold" mb={5} gutterBottom>
          Social Media Links
        </Typography>

        {Object.keys(socialLinks).map((key) => (
          <Box
            key={key}
            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
          >
            <Box sx={{ width: 40 }}>
              {socialLinks[key].logo ? (
                <img
                  src={socialLinks[key].logo}
                  alt={`${key} logo`}
                  width={32}
                  height={32}
                />
              ) : (
                iconMap[key]
              )}
            </Box>
            <TextField
              fullWidth
              label={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
              name={key}
              value={socialLinks[key].url}
              onChange={handleChange}
            />
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
          <Button variant="outlined" onClick={handleAddField}>
            Add Social Media
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
       
            <Button color="primary"  onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog Box for Adding New Social Media */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Social Media</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Platform URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            helperText="Enter the URL of the social media platform (e.g., https://facebook.com)"
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" component="label">
              Upload Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleLogoChange}
              />
            </Button>
            {newLogo && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={newLogo}
                  alt="logo"
                  width={40}
                  height={40}
                  style={{ objectFit: "cover" }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveNewField}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SocialMedia;
