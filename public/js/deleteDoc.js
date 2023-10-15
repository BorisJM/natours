/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteDoc = async (model, id) => {
  try {
    const url = `/api/v1/${model}/${id}`;
    const res = await axios({
      method: 'DELETE',
      url,
    });
    if (res.status === 204) {
      showAlert('success', 'Document was deleted successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
