import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Dashboard from './views/patient/Dashboard';
import MedicalHistory from './views/patient/MedicalHistory';
import BookAppointment from './views/patient/BookAppointment';
import PrivateRoute from './views/shared/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/medical-history"
          element={
            <PrivateRoute>
              <MedicalHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
