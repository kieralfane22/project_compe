import { getMyAppointments, cancelAppointment } from '../../services/dentalApi.js';
import { appointmentStore } from '../../stores/appointmentStore.js';
import { authStore } from '../../stores/authStore.js';

const Dashboard = {
  async render(container) {
    let appointments = [];
    try {
      appointments = await getMyAppointments();
      appointmentStore.setAppointments(appointments);
    } catch {
      alert('Failed to load appointments.');
    }

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Welcome, Patient</h2>
        <button class="btn btn-outline-danger" id="logoutBtn">Logout</button>
      </div>
      <a href="#/book" class="btn btn-primary mb-3">Book Appointment</a>
      <ul class="list-group">
        ${appointments.map(a => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${new Date(a.date).toLocaleString()} - ${a.status}
            ${a.status === 'Pending' ? `<button class="btn btn-sm btn-danger cancelBtn" data-id="${a.id}">Cancel</button>` : ''}
          </li>
        `).join('')}
      </ul>
    `;

    document.querySelectorAll('.cancelBtn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        try {
          await cancelAppointment(id);
          alert('Appointment cancelled.');
          window.location.reload();
        } catch {
          alert('Cancel failed.');
        }
      });
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      authStore.logout();
    });
  }
};

export default Dashboard;
