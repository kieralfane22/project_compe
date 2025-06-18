import { login } from '../../services/dentalApi.js';
import { authStore } from '../../stores/authStore.js';

const Login = {
  render(container) {
    container.innerHTML = `
      <h2>Patient Login</h2>
      <form id="loginForm">
        <input type="email" class="form-control mb-2" placeholder="Email" name="email" required />
        <input type="password" class="form-control mb-2" placeholder="Password" name="password" required />
        <button type="submit" class="btn btn-primary">Login</button>
        <p class="mt-3">No account? <a href="#/register">Register here</a></p>
      </form>
    `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());

      try {
        const res = await login(data);
        authStore.login(res.user, res.token);
        window.location.hash = '#/dashboard';
      } catch {
        alert('Login failed.');
      }
    });
  }
};

export default Login;
