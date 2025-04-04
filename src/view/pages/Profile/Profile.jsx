import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileData } from "../../redux/slices/profileSlice";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Email, Person, Phone } from "@mui/icons-material";

const Profile = () => {
  const dispatch = useDispatch();
  const { owner_name, restaurant_name, role_type, email, mobile, loading, error } =
    useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  // Generate initials from full name
  const getInitials = (name) => {
    if (!name) return "A";
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0].toUpperCase()).join("").slice(0, 2);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          p: 3,
          textAlign: "center",
          boxShadow: 3,
          
        }}
      >
        {/* Avatar with Initials */}
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            mb: 2,
            fontSize: 32,
            fontWeight: "bold",
            bgcolor: "#4c2093",
            color: "#fff",
          }}
        >
          {getInitials(owner_name)}
        </Avatar>

        <CardContent>
          <Box container spacing={2}>
            {/* Full Name */}
            <Box item xs={12} sx={{ mb: 2 }}>
              <Paper
                sx={{
                  padding: 2,
               
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: 1,
                }}
              >
                <Person fontSize="small" color="primary" />
                <Typography variant="body1">{owner_name || "Admin"}</Typography>
              </Paper>
            </Box>

            {/* Username */}
            <Box item xs={12} sx={{ mb: 2 }}>
              <Paper
                sx={{
                  padding: 2,
               
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: 1,
                }}
              >
                <Person fontSize="small" color="primary" />
                <Typography variant="body1">{restaurant_name || "User "}</Typography>
              </Paper>
            </Box>

            {/* User Role */}
            <Box item xs={12} sx={{ mb: 2 }}>
              <Paper
                sx={{
                  padding: 2,
                 
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: 1,
                }}
              >
                <Person fontSize="small" color="primary" />
                <Typography variant="body1">{role_type || "admin"}</Typography>
              </Paper>
            </Box>

            {/* Email */}
            <Box item xs={12} sx={{ mb: 2 }}>
              <Paper
                sx={{
                  padding: 2,
              
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: 1,
                }}
              >
                <Email fontSize="small" color="primary" />
                <Typography variant="body1">
                  {email || "admin@parkhya.net"}
                </Typography>
              </Paper>
            </Box>

            {/* Mobile */}
            <Box item xs={12} sx={{ mb: 2 }}>
              <Paper
                sx={{
                  padding: 2,
       
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: 1,
                }}
              >
                <Phone fontSize="small" color="primary" />
                <Typography variant="body1">
                  {mobile || "1234567898"}
                </Typography>
              </Paper>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;