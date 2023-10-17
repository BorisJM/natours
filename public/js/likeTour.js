/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const likeTour = async (tourId, method) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/addFavouriteTour',
      data: {
        tourId,
        method,
      },
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
