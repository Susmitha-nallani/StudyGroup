import React, { useState } from "react";
import {
  Typography,
  IconButton,
  TextField,
  InputLabel,
  FormControl,
  NativeSelect,
  Snackbar,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";
import Navbar from "../Navigation/Navigation";
import photo from "../assests/thnkgir.jpg";

const CenteredContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  @media (max-width: 480px) {
    display: flex;
    align-items: center;
  }
`;

const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 40rem;
  margin: 3rem;
  margin-left: 32rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -45px;
`;
const ProfilePhotoContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ccc;
  margin: 0 auto;
`;

const ProfilePhoto = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 50%;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2px;
`;

const StyledTextField = styled(TextField)`
  font-size: 1.8rem;
  color: black;
  border-radius: 0.5rem;
  padding: 1.4rem;
  background-color: #eee;
  width: 100%;
  margin: 1rem 0;
  && .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #eee;
  }
`;

const StyledFormControl = styled(FormControl)`
  width: 45%;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledNativeSelect = styled(NativeSelect)`
  && {
    width: 100%;
    margin-bottom: 12px;
    color: ${({ hasText }) => (hasText ? "black" : "#000000")};
    border-color: #000000;
    &:hover {
      border-color: #000000;
    }
    option {
      background-color: lightblue;
      color: black;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    color: #e4405f;
    margin: 0 8px;
    font-size: 6rem;
  }
`;
const StyledIconButtons = styled(IconButton)`
  && {
    color: #005ce6;
    margin: 0;
    font-size: 6rem;
  }
`;
const BackIcon = styled(ArrowBackIcon)`
  && {
    color: #000000;
    font-size: 2rem;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const StyledFormControlLabel = styled(FormControlLabel)`
  color: #c5c6c7;
`;
const StyledCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: #ffffff;
  }
`;
const DefaultProfilePhoto = styled.div`
  width: 150px;
  height: 150px;
  background-color: lightgray;
  background-image: url(${photo});
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
`;

const Newsession = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [approval, setApproval] = useState("required");
  const [chatOff, setChatOff] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const handleCreateSession = () => {
    if (validateForm()) {
      const requestBody = {
        Name,
        Description,
        Location,
        startTime,
        endTime,
        date,
        ispublic: visibility === "public",
        isApprovalRequired: approval === "required",
        isChatoff: chatOff,
      };
      console.log(requestBody);
      fetch("https://localhost:44382/api/HomePage/AddStudySession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          setShowSuccessToast(true);
          navigate("/studysession");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleApprovalChange = (event) => {
    setApproval(event.target.value);
  };

  const handleChatOffChange = (event) => {
    setChatOff(event.target.checked);
  };

  const navigateToFacebook = () => {
    window.open("https://www.facebook.com", "_blank");
  };

  const navigateToInstagram = () => {
    window.open("https://www.instagram.com", "_blank");
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!Name.trim()) {
      newErrors.Name = " Name is required.";
      valid = false;
    }
    if (!Location.trim()) {
      newErrors.Location = "Location is required.";
      valid = false;
    }
    if (!startTime.trim()) {
      newErrors.startTime = "Start time is required.";
      valid = false;
    }

    if (!endTime.trim()) {
      newErrors.endTime = "End time is required.";
      valid = false;
    }

    if (!date.trim()) {
      newErrors.date = "Date is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <CenteredContainer>
      <Container>
        <Header>
          <IconButton onClick={() => navigate("/groups")}>
            <BackIcon />
          </IconButton>
          <Typography variant="h4" color="#000000" fontWeight="bold">
            Create New Sessions
          </Typography>
        </Header>

        <Grid item xs={12}>
          <ProfilePhotoContainer htmlFor="profile-picture-input">
            {profilePicture ? (
              <ProfilePhoto
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
              />
            ) : (
              <DefaultProfilePhoto />
            )}
          </ProfilePhotoContainer>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="profile-picture-input"
          />
        </Grid>
        <FieldsContainer>
          <StyledTextField
            id="Name"
            label="Name"
            variant="outlined"
            fullWidth
            value={Name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.Name)}
            helperText={errors.Name}
            margin="normal"
          />
          <StyledTextField
            id="Description"
            label="Description"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <StyledTextField
            id="location"
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <IconButton>
                  <LocationOnIcon />
                </IconButton>
              ),
            }}
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
            error={Boolean(errors.Location)}
            helperText={errors.Location}
          />
          <StyledTextField
            id="start-time"
            label="Start Time"
            type="datetime-local"
            variant="outlined"
            fullWidth
            margin="normal"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "#000000", fontWeight: "bold" },
            }}
            inputProps={{
              step: 300,
            }}
            error={Boolean(errors.startTime)}
            helperText={errors.startTime}
          />
          <StyledTextField
            id="end-time"
            label="End Time"
            type="datetime-local"
            variant="outlined"
            fullWidth
            margin="normal"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "#000000", fontWeight: "bold" },
            }}
            inputProps={{
              step: 300,
            }}
            error={Boolean(errors.endTime)}
            helperText={errors.endTime}
          />
          <StyledTextField
            id="date"
            label="Date"
            type="datetime-local"
            variant="outlined"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "#000000", fontWeight: "bold" },
            }}
            inputProps={{
              step: 300,
            }}
            error={Boolean(errors.date)}
            helperText={errors.date}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "2px",
            }}
          >
            <StyledFormControl>
              <InputLabel variant="standard" htmlFor="group-visibility">
                Visibility
              </InputLabel>
              <StyledNativeSelect
                value={visibility}
                onChange={handleVisibilityChange}
                inputProps={{
                  name: "visibility",
                  id: "group-visibility",
                }}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </StyledNativeSelect>
            </StyledFormControl>
            <StyledFormControl>
              <InputLabel variant="standard" htmlFor="group-approval">
                Approval
              </InputLabel>
              <StyledNativeSelect
                value={approval}
                onChange={handleApprovalChange}
                inputProps={{
                  name: "approval",
                  id: "group-approval",
                }}
              >
                <option value="required">Approval Required</option>
                <option value="notRequired">Not Required</option>
              </StyledNativeSelect>
            </StyledFormControl>
          </div>
          <IconContainer>
            <StyledIconButtons onClick={navigateToFacebook}>
              <FacebookIcon />
            </StyledIconButtons>
            <StyledIconButton onClick={navigateToInstagram}>
              <InstagramIcon />
            </StyledIconButton>
            <StyledFormControlLabel
              control={
                <StyledCheckbox
                  checked={chatOff}
                  onChange={handleChatOffChange}
                  sx={{ color: "black" }}
                  value={chatOff}
                />
              }
              label="Chat Off"
            />
          </IconContainer>
        </FieldsContainer>
        <ButtonsContainer>
          <Button
            onClick={handleCreateSession}
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
          >
            Create
          </Button>
        </ButtonsContainer>
        <Snackbar
          open={showSuccessToast}
          autoHideDuration={6000}
          onClose={() => setShowSuccessToast(false)}
          message="Studysession created successfully!"
        />
      </Container>
      <Navbar />
    </CenteredContainer>
  );
};

export default Newsession;
