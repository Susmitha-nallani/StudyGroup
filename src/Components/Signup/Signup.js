import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import photo from "../assests/sign.png";

import {
  Checkbox,
  FormGroup,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { FormControlLabel } from "@mui/material";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import image from "../assests/xx.png";
import ClearIcon from "@mui/icons-material/Clear";

const CenteredContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #cb9851;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  box-shadow: 5px 5px 5px #80683c;
  height: 90%;
  width: 94%;
`;

const FormContainer = styled(Grid)`
  display: flex;
  background-color: White;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
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
  max-width: 400px;
  && .MuiIconButton-root {
    color: #a4700e;
  }
`;

const CenteredGridItem = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const ProfilePhotoContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ccc;
  background-color: lightblue;
`;

const ProfilePhoto = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 50%;
`;

const SubjectCheckbox = styled(FormControlLabel)`
  margin-bottom: 8px;
  .MuiCheckbox-colorSecondary.Mui-checked {
    color: white;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 25px;
  margin: 30px;
`;

const SearchInput = styled(InputBase)`
  flex: 1;
  margin-left: 10px;
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

const SearchIcons = styled(SearchIcon)`
  color: black;
`;

const FormGroupContainer = styled(FormGroup)`
  display: flex;
  justify-content: center;
  margin-left: 29%;
`;

const useStyles = () => ({
  button: {
    marginTop: 16,
  },
});

const Signup = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (selectedSubjects.length === 0) {
          setGroups([]);
          setAvailableGroups([]);
          setLoading(false);
          return;
        }
        const encodedSubjects = selectedSubjects

          .map(encodeURIComponent)
          .join(",");
        const url = `https://localhost:44382/api/Groups/GetGroupsBySubjects?selectedSubjects=${encodedSubjects}`;
        console.log("Selected Subjects:", selectedSubjects);
        const response = await axios.get(url);
        const allGroups = response.data;
        console.log("Groups fetched:", allGroups);
        const filteredGroups = allGroups.filter((group) => {
          return selectedSubjects.some((subject) =>
            group.subjects.includes(subject)
          );
        });

        console.log("Filtered groups:", filteredGroups);

        setGroups(filteredGroups);

        setAvailableGroups(filteredGroups);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [selectedSubjects]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleImageUpload = (e) => {
    const [file] = e.target.files;

    if (file) {
      setProfilePicture(file);
    }
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      setSelectedSubjects([...selectedSubjects, value]);
    } else {
      setSelectedSubjects(
        selectedSubjects.filter((subject) => subject !== value)
      );
    }
  };

  const handleGroupChange = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      setSelectedGroupIds([...selectedGroupIds, value]);
    } else {
      setSelectedGroupIds(selectedGroupIds.filter((id) => id !== value));
    }
  };

  const validateForm = () => {
    let valid = true;

    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";

      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";

      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";

      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";

      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";

      valid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.";

      valid = false;
    }

    if (!birthday) {
      newErrors.birthday = "Birthday is required.";

      valid = false;
    }

    if (!username.trim()) {
      newErrors.username = "Username is required.";
      valid = false;
    }

    if (!gender) {
      newErrors.gender = "Gender is required.";
      valid = false;
    }

    if (!location.trim()) {
      newErrors.location = "Location is required.";

      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (page === 4) {
        const data = {
          firstName,
          lastName,
          email,
          password,
          birthday,
          location,
          gender,
          username,
          profilePicture,
          selectedSubjects,
          selectedGroups: groups

            .filter((group) => selectedGroupIds.includes(group.id.toString()))
            .map((group) => group.name),
        };

        try {
          const response = await axios.post(
            "https://localhost:44382/api/SignUp",

            data
          );

          console.log(response.data);

          navigate("/login");
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setPage(page + 1);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const subjects = [
    "Accounting",
    "Finance",
    "Commercial Law",
    "Physics",
    "Maths",
  ];

  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CenteredContainer>
      <InnerContainer>
        <FormContainer component="form" onSubmit={handleSubmit} container>
          {page === 1 && (
            <>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingBottom="20px"
                color="Brown"
              >
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Sign Up
                </Typography>
              </Grid>

              <CenteredGridItem item xs={12}>
                <InputField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
              </CenteredGridItem>

              <CenteredGridItem item xs={12}>
                <InputField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </CenteredGridItem>

              <CenteredGridItem item xs={12}>
                <InputField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
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

              <Grid item xs={12} className={classes.button}>
                <ButtonContainer container>
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
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </ButtonContainer>
              </Grid>
            </>
          )}

          {page === 2 && (
            <>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{ color: "rgb(232,158,20)" }}
              >
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Sign Up
                </Typography>
              </Grid>

              <CenteredGridItem item xs={12}>
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
              </CenteredGridItem>

              <CenteredGridItem item xs={12}>
                <InputField
                  label="Birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#ffc14d" },
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "\\d{2}/\\d{2}/\\d{4}",
                  }}
                  error={Boolean(errors.birthday)}
                  helperText={errors.birthday}
                />
              </CenteredGridItem>

              <CenteredGridItem item xs={12}>
                <InputField
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={Boolean(errors.location)}
                  helperText={errors.location}
                />
              </CenteredGridItem>

              <CenteredGridItem item xs={12}>
                <InputField
                  label="Gender"
                  select
                  value={gender}
                  onChange={handleGenderChange}
                  error={Boolean(errors.gender)}
                  helperText={errors.gender}
                  SelectProps={{
                    IconComponent: (props) => (
                      <KeyboardArrowDownIcon
                        style={{ color: "#ffc14d" }}
                        {...props}
                      />
                    ),
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </InputField>
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

              <Grid item xs={12} className={classes.button}>
                <ButtonContainer container>
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
                    onClick={handleBack}
                  >
                    Back
                  </Button>

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
                    Next
                  </Button>
                </ButtonContainer>
              </Grid>
            </>
          )}

          {page === 3 && (
            <>
              <Grid item xs={12} color="orange">
                <Typography variant="h6" gutterBottom align="center">
                  Select Subjects
                </Typography>

                <SearchContainer>
                  <SearchIcons />

                  <SearchInput
                    placeholder="Search Subjects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <InputAdornment position="end">
                    <ClearIcon
                      style={{ color: "orange", cursor: "pointer" }}
                      onClick={() => setSearchQuery("")}
                    />
                  </InputAdornment>
                </SearchContainer>

                <FormGroupContainer>
                  {filteredSubjects.map((subject) => (
                    <SubjectCheckbox
                      key={subject}
                      control={
                        <Checkbox
                          color="secondary"
                          style={{ color: "black" }}
                        />
                      }
                      label={subject}
                      value={subject}
                      onChange={handleCheckboxChange}
                      style={{
                        margin: "5px",
                        minWidth: "150px",
                        color: "black",
                      }}
                    />
                  ))}
                </FormGroupContainer>
              </Grid>

              <Grid item xs={12} className={classes.button}>
                <ButtonContainer container>
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
                    onClick={handleBack}
                  >
                    Back
                  </Button>

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
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </ButtonContainer>
              </Grid>
            </>
          )}

          {page === 4 && (
            <>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="12px"
                paddingBottom="20px"
                color="orange"
              >
                <Typography variant="h4">Recommended</Typography>
              </Grid>

              <>
                {loading ? (
                  <div>Loading groups...</div>
                ) : (
                  <>
                    <Typography variant="h6" color="orange">
                      Select Groups:
                    </Typography>

                    <FormGroup
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {availableGroups.map((group) => (
                        <FormControlLabel
                          key={group.id}
                          control={
                            <Checkbox
                              color="secondary"
                              style={{ color: "black" }}
                            />
                          }
                          label={group.name}
                          value={group.id.toString()}
                          onChange={handleGroupChange}
                          style={{
                            margin: "5px",
                            minWidth: "150px",
                            color: "black",
                          }}
                        />
                      ))}
                    </FormGroup>
                  </>
                )}
              </>

              <Grid item xs={12} className={classes.button}>
                <ButtonContainer container>
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
                    onClick={handleBack}
                  >
                    Back
                  </Button>

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
                    Done
                  </Button>
                </ButtonContainer>
              </Grid>
            </>
          )}
        </FormContainer>
        <ImageContainer>
          <Typography
            variant="h3"
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Hello, friend!
          </Typography>

          <Typography
            variant="body1"
            style={{ textAlign: "center", color: "white", marginTop: "60px" }}
          >
            Enter your personal details and start the journey with us.
          </Typography>
        </ImageContainer>
      </InnerContainer>
    </CenteredContainer>
  );
};

export default Signup;
