import { register } from '../../services/dentalApi.js';

const Register = {
  render(container) {
    container.innerHTML = `
      <h2>Register</h2>
      <form id="registerForm">
        <input type="text" class="form-control mb-2" placeholder="Name" name="name" required />
        <input type="email" class="form-control mb-2" placeholder="Email" name="email" required />
        <input type="password" class="form-control mb-2" placeholder="Password" name="password" required />
        <button type="submit" class="btn btn-success">Register</button>
        <p class="mt-3">Already have an account? <a href="#/">Login</a></p>
      </form>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());

      try {
        await register(data);
        alert('Registration successful. Please login.');
        window.location.hash = '#/';
      } catch {
        alert('Registration failed.');
      }
    });
  }
};

export default Register;
