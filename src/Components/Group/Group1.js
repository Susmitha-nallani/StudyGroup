import React, { useState, useEffect } from "react";
import {
  Typography,
  InputBase,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LanguageIcon from "@mui/icons-material/Language";
import ClearIcon from "@mui/icons-material/Clear";
import Navbar from "../Navigation/Navigation";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eee;
  padding-left: 15%;
  @media (max-width: 768px) {
    padding: 10%;
  }

  @media (max-width: 480px) {
    padding: 5%;
  }
`;

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5rem;
  width: 50%;
  margin-left: 10rem;
  text-align: center;

  @media (max-width: 768px) {
    width: 80%;
    margin-left: 30rem;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
  width: 100%;
  @media (max-width: 480px) {
    display: flex;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #eee;
  border-radius: 5rem;
  gap: 2rem;
`;

const SearchInput = styled(InputBase)`
  width: 100%;
  font-size: 1.8rem;
  color: black;
  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.2rem;
  }
`;

const SearchIcons = styled(SearchIcon)`
  color: black;
`;

const SelectedSubjectsContainer = styled.div`
  display: block;
  flex-wrap: wrap;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
`;

const SelectedSubject = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  background-color: #eee;
  color: black;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
`;

const SubjectText = styled.div`
  flex: 1;
`;

const IconContainer = styled.div`
  margin-left: 10px;
`;

const SeeMoreLink = styled(Typography)`
  color: #ff9933;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
`;

const GroupDesign = () => {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:44382/api/Groups/GetAllGroups")
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  const handleCreateGroupClick = () => {
    navigate("/creategroup");
  };

  const handleGroupClick = (groupId) => {
    navigate("/chatlogin");
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedGroups = showAll ? filteredGroups : filteredGroups.slice(0, 6);

  return (
    <CenteredContainer>
      <Container>
        <Header>
          <Typography variant="h4" color="#000000" fontWeight="bold">
            My Groups
          </Typography>
        </Header>
        <ActionContainer>
          <SearchContainer>
            <SearchIcons />
            <SearchInput
              placeholder="Search Groups"
              value={searchQuery}
              style={{ color: "black", fontWeight: "bold" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputAdornment position="end">
              <ClearIcon
                style={{ color: "#000000", cursor: "pointer" }}
                onClick={() => setSearchQuery("")}
              />
            </InputAdornment>
          </SearchContainer>
          <IconButton onClick={handleCreateGroupClick}>
            <AddIcon
              style={{
                backgroundColor: "#ff9933",
                borderRadius: "10rem",
                padding: "6px",
                fontSize: "3rem",
              }}
            />
          </IconButton>
        </ActionContainer>
        <SelectedSubjectsContainer>
          {displayedGroups.map((group, index) => (
            <SelectedSubject
              key={index}
              onClick={() => handleGroupClick(group.id)}
            >
              <SubjectText>{group.name}</SubjectText>
              <IconContainer>
                {group.visibility === "public" ? (
                  <LanguageIcon />
                ) : (
                  <LockIcon />
                )}
              </IconContainer>
            </SelectedSubject>
          ))}
          {!showAll && filteredGroups.length > 6 && (
            <SeeMoreLink variant="body1" onClick={() => setShowAll(true)}>
              See More...
            </SeeMoreLink>
          )}
        </SelectedSubjectsContainer>
      </Container>
      <Navbar />
    </CenteredContainer>
  );
};

export default GroupDesign;
