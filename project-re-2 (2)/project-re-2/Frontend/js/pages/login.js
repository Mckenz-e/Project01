import { loginUser } from '../services/apiService.js';
import { validateLoginForm } from '../utils/validators.js';
import { showMessage, getInputValue } from '../utils/dom.js';

const login = async () => {
  const user = getInputValue('user');
  const password = getInputValue('password');
  const messageDOM = document.getElementById('message');

  try {
    const errors = validateLoginForm(user, password);
    if (errors.length > 0) {
      showMessage(messageDOM, 'กรุณากรอกให้ครบ', 'danger', errors);
      return;
    }

    const response = await loginUser(user, password);

    if (response.data.status === 'ok') {
      localStorage.setItem('user_id', response.data.user_id);
      window.location.href = response.data.isAdmin ? 'admin.html' : 'main.html';
    } else {
      showMessage(messageDOM, response.data.message || 'Login failed');
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาด';
    const errors = error.response?.data?.errors || [];
    showMessage(messageDOM, message, 'danger', errors);
  }
};

window.login = login;
