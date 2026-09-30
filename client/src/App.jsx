import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div>
                {/* Navigation Bar */}
                <nav className="navbar">
                    <div className="navbar-container">
                        <Link to="/events" className="navbar-logo">
                            🎓 Campus Events
                        </Link>

                        <div className="navbar-links">
                            <Link to="/events">
                                Events
                            </Link>

                            <Link to="/create-event">
                                ➕ Create Event
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Pages */}
                <Routes>
                    <Route
                        path="/"
                        element={<Events />}
                    />

                    <Route
                        path="/events"
                        element={<Events />}
                    />

                    <Route
                        path="/create-event"
                        element={<CreateEvent />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;