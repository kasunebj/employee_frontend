import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import UpdateEmployee from './UpdateEmployee';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
