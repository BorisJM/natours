/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteDoc = async (model, id) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/${model}/${id}`;
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
