import React, { useContext } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/home";
import Games from "./Pages/games";
import Support from "./Pages/support";
import AboutUs from "./Pages/aboutus";
import Account from "./Pages/account";
import AdminGames from "./Pages/adminadddgames";
import Gamepage from "./Pages/gamepage";
import AddBigForum from "./Components/addBigForum";
import ForumAnswers from "./Components/forumAnswers";
import BigForumAns from "./Components/bigforumAnswers";


function App() {
 
  return (
    <>
      <Navbar/>
      <div className="container">
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Routes>
          <Route path="/games" element={<Games />} />
        </Routes>

        <Routes>
          <Route path="/addgames" element={<AdminGames />} />
        </Routes>

        <Routes>
          <Route path="/forum/:forumid" element={<ForumAnswers />} />
        </Routes>

        <Routes>
          <Route path="/gamepage/:id" element={<Gamepage />} />
        </Routes>

        <Routes>
          <Route path="/forum" element={<AddBigForum />} />
        </Routes>

        <Routes>
          <Route path="/bigforum/:forumid" element={<BigForumAns />} />
        </Routes>

        <Routes>
          <Route path="/support" element={<Support />} />
        </Routes>

        <Routes>
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
        
        <Routes>
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
