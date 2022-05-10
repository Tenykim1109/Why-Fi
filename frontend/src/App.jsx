import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useLocation,
} from "react-router-dom";

import GameApp from "./ingame/GameApp";
import Homepage from "./pages/Homepage";

import Signup from "./pages/account/Signup";
import Login from "./pages/account/Login";
import Mypage from "./pages/account/Mypage";
import Delete from "./pages/account/Delete";

import Start from "./pages/quiz/Start";
import Quiz from "./pages/quiz/Quiz";
import Result from "./pages/quiz/Result";

import Tutorial from "./pages/bankbook/Tutorial";
import MakeDeposit from "./pages/bankbook/MakeDeposit";
import MakeSavings from "./pages/bankbook/MakeSavings";
import Success from "./pages/bankbook/Success";

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
            {/* 회원 관련 */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/delete" element={<Delete />} />

            {/* 퀴즈 */}
            <Route path="/quiz/start" element={<Start />} />
            <Route path="/quiz/" element={<Quiz />} />
            <Route path="/quiz/result" element={<Result />} />

            {/* 통장 관련 */}
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/tutorial/success" element={<Success />} />
            <Route path="/deposit/start" element={<MakeDeposit />} />
            <Route path="/deposit/success" element={<Success />} />
            <Route path="/savings/start" element={<MakeSavings />} />
            <Route path="/savings/success" element={<Success />} />

            <Route path="/ingame" element={<PhaserGame />} />
          </Routes>
        </Border>
      </Router>
    </div>
  );
}
