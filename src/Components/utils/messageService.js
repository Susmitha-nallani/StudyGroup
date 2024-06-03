import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export const handleSendMsg = async (msg, currentChat) => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  try {
    const response = await axios.post(sendMessageRoute, {
      from: user.id,
      to: currentChat.id,
      message: msg,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const fetchMessages = async (currentChat) => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  try {
    const response = await axios.post(recieveMessageRoute, {
      from: user.id,
      to: currentChat.id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};
