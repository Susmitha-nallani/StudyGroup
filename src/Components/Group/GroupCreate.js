import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  IconButton,
  TextField,
  InputLabel,
  FormControl,
  NativeSelect,
  Snackbar,
  Grid,
} from "@mui/material";
import photo from "../assests/grops.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";
import Navbar from "../Navigation/Navigation";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120vh;
  background-color: #eee;
  padding-left: 20%;
  @media (max-width: 1000px) {
    width: 100%;
    padding-left: 15rem;
    margin-bottom: ;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  max-height: 90vh;
  @media (max-width: 768px) {
    width: 20rem;
    padding: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 6px;
`;

const ProfilePhotoContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1px;
  border: 2px solid #ccc;
  background-color: lightblue;
  cursor: pointer;
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
  margin-bottom: 1px;
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
  judtify-content: space-evenly;
  align-items: center;
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
const StyledNativeSelect = styled(NativeSelect)`
  && {
    width: 100%;
    margin-bottom: 12px;
    color: ${({ hasText }) => (hasText ? "black" : "#000000")};
    border-color: #404040;
    &:hover {
      border-color: #404040;
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
    margin: 0 8px;
    font-size: 6rem;
  }
`;
const BackIcon = styled(ArrowBackIcon)`
  && {
    color: black;
    font-size: 2rem;
  }
`;
const CreateGroup = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [approval, setApproval] = useState("required");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupLocation, setGroupLocation] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:44382/api/GetSubjects")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data, "jjjjjjjjjjjjj");
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCreateGroup = () => {
    if (validateForm()) {
      const groupData = {
        name: groupName,
        description: groupDescription,
        location: groupLocation,
        isPublic: visibility === "public",
        isApprovalRequired: approval === "required",
        subjects: subject,
        username: selectedUsers,
      };
      console.log(groupData);
      axios
        .post("https://localhost:44382/api/Groups/AddGroup", groupData)
        .then((response) => {
          setShowSuccessToast(true);
          navigate("/groups");
        })
        .catch((error) => {
          console.error("Error creating group:", error);
        });
    }
  };

  const handleApprovalChange = (event) => {
    setApproval(event.target.value);
  };

  const handleSubjectChange = (event) => {
    const { value } = event.target;
    setSubject(value);
    axios
      .get(
        `https://localhost:44382/api/GetUsernamesBySubjects?selectedSubjects=${value}`
      )
      .then((response) => {
        console.log("Response Data:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleUserNameChange = (event) => {
    const { value } = event.target;
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(value)) {
        return prevSelectedUsers.filter((user) => user !== value);
      } else {
        return [...prevSelectedUsers, value];
      }
    });
  };
  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
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

    if (!groupName.trim()) {
      newErrors.groupName = "Group name is required.";
      valid = false;
    }

    if (!groupLocation.trim()) {
      newErrors.groupLocation = "Group location is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  console.log(categories, "categories");

  return (
    <>
      <CenteredContainer>
        <Container>
          <Header>
            <IconButton onClick={() => navigate("/groups")}>
              <BackIcon />
            </IconButton>
            <Typography variant="h4" color="black" fontWeight="bold">
              Create New Group
            </Typography>
            <div></div>
          </Header>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
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
          </Grid>
          <FieldsContainer>
            <StyledTextField
              id="group-name"
              label="Group Name"
              variant="outlined"
              fullWidth
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              error={Boolean(errors.groupName)}
              helperText={errors.groupName}
              margin="normal"
              autoComplete="off"
            />
            <StyledTextField
              id="group-description"
              label="Description"
              variant="outlined"
              multiline
              rows={2}
              fullWidth
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              margin="normal"
              autoComplete="off"
            />
            <StyledTextField
              id="group-location"
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <LocationOnIcon />
                  </IconButton>
                ),
              }}
              value={groupLocation}
              onChange={(e) => setGroupLocation(e.target.value)}
              error={Boolean(errors.groupLocation)}
              helperText={errors.groupLocation}
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
            </IconContainer>
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
                <StyledNativeSelect
                  value={subject}
                  onChange={handleSubjectChange}
                  inputProps={{
                    name: "subject",
                    id: "group-subject",
                  }}
                >
                  <option value="">Select subject</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.subjectName}>
                      {category.subjectName}
                    </option>
                  ))}
                </StyledNativeSelect>
              </StyledFormControl>
              <StyledFormControl>
                <option value="" style={{ color: "#404040" }}>
                  Select users :
                </option>
                {users.map((user, index) => (
                  <div
                    key={index}
                    style={{
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={user.username}
                      value={user.username}
                      checked={selectedUsers.includes(user.username)}
                      onChange={handleUserNameChange}
                    />
                    <label htmlFor={user.username}>{user.username}</label>
                  </div>
                ))}
              </StyledFormControl>
            </div>
          </FieldsContainer>
          <Button
            onClick={handleCreateGroup}
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
            CREATE
          </Button>

          <Snackbar
            open={showSuccessToast}
            autoHideDuration={6000}
            onClose={() => setShowSuccessToast(false)}
            message="Group created successfully!"
          />
        </Container>
      </CenteredContainer>
      <Navbar />
    </>
  );
};

export default CreateGroup;
