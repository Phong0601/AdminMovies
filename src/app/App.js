import "../App.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { useEffect, useState } from "react";
import Admin from "features/Admin";
import Movies from "features/Admin/Movies/Movies";
import User from "features/Admin/User/User";

function App() {
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<Admin/>}>
          <Route path="/users" element={<User/>}/>
          <Route path="/movies" element={<Movies/>}/>
        </Route>
      </Routes>
    </Router>
  </div>;
}

export default App;
