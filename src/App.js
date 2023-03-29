import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Contenido from "./pages/Contenido.jsx"
import Musica from "./pages/Musica.jsx"
import Anime from "./pages/Anime.jsx"
import Juegos from "./pages/Juegos.jsx"

import Proximamente from "./pages/Proximamente.jsx"

import Creador from "./pages/Creador.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<Contenido />} />
          <Route path="/contenido" element={<Contenido />} />
          <Route path="/creador" element={<Creador />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/juego" element={<Juegos />} />
          <Route path="/proximamente" element={<Proximamente />} />
        </Routes>


      </BrowserRouter>
    </div>
  )
}

export default App;
