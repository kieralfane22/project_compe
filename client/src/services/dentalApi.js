import api from './api.js';

export const login = (data) => api('/login', 'POST', data);
export const register = (data) => api('/register', 'POST', data);
export const getMyAppointments = () => api('/appointments/my');
export const bookAppointment = (data) => api('/appointments', 'POST', data);
export const cancelAppointment = (id) => api(`/appointments/${id}`, 'DELETE');
