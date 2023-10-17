/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createUser = async (data) => {
  try {
    const res = await axios.post('/api/v1/users', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'User was created successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message);
    console.log(err);
  }
};
