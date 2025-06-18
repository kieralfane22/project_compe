import Login from './views/auth/Login.js';
import Register from './views/auth/Register.js';
import Dashboard from './views/patient/Dashboard.js';
import BookAppointment from './views/patient/BookAppointment.js';
import { authStore } from './stores/authStore.js';

const routes = {
  '#/': Login,
  '#/register': Register,
  '#/dashboard': Dashboard,
  '#/book': BookAppointment,
};

const App = {
  render: async () => {
    const hash = window.location.hash || '#/';
    const view = routes[hash] || Login;
    const container = document.getElementById('app');

    // protect dashboard/book
    if (!authStore.isAuthenticated() && (hash === '#/dashboard' || hash === '#/book')) {
      window.location.hash = '#/';
      return;
    }

    await view.render(container);
  }
};

export default App;
