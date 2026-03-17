import { registerUser } from '../services/apiService.js';
import { showMessage, getInputValue } from '../utils/dom.js';

const submitData = async () => {
  const messageDOM = document.getElementById('message');

  try {
    const userData = {
      user: getInputValue('user'),
      password: getInputValue('password'),
    };

    const response = await registerUser(userData);
    showMessage(messageDOM, response.data.message || 'บันทึกข้อมูลสำเร็จ', 'success');
    window.location.href = 'login.html';
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาด';
    const errors = error.response?.data?.errors || [];
    showMessage(messageDOM, message, 'danger', errors);
  }
};

window.submitData = submitData;
