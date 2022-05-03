import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import PhaserGame from "./ingame/PhaserGame";
import Homepage from "./pages/Homepage";
import Signup from "./pages/account/Signup";
import Login from "./pages/account/Login";
import Start from "./pages/quiz/Start";
import Quiz from "./pages/quiz/Quiz";
import Result from "./pages/quiz/Result";
import Border from "./components/Border";

// 예전에 사용하던 css
// style={{
//   display: "flex",
//   alignContent: "center",
//   justifyContent: "center",
//   flexDirection: "row",
//   height: "100vh",
// }}

export default function App() {
  return (
    <div>
      <Router>
        <Border>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz/start" element={<Start />} />
            <Route path="/quiz/" element={<Quiz />} />
            <Route path="/quiz/result" element={<Result />} />
            <Route path="/ingame" element={<PhaserGame />} />
          </Routes>
        </Border>
      </Router>
    </div>
  );
}
