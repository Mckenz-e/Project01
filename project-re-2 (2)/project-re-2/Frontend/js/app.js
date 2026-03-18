const checkAuth = () => {
  const user_id = localStorage.getItem('user_id');
  const publicPages = ['login.html', 'register.html', ''];
  const currentPage = window.location.pathname.split('/').pop();

  if (!user_id && !publicPages.includes(currentPage)) {
    window.location.href = 'login.html';
  }
};

checkAuth();
