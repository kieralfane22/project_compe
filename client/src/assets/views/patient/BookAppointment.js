import React, { useState } from 'react';
import Calendar from 'react-calendar';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const book = async () => {
    try {
      await api.post('/appointments', { date });
      alert('Appointment booked!');
      navigate('/dashboard');
    } catch (err) {
      alert('Booking failed.');
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <Calendar onChange={setDate} value={date} />
      <button onClick={book}>Confirm Booking</button>
    </div>
  );
}
