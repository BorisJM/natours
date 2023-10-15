/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateDoc = async (model, id, data) => {
  try {
    const url = `/api/v1/${model}/${id}`;
    const res = await axios.patch(url, data, {
      headers: {
        'Content-Type':
          model === 'tours' ? 'multipart/form-data' : 'application/json',
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Document was updated successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message);
  }
};
