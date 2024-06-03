import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Box, Button, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Navbar from "../Navigation/Navigation";
import axios from "axios";
import Back from "../assests/bv.jpg";
import textbg from "../assests/cvc.jpg";

const CenteredContainer = styled.div`
  padding: 2rem;
  margin: 25px;
  margin-left: 14rem;
  max-width: 1200px;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MyStudySessions = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const StudySessionButton = styled(Button)`
  margin-top: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const StudySessionBox = styled(Box)`
  width: 100%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #c5c6c7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
`;

const GroupBox = styled(Box)`
  width: 100%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #c5c6c7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
`;

const BoxContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, minmax(5rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, minmax(5rem, 1fr));
  }
`;
const RowContainerBox = styled(Box)`
  border-radius: 0.5rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const ViewMoreButton = styled(Button)`
  && {
    color: #fff;
    font-weight: bold;
    background-color: #cb9851;
    width: 100px;
    height: 3rem;
    border-radius: 10px;
  }
  &&:hover {
    background-color: #ffc14d;
    color: #fff;
  }
`;

const ViewLessButton = styled(Button)`
  && {
    color: #fff;
    font-weight: bold;
    background-color: #cb9851
    width: 100px;
    height: 3rem;
    border-radius: 10px;
  }
  &&:hover {
    background-color: #ffc14d;
    color: #fff;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 0.2rem;
`;

const StyTypography = styled(Typography)`
  && {
    position: static;
    bottom: 1rem;
    right: 0.1rem;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 1.5rem;
  }
`;
const StyledTypography = styled(Typography)`
  && {
    font-family: serif;
    margin-bottom: 10px;
    background-color: #dcb989;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 1%;
    border-radius: 0.7rem;
  }
`;

const CustomTypography = styled(Typography)`
  && {
    font-size: 3rem;
    font-weight: bold;
    color: black;
    font-family: serif;
    margin: 1.5rem;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.2);
  }
`;

const Studysession = () => {
  const [sessions, setSessions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const initialDisplayCount = 3;
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const username = userData ? userData.username : null;
  console.log(userData);

  useEffect(() => {
    fetch("https://localhost:44382/api/HomePage/GetAllStudySession")
      .then((response) => response.json())
      .then((data) => setSessions(data))
      .catch((error) => console.error("Error fetching sessions:", error));

    axios
      .get("https://localhost:44382/api/Groups/GetAllGroups")
      .then((response) => setGroups(response.data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const displayedSessions = showAllSessions
    ? sessions
    : sessions.slice(0, initialDisplayCount);

  const displayedGroups = showAllGroups
    ? groups
    : groups.slice(0, initialDisplayCount);

  return (
    <>
      <CenteredContainer>
        <CustomTypography>Hello {username}</CustomTypography>
        <StyledContainer>
          <StyledTypography variant="h5">My Study Sessions :</StyledTypography>

          <RowContainerBox>
            <BoxContainer>
              {displayedSessions.map((session) => (
                <StudySessionBox key={session.id}>
                  <Image src={session.imageUrl || textbg} alt={session.name} />
                  <StyledNavLink to={`/mystudysession/${session.id}`}>
                    <StyTypography variant="h5">{session.name}</StyTypography>
                  </StyledNavLink>
                </StudySessionBox>
              ))}
            </BoxContainer>
            <MyStudySessions style={{ justifyContent: "center" }}>
              {!showAllSessions ? (
                <ViewMoreButton onClick={() => setShowAllSessions(true)}>
                  View More
                </ViewMoreButton>
              ) : (
                <ViewLessButton onClick={() => setShowAllSessions(false)}>
                  View Less
                </ViewLessButton>
              )}
            </MyStudySessions>
          </RowContainerBox>
          <StyledTypography variant="h5" mt={4}>
            My Groups:
          </StyledTypography>
          <RowContainerBox>
            <BoxContainer>
              {displayedGroups.map((group) => (
                <GroupBox key={group.id}>
                  <Image src={group.imageUrl || Back} alt={group.name} />
                  <StyledNavLink to={`/chat`}>
                    <StyTypography variant="h5">{group.name}</StyTypography>
                  </StyledNavLink>
                </GroupBox>
              ))}
            </BoxContainer>
            <MyStudySessions style={{ justifyContent: "center" }}>
              {!showAllGroups && (
                <ViewMoreButton onClick={() => setShowAllGroups(true)}>
                  View More
                </ViewMoreButton>
              )}
              {showAllGroups && (
                <ViewLessButton onClick={() => setShowAllGroups(false)}>
                  View Less
                </ViewLessButton>
              )}
            </MyStudySessions>
          </RowContainerBox>
          <MyStudySessions>
            <StyledTypography variant="h5">
              New Study Sessions :
            </StyledTypography>
            <StyledNavLink to="/newsession">
              <StudySessionButton sx={{ color: "#000000", marginLeft: "30px" }}>
                <ArrowForwardIcon />
              </StudySessionButton>
            </StyledNavLink>
          </MyStudySessions>
          <MyStudySessions>
            <StyledTypography variant="h5">New Groups :</StyledTypography>
            <StyledNavLink to="/creategroup">
              <StudySessionButton sx={{ color: "#000000", marginLeft: "30px" }}>
                <ArrowForwardIcon />
              </StudySessionButton>
            </StyledNavLink>
          </MyStudySessions>
          <MyStudySessions>
            <StyledTypography variant="h5">Upcoming Events :</StyledTypography>
            <StyledNavLink to="/homelist">
              <StudySessionButton sx={{ color: "#000000", marginLeft: "30px" }}>
                <ArrowForwardIcon />
              </StudySessionButton>
            </StyledNavLink>
          </MyStudySessions>
        </StyledContainer>
      </CenteredContainer>
      <Navbar />
    </>
  );
};

export default Studysession;
