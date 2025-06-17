import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments/my');
        const now = new Date();
        const upcoming = res.data.filter(a => new Date(a.date) > now);
        setAppointments(upcoming);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cancelAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(a => a.id !== id));
      alert('Appointment cancelled.');
    } catch {
      alert('Failed to cancel.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Appointments</h2>
        <button onClick={handleLogout} className="btn btn-outline-secondary btn-sm">
          Logout
        </button>
      </div>

      <Link to="/book" className="btn btn-primary mb-3">Book New Appointment</Link>

      <ul className="list-group">
        {appointments.map(a => (
          <li
            key={a.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{new Date(a.date).toLocaleString()} - {a.status}</span>
            {a.status === 'Pending' && (
              <button
                onClick={() => cancelAppointment(a.id)}
                className="btn btn-danger btn-sm"
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
