import React from "react";
import styled from "styled-components";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <h1>
        Welcome, <span>{currentUser.username}</span>!
      </h1>
      <h3>Select a contact to start chatting.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    color: #cb9851;
    span {
      color: #ffc14d;
    }
  }
  h3 {
    color: #cb9851;
  }
`;
