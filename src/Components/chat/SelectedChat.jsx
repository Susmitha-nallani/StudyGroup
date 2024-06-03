import React from "react";
import styled from "styled-components";
import ChatContainer from "./ChatContainer";

export default function SelectedChat({ currentChat, socket }) {
  return (
    <StyledSelectedChat>
      {currentChat ? (
        <ChatContainer currentChat={currentChat} socket={socket} />
      ) : null}
    </StyledSelectedChat>
  );
}

const StyledSelectedChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
`;
