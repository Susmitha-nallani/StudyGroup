import React, { useState } from "react";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      handleSendMsg(message);
      setMessage("");
    }
  };

  return (
    <Container>
      <form className="input-container" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message here..."
          onChange={handleMessageChange}
          value={message}
        />
        <button type="submit">Send</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: black;

  .input-container {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 2rem;
    padding: 0.5rem;
    width: 100%;

    input {
      flex: 1;
      background-color: transparent;
      border: none;
      color: black;
      font-size: 1rem;
      padding: 0.5rem;
      outline: none;

      &::placeholder {
        color: black;
      }
      &::selection {
        background-color: black;
      }
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 1rem;
      background-color: #cb9851;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #cb9851;
      }

      &:focus {
        outline: none;
      }
    }
  }
`;
