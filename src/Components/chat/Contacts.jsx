import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat, currentChat }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const filteredContacts = contacts.filter(
    (contact) => contact.id !== currentUser?.id
  );

  return (
    <Container>
      <div className="brand">
        <h3>My Contacts</h3>
      </div>
      <div className="contacts">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact ${
              currentChat && currentChat.id === contact.id ? "selected" : ""
            }`}
            onClick={() => changeChat(contact)}
          >
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>
      {currentUser && (
        <div className="current-user">
          <h2>{currentUser.username}</h2>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cb9851;
  .brand {
    h3 {
      color: white;
    }
  }
  .contacts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    overflow: auto;
    .contact {
      background-color: #ffffff34;
      cursor: pointer;
      width: 90%;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #ffffff;
      }
      &.selected {
        background-color: red;
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .current-user {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #000000;
    padding: 1rem;
    h2 {
      color: white;
    }
  }
`;
