/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.status === 200) {
      showAlert('success', 'Confirmation link was sent to your email!');
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};
