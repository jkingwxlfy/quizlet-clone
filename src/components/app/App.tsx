import { Routes, Route } from "react-router-dom";
import { routes, cardRoutes } from "../../routes";

import BoardMenu from "../board-menu/BoardMenu";

import "./app.sass";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<BoardMenu />}>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
            </Route>
            {cardRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                />
            ))}
        </Routes>
    );
};

export default App;
