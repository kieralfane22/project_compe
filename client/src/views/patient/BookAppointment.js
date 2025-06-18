import { bookAppointment } from '../../services/dentalApi.js';

const BookAppointment = {
  render(container) {
    container.innerHTML = `
      <h2>Book Appointment</h2>
      <form id="bookForm" class="mb-3">
        <label>Select Date & Time:</label>
        <input type="datetime-local" name="date" class="form-control mb-2" required />
        <button type="submit" class="btn btn-success">Book</button>
        <a href="#/dashboard" class="btn btn-secondary ms-2">Cancel</a>
      </form>
    `;

    document.getElementById('bookForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = { date: form.get('date') };

      try {
        await bookAppointment(data);
        alert('Appointment booked!');
        window.location.hash = '#/dashboard';
      } catch {
        alert('Booking failed.');
      }
    });
  }
};

export default BookAppointment;
