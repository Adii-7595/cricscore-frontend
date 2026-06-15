import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "../pages/Home";
import Matches from "../pages/Matches";
import Tournaments from "../pages/Tournaments";
import MatchCenter from "../pages/MatchCenter";
import More from "../pages/More";

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/matches"
                    element={<Matches />}
                />

                <Route
                    path="/tournaments"
                    element={<Tournaments />}
                />

                <Route
                    path="/match/:matchId"
                    element={<MatchCenter />}
                />

                <Route
                    path="/more"
                    element={<More />}
                />

            </Routes>

        </BrowserRouter>
    );

}

export default AppRoutes;