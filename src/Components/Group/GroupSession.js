import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RadioButtonUnchecked as RadioButtonIcon } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Navbar from "../Navigation/Navigation";

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
  padding-bottom: 22px;
`;

const GroupItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  justify-content: space-evenly;
`;

const RadioButtonContainer = styled.div`
  margin-right: 10px;
`;

const GroupName = styled.span`
  flex: 1;
`;
const ComingUpContainer = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
  color: rgb(255, 170, 241);
`;
const PastContainer = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
  color: rgb(255, 170, 241);
`;

const AddButton = styled(IconButton)`
  background-color: #fff;
  border-radius: 50%;
  padding: 10px;
`;

const GroupSession = () => {
  const navigate = useNavigate();

  const navigateToStudySession = () => {
    navigate("/studysession");
  };

  return (
    <CenteredContainer>
      <Container>
        <Header>
          <IconButton onClick={() => navigate("/groupchat")}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h4">Study Session</Typography>
          <AddButton onClick={() => navigate("/newstudysession")}>
            <AddIcon />
          </AddButton>
        </Header>
        <ComingUpContainer>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Coming Up
          </Typography>
        </ComingUpContainer>
        <GroupItem onClick={navigateToStudySession}>
          <RadioButtonContainer>
            <RadioButtonIcon />
          </RadioButtonContainer>
          <GroupName>Study Night</GroupName>
          <GroupName>Date</GroupName>
          <ArrowForwardIcon />
        </GroupItem>
        <GroupItem onClick={navigateToStudySession}>
          <RadioButtonContainer>
            <RadioButtonIcon />
          </RadioButtonContainer>
          <GroupName>Quiz Help</GroupName>
          <GroupName>Date</GroupName>
          <ArrowForwardIcon />
        </GroupItem>

        <PastContainer>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Past
          </Typography>
        </PastContainer>
        <GroupItem>
          <RadioButtonContainer>
            <RadioButtonIcon />
          </RadioButtonContainer>
          <GroupName>Assignments</GroupName>
        </GroupItem>
        <GroupItem>
          <RadioButtonContainer>
            <RadioButtonIcon />
          </RadioButtonContainer>
          <GroupName>Library Study</GroupName>
        </GroupItem>
      </Container>
      <Navbar />
    </CenteredContainer>
  );
};

export default GroupSession;
