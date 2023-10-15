/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const sendReview = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/reviews',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Your review was successfully added!');
      location.reload();
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message);
  }
};
