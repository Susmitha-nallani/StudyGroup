import React, { useState, useEffect } from "react";
import { IconButton, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Back from "../assests/studyg.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import Navbar from "../Navigation/Navigation";

const CenteredContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 40rem;
  margin: 3rem;
  margin-left: 30rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2px;
  padding-left: 4rem;
  padding-right: 4rem;
`;

const StyledTextField = styled(TextField)`
  font-size: 1.8rem;
  color: black;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #eee;
  width: 100%;

  && .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #eee;
  }
`;

const BackIcon = styled(ArrowBackIosIcon)`
  && {
    font-size: 2rem;
    color: #000000;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
  gap: 30px;
`;

// const ProfilePhoto = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
// `;

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SettingsIconWrapper = styled(IconButton)`
  && {
    color: black;
  }
`;

const SettingsMenu = styled.div`
  position: sticky;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  right: -20px;
  top: 50px;
  x-index: 1000;
`;
const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;
const ChatSection = styled.div`
  background-color: #eee;
  border-radius: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  max-height: 300px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #d0a262;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold;
`;

const Message = styled.div`
  background-color: #eee;
  border-radius: 5px;
  color: black;
  padding: 10px;
  margin-top: 10px;
`;
const SenderName = styled.span`
  font-weight: bold;
`;
const MessageText = styled.span`
  padding-top: 100%;
`;
const BackImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const MyStudysession = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:44382/api/HomePage/GetStudySessionById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedStartTime = new Date(data.startTime)
          .toISOString()
          .slice(0, 16);
        const formattedEndTime = new Date(data.endTime)
          .toISOString()
          .slice(0, 16);
        const formattedDate = new Date(data.date).toISOString().slice(0, 16);
        setDescription(data.description);
        setLocation(data.location);
        setStartTime(formattedStartTime);
        setEndTime(formattedEndTime);
        setDate(formattedDate);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  return (
    <CenteredContainer>
      <Container>
        <Header>
          <IconButton onClick={() => navigate("/studysession")}>
            <BackIcon />
          </IconButton>
          <BackImage src={Back} alt="John" />
          <SettingsContainer>
            <SettingsIconWrapper onClick={toggleSettingsMenu}>
              <SettingsIcon />
            </SettingsIconWrapper>
            {showSettingsMenu && (
              <SettingsMenu>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Generate QR Code</MenuItem>
                <MenuItem>Clone Event</MenuItem>
                <MenuItem>Delete Event</MenuItem>
              </SettingsMenu>
            )}
          </SettingsContainer>
        </Header>
        <FieldsContainer>
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
        </FieldsContainer>
        <RowContainer>
          <StyledTextField
            id="start-time"
            label="Start Time"
            type="text"
            variant="outlined"
            margin="normal"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              readOnly: true,
            }}
            error={Boolean(errors.startTime)}
            helperText={errors.startTime}
          />
          <StyledTextField
            id="end-time"
            label="End Time"
            type="text"
            variant="outlined"
            margin="normal"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              readOnly: true,
            }}
            error={Boolean(errors.endTime)}
            helperText={errors.endTime}
          />
          <StyledTextField
            id="date"
            label="Date"
            type="text"
            variant="outlined"
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              readOnly: true,
            }}
            error={Boolean(errors.date)}
            helperText={errors.date}
          />
        </RowContainer>
        <FieldsContainer>
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
        </FieldsContainer>
        <ChatSection>
          <Message>
            <SenderName>John:</SenderName>
            <MessageText>Hello there!</MessageText>
          </Message>
          <Message>
            <SenderName>Mike:</SenderName>
            <MessageText>Hi, how are you?</MessageText>
          </Message>
          <ChatInputContainer>
            <ChatInput placeholder="Type a message..." />
            <SendButton>Send</SendButton>
          </ChatInputContainer>
        </ChatSection>
      </Container>
      <Navbar />
    </CenteredContainer>
  );
};

export default MyStudysession;
