import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, getAllUsers, host } from "../utils/APIRoutes";
import Contacts from "../chat/Contacts";
import SelectedChat from "../chat/SelectedChat";
import Welcome from "../chat/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem("userDetails")) {
        navigate("/chatlogin");
      } else {
        const user = JSON.parse(localStorage.getItem("userDetails"));
        setCurrentUser(user);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const { data } = await axios.get(getAllUsers);
          setContacts(data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };

    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chatUser) => {
    setCurrentChat(chatUser);
  };

  return (
    <Container>
      <div className="container">
        {currentUser && (
          <>
            <Contacts
              contacts={contacts}
              changeChat={handleChatChange}
              currentUser={currentUser}
            />
            {currentChat ? (
              <SelectedChat currentChat={currentChat} socket={socket} />
            ) : (
              <Welcome currentUser={currentUser} />
            )}
          </>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #080420;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
