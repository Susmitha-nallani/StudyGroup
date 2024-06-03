import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0099cc;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  background-color: white;
  border-radius: 50px;
`;

const SectionContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-wrap: inherit;
  justify-content: space-evenly;
  padding: 16px;
  flex-direction: column;
`;

const GroupItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px;
`;

const GroupIcon = styled.div`
  font-size: 24px;
  color: #fff;
  background-color: #3f51b5;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
`;

const GroupName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
  margin-right: 16px;
`;

const GroupDate = styled.div`
  font-size: 25px;
  color: #666;
  margin-top: 4px;
  margin-right: 16px;
`;

const JoinText = styled.div`
  font-size: 16px;
`;

const HomepageList = () => {
  return (
    <CenteredContainer>
      <NavContainer>
        <SectionContainer>
          <Link to="/home">
            <ArrowBackIosIcon />
          </Link>
          <Typography
            variant="h6"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            New Events
          </Typography>
          <div style={{ width: 24 }}></div>
        </SectionContainer>
        <GroupContainer>
          <GroupItem>
            <GroupName>Study night</GroupName>
            <GroupDate>Date</GroupDate>
            <GroupIcon>
              +<JoinText>Join</JoinText>
            </GroupIcon>
          </GroupItem>
          <GroupItem>
            <GroupName>Online quiz</GroupName>
            <GroupDate>Date</GroupDate>
            <GroupIcon>
              +<JoinText>Join</JoinText>
            </GroupIcon>
          </GroupItem>
          <GroupItem>
            <GroupName>Assignment help</GroupName>
            <GroupDate>Date</GroupDate>
            <GroupIcon>
              +<JoinText>Join</JoinText>
            </GroupIcon>
          </GroupItem>
        </GroupContainer>
      </NavContainer>
    </CenteredContainer>
  );
};
export default HomepageList;
