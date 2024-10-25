document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      window.location.href = 'sign.html';
      return;
    }
  
    const username = localStorage.getItem('username');
    const nickname = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');
  
});

