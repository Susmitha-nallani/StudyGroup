import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { handleSendMsg, fetchMessages } from "../utils/messageService";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        const fetchedMessages = await fetchMessages(currentChat);
        setMessages(fetchedMessages);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setMessages((prev) => [...prev, { fromSelf: false, message: msg }]);
      });
    }
  }, [socket]);

  const handleSend = async (msg) => {
    const response = await handleSendMsg(msg, currentChat);
    if (response) {
      socket.current.emit("send-msg", {
        from: JSON.parse(localStorage.getItem("userDetails")).id,
        to: currentChat.id,
        message: msg,
      });

      setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.fromSelf ? "sended" : "received"}`}
          >
            <div className="content">
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className="chat-input">
        <ChatInput handleSendMsg={handleSend} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: white;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 3px;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: black;
      }
    }

    .received {
      justify-content: flex-start;

      .content {
        background-color: #000000;
        border: 1px solid #ffffff;
      }
    }
  }

  .chat-input {
    padding: 1rem 2rem;
    background-color: #2c2c2c;
  }
`;
