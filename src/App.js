import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Buttons from "./Components/Login/Button";
import FixedBottomNavigation from "./Components/Navigation/Navigation";
import Profile from "./Components/Profile/Friendprofile";
import Calendar from "./Components/Profile/Myprofile";
import HomepageList from "./Components/Home/Homelist";
import Studysession from "./Components/Home/Studysession";
import CreateGroup from "./Components/Group/GroupCreate";
import GroupChat from "./Components/Group/GroupChat";
import GroupDesign from "./Components/Group/Group1";
import InviteFriends from "./Components/Group/Friendsgroup";
import GroupSession from "./Components/Group/GroupSession";
import Newsession from "./Components/Home/Newsession";
import MyStudysession from "./Components/Home/MyStudysession";
import Chat from "./Components/Pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Buttons />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/fixedBottomNavigation"
        element={<FixedBottomNavigation />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/home" element={<Studysession />} />
      <Route path="/homelist" element={<HomepageList />} />
      <Route path="/groups" element={<GroupDesign />} />
      <Route path="/creategroup" element={<CreateGroup />} />
      <Route path="/groupchat" element={<GroupChat />} />
      <Route path="/invitefriends" element={<InviteFriends />} />
      <Route path="/groupsession" element={<GroupSession />} />
      <Route path="/newsession" element={<Newsession />} />
      <Route path="/mystudysession" element={<MyStudysession />} />
      <Route path="/studysession" element={<Studysession />} />
      <Route path="/mystudysession/:id?" element={<MyStudysession />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
