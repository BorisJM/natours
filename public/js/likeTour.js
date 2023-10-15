/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const likeTour = async (tourId, method) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/addFavouriteTour',
      data: {
        tourId,
        method,
      },
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
