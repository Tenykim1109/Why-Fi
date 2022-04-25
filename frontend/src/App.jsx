import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PhaserGame from "./ingame/PhaserGame";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: "100vh",
      }}>
      <BrowserRouter>
        <Routes>
          <Route path="/ingame" element={<PhaserGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
