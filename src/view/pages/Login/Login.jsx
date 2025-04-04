import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Paper, Typography, CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { validationSchema } from "../../components/ValidationSchema/ValidationSchema";
import FormComponent from "../../components/FormComponent/FormComponent";

const initialValues = { email: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/login"); // Assuming /dashboard is the route after login
    }
  }, [token, navigate]);

  const handleSubmit = async (values) => {
    const response = await dispatch(loginUser(values));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Login Successful!", { position: "top-right" });
      setTimeout(() => navigate("/"), 1000); // Navigate to homepage after success
    } else {
      toast.error(response.payload || "Invalid credentials!", { position: "top-right" });
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
        sx={{
          overflow: "hidden",
          backgroundColor: "#f8f9fa",
        }}
      >
        <ToastContainer />
        <Paper
          elevation={3}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#D84315" }}>
            Restaurant Admin Login
          </Typography>
          <Typography variant="body1" mb={4} color="textSecondary">
            Sign in to manage restaurant operations
          </Typography>

          <FormComponent
          isadd={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
            fields={[
              { name: "email", label: "Email", type: "email" , md: 12, lg: 12  },
              { name: "password", label: "Password", type: "password" }
            ]}
            buttonText="Login"
          />
        </Paper>
      </Box>
    </>
  );
};

export default Login;
