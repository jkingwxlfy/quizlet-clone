import { Routes, Route } from 'react-router-dom';
import { routes, cardRoutes } from '../../routes';

import Sidebar from '../sidebar/Sidebar';

import './app.scss';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Sidebar />}>
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
