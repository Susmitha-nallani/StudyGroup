import React, { useState } from "react";
import {
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0099cc;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 40px;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 110%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 20px;
`;

const InviteFriends = () => {
  const navigate = useNavigate();
  const [selectedInviteOption, setSelectedInviteOption] = useState("");
  const [inviteValue, setInviteValue] = useState("");
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const navigateBack = () => {
    navigate(-1);
  };

  const handleInviteOptionChange = (event) => {
    setSelectedInviteOption(event.target.value);
    setInviteValue("");
    setError("");
  };

  const handleShareDetails = () => {
    if (selectedInviteOption === "phoneNumber" && !inviteValue) {
      setError("Please enter a phone number.");
    } else if (selectedInviteOption === "email" && !inviteValue) {
      setError("Please enter an email.");
    } else {
      setError("");
      console.log("Sharing details:", selectedInviteOption, inviteValue);
    }
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;

    const regex = /^[0-9]*$/;
    if (!regex.test(phoneNumber)) {
      setError("Please enter only numbers.");
    } else {
      setError("");
    }
    setInviteValue(phoneNumber);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
    setInviteValue(email);
  };

  return (
    <CenteredContainer>
      <Container>
        <Header>
          <IconButton onClick={navigateBack}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h4">Invite Friends</Typography>
          <div></div>
        </Header>
        <StyledFormControl>
          <Typography variant="h6">Select how to invite:</Typography>
          <Select
            value={selectedInviteOption}
            onChange={handleInviteOptionChange}
          >
            <MenuItem value="friendsList">Friends List</MenuItem>
            <MenuItem value="contacts">Contacts</MenuItem>
            <MenuItem value="phoneNumber">Phone Number</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </StyledFormControl>
        {selectedInviteOption === "phoneNumber" && (
          <>
            <StyledFormControl>
              <Typography variant="body1">Select Country Code:</Typography>
              <Select
                value={countryCode}
                onChange={handleCountryCodeChange}
                fullWidth
              >
                <MenuItem value="+91">India (+91)</MenuItem>
                <MenuItem value="+1">United States (+1)</MenuItem>
              </Select>
            </StyledFormControl>
            <TextField
              value={inviteValue}
              onChange={handlePhoneNumberChange}
              label="Enter phone number"
              variant="outlined"
              fullWidth
              margin="normal"
              error={Boolean(error)}
              helperText={error}
              InputProps={{
                startAdornment: (
                  <Typography variant="body1">{countryCode}</Typography>
                ),
              }}
            />
          </>
        )}
        {selectedInviteOption === "email" && (
          <TextField
            value={inviteValue}
            onChange={handleEmailChange}
            label="Enter email address"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(error)}
            helperText={error}
          />
        )}
        <Button variant="contained" onClick={handleShareDetails}>
          Share
        </Button>
      </Container>
    </CenteredContainer>
  );
};

export default InviteFriends;
