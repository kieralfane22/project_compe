import React, { useState } from 'react';
import api from '../../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', form);
      alert('Registered. Please log in.');
    } catch {
      alert('Failed to register.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Patient Registration</h2>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}
