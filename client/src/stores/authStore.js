export const authStore = {
  user: null,
  token: localStorage.getItem('token') || null,

  login(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem('token', token);
  },

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    window.location.hash = '#/';
  },

  isAuthenticated() {
    return !!this.token;
  }
};
