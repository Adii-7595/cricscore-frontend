import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home/Home";
import News from "../pages/News/News";
import Photos from "../pages/Photos/Photos";
import Tournament from "../pages/Tournament/Tournament";
import Team from "../pages/Team/Team";
import Player from "../pages/Player/Player";
import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/photos" element={<Photos />} />
                    <Route path="/tournament" element={<Tournament />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/player" element={<Player />} />

                </Route>

                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;