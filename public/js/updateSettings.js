// updateData

import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updatePassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.status === 200)
      showAlert('success', `${type.toUpperCase()} successfully updated!`);
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
