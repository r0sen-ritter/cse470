import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import Home from './containers/Home/Home';
import AlbumPage from './components/AlbumPage';

const App = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}> </Route>
                <Route path="/album" element={<AlbumPage />}> </Route>
            </Routes>
        </BrowserRouter>
    </>
);

export default App;