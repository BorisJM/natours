/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const editReview = async (review, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/api/v1/reviews/${review}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Your review was updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
