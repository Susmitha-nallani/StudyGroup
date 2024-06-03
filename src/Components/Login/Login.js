// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import styled from "@emotion/styled";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import image from "../assests/xx.png";

// const CenteredContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   width: 100vw;
//   padding: 10px;
//   background-color: #cb9851;
//   align-items: center;
//   justify-content: center;
// `;

// const InnerContainer = styled.div`
//   display: flex;
//   height: 90%;
//   width: 90%;
//   box-shadow: 5px 5px 5px #80683c;
// `;

// const FormContainer = styled(Grid)`
//   display: flex;
//   flex-direction: row;
//   background-color: white;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   width: 50%;
//   height: 100%;
// `;

// const ImageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 50%;
//   background-image: url(${image});
//   background-size: cover;
//   background-position: center;
// `;

// const InputField = styled(TextField)`
//   width: 100%;
//   max-width: 300px;
//   && .MuiIconButton-root {
//     color: #a4700e;
//   }
//   @media (max-width: 1200px) {
//     max-width: 250px;
//   }
// `;

// const ButtonContainer = styled.div`
//   margin-bottom: 20%;
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

// const CenteredGridItem = styled(Grid)`
//   display: flex;
//   justify-content: center;
// `;

// const StyledTypography = styled(Typography)`
//   margin: 70px;
//   font-weight: bold;
//   font-family: auto;
//   color: orange;
// `;

// const StyledLink = styled(Link)`
//   color: brown;
//   text-decoration: none;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Login = () => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!username.trim()) {
//       newErrors.username = "Username is required.";
//       valid = false;
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required.";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await axios.post(
//           "https://localhost:44382/api/Login",
//           null,
//           {
//             params: {
//               userName: username,
//               password: password,
//             },
//           }
//         );
//         console.log("Response:", response.data);
//         if (response.data.success === true) {
//           console.log("User data:", response.data.data);
//           localStorage.setItem("userData", JSON.stringify(response.data.data));
//           navigate("/home");

//           toast.success("User Login successful");
//         } else {
//           toast.error("Login failed. Please check your credentials.");
//         }
//       } catch (error) {
//         console.error("Login error:", error.message);
//         toast.error("An error occurred while logging in.");
//       }
//     }
//   };

//   return (
//     <CenteredContainer>
//       <ToastContainer />
//       <InnerContainer>
//         <ImageContainer>
//           <Typography
//             variant="h2"
//             style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
//           >
//             Welcome Back!
//           </Typography>
//           <Typography
//             variant="body1"
//             style={{ textAlign: "center", color: "white", marginTop: "60px" }}
//           >
//             To Keep connected with us please login with your personal
//             information.
//           </Typography>
//         </ImageContainer>
//         <FormContainer component="form" onSubmit={handleSubmit} container>
//           <CenteredGridItem item xs={12}>
//             <StyledTypography variant="h4">DIGI TELESCOPE</StyledTypography>
//           </CenteredGridItem>
//           <CenteredGridItem item xs={12}>
//             <InputField
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               error={Boolean(errors.username)}
//               helperText={errors.username}
//             />
//           </CenteredGridItem>
//           <CenteredGridItem item xs={12}>
//             <InputField
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleClickShowPassword}>
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               error={Boolean(errors.password)}
//               helperText={errors.password}
//             />
//           </CenteredGridItem>
//           <ButtonContainer>
//             <Button
//               sx={{
//                 color: "#fff",
//                 fontWeight: "bold",
//                 backgroundColor: "rgb(232,158,20)",
//                 width: "100px",
//                 height: "3rem",
//                 borderRadius: "10px",
//                 "&:hover": {
//                   backgroundColor: "#ffc14d",
//                   color: "#fff",
//                 },
//               }}
//               type="submit"
//             >
//               Login
//             </Button>
//           </ButtonContainer>
//           <Typography
//             variant="body1"
//             style={{ color: "black", paddingLeft: "33%" }}
//           >
//             Don't have an account? <StyledLink to="/signup">Sign up</StyledLink>
//           </Typography>
//         </FormContainer>
//       </InnerContainer>
//     </CenteredContainer>
//   );
// };

// export default Login;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../assests/xx.png";

const CenteredContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 10px;
  background-color: #cb9851;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 90%;
  width: 90%;
  box-shadow: 5px 5px 5px #80683c;
`;

const FormContainer = styled(Grid)`
  display: flex;
  flex-direction: row;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 50%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  background-image: url(${image});
  background-size: cover;
  background-position: center;
`;

const InputField = styled(TextField)`
  width: 100%;
  max-width: 300px;
  && .MuiIconButton-root {
    color: #a4700e;
  }
  @media (max-width: 1200px) {
    max-width: 250px;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CenteredGridItem = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const StyledTypography = styled(Typography)`
  margin: 70px;
  font-weight: bold;
  font-family: auto;
  color: orange;
`;

const StyledLink = styled(Link)`
  color: brown;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required.";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://localhost:44382/api/Login",
          null,
          {
            params: {
              userName: username,
              password: password,
            },
          }
        );
        console.log("Response:", response.data);
        if (response.data.success === true) {
          console.log("User data:", response.data.data);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.data)
          );
          navigate("/studysession");

          toast.success("User Login successful");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error.message);
        toast.error("An error occurred while logging in.");
      }
    }
  };

  return (
    <CenteredContainer>
      <ToastContainer />
      <InnerContainer>
        <ImageContainer>
          <Typography
            variant="h2"
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body1"
            style={{ textAlign: "center", color: "white", marginTop: "60px" }}
          >
            To keep connected with us please login with your personal
            information.
          </Typography>
        </ImageContainer>
        <FormContainer component="form" onSubmit={handleSubmit} container>
          <CenteredGridItem item xs={12}>
            <StyledTypography variant="h4">DIGI TELESCOPE</StyledTypography>
          </CenteredGridItem>
          <CenteredGridItem item xs={12}>
            <InputField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
          </CenteredGridItem>
          <CenteredGridItem item xs={12}>
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </CenteredGridItem>
          <ButtonContainer>
            <Button
              sx={{
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: "rgb(232,158,20)",
                width: "100px",
                height: "3rem",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#ffc14d",
                  color: "#fff",
                },
              }}
              type="submit"
            >
              Login
            </Button>
          </ButtonContainer>
          <Typography
            variant="body1"
            style={{ color: "black", paddingLeft: "33%" }}
          >
            Don't have an account? <StyledLink to="/signup">Sign up</StyledLink>
          </Typography>
        </FormContainer>
      </InnerContainer>
    </CenteredContainer>
  );
};

export default Login;
