/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createTour = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/tours',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Tour was created successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message);
  }
};
