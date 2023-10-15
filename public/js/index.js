/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { signup } from './signup';
import { sendReview } from './review';
import { likeTour } from './likeTour';
import { editReview } from './editReview';
import { createTour } from './createTour';
import { deleteDoc } from './deleteDoc';
import { updateDoc } from './updateDoc';
import { createUser } from './createUser';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signUpForm = document.querySelector('.form--signup');
const updateForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const logOutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.getElementById('book-tour');
const reviewBtn = document.getElementById('review-btn');
const formReview = document.querySelector('.form--review');
const btnHeart = Array.from(document.querySelectorAll('.btn-heart'));
const btnEdit = Array.from(document.querySelectorAll('.edit__button'));
const btnClose = Array.from(document.querySelectorAll('.close__button'));
const btnCreate = document.querySelector('.btn-create');
const formEditReviewContainer = document.getElementById('my-reviews-form');
const formEditReview = document.querySelector('.edit-review-form');
const createTourForm = document.querySelector('.create-form');
const overlay = document.querySelector('.overlay');
const closeOverlayBtn = document.querySelector('.close-overlay');
const btnDelete = Array.from(document.querySelectorAll('.btn-delete'));
const btnEditDoc = Array.from(document.querySelectorAll('.btn-edit'));
const updateTourForm = document.querySelector('.update-form');
const createUserForm = document.querySelector('.create-user-form');
const passwordToggleBtn = Array.from(
  document.querySelectorAll('.password-toggle'),
);
const userPasswordInput = document.getElementById('user-password');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password__Confirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (updateForm) {
  updateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const currentPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { currentPassword, newPassword, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (formReview) {
  formReview.addEventListener('submit', function (e) {
    e.preventDefault();
    const ratingInputs = Array.from(
      document.querySelectorAll('.input__rating'),
    ).filter((el) => el.checked)[0];
    const tourId = document.getElementById('review-btn').dataset.tourId;
    const data = {
      review: document.getElementById('review-details').value,
      rating: ratingInputs.value,
      tour: tourId,
    };
    sendReview(data);
  });
}

if (btnHeart.length) {
  btnHeart.forEach((btn) =>
    btn.addEventListener('click', function (e) {
      this.classList.toggle('favourite');
      const tourId = this.dataset.tourId;
      const method = this.classList.contains('favourite') ? 'add' : 'remove';

      likeTour(tourId, method);
    }),
  );
}

if (btnEdit.length) {
  btnEdit.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      btnEdit.forEach((btn) => btn.classList.remove('hidden'));
      btnClose.forEach((btn) => btn.classList.add('hidden'));
      this.nextSibling.classList.remove('hidden');
      this.classList.toggle('hidden');
      formEditReview.setAttribute('data-review-id', this.dataset.reviewId);
      formEditReviewContainer.classList.remove('hidden');
    });
  });
}

if (btnClose.length) {
  btnClose.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      this.classList.toggle('hidden');
      btnEdit.forEach((btn) => btn.classList.remove('hidden'));
      formEditReviewContainer.classList.add('hidden');
    });
  });
}

if (formEditReviewContainer) {
  formEditReview.addEventListener('submit', function (e) {
    e.preventDefault();
    const reviewId = this.dataset.reviewId;
    const ratingInputs = Array.from(
      document.querySelectorAll('.input__rating'),
    ).filter((el) => el.checked)[0];
    const data = {
      review: document.getElementById('review-details').value,
      rating: ratingInputs.value,
    };
    editReview(reviewId, data);
  });
}

// Pop up form for creating tour

if (createTourForm) {
  createTourForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('tour-name').value;
    const duration = document.getElementById('tour-duration').value;
    const maxGroupSize = document.getElementById('tour-group-size').value;
    const difficulty = document.getElementById('tour-difficulty').value;
    const price = document.getElementById('tour-price').value;
    const summary = document.getElementById('tour-summary').value;
    const description = document.getElementById('tour-description').value;
    const guides = Array.from(
      document.getElementById('tour-guides').selectedOptions,
    ).map((option) => option.value);
    const startDates = document.getElementById('tour-startDate').value;
    const startLocation = document.getElementById('tour-Location').value;
    const imageCover = document.getElementById('imageCover').files[0];
    const images = Array.from(document.getElementById('images').files);
    const form = new FormData();
    form.append('name', name);
    form.append('duration', duration);
    form.append('maxGroupSize', maxGroupSize);
    form.append('difficulty', difficulty);
    form.append('price', price);
    form.append('summary', summary);
    form.append('description', description);
    form.append('startDates', startDates);
    form.append('imageCover', imageCover);
    form.append('country', startLocation);
    for (let i = 0; i < images.length; i++) {
      form.append('images', images[i]);
    }
    for (let i = 0; i < guides.length; i++) {
      form.append('guides', guides[i]);
    }

    createTour(form);
  });
}

if (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target.closest('.create-form-container')) return;
    this.classList.add('hidden');
    createTourForm.classList.add('hidden');
  });
}

// Implementing create button for admin
if (btnCreate) {
  btnCreate.addEventListener('click', function (e) {
    const model = this.dataset.model;
    overlay.classList.remove('hidden');
    document.querySelector(
      '.form-heading',
    ).textContent = `Fill the fields to create a ${model}!`;
    if (updateTourForm || createTourForm) {
      updateTourForm.classList.add('hidden');
      createTourForm.classList.remove('hidden');
    }
  });
}

if (closeOverlayBtn) {
  closeOverlayBtn.addEventListener('click', function (e) {
    overlay.classList.add('hidden');
    createTourForm.classList.add('hidden');
  });
}

// Deleting document
if (btnDelete.length) {
  btnDelete.forEach((btn) =>
    btn.addEventListener('click', function (e) {
      const model = this.dataset.model;
      const id = this.dataset.id;
      deleteDoc(model, id);
    }),
  );
}

// Edit doc
if (btnEditDoc.length) {
  btnEditDoc.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      overlay.classList.remove('hidden');
      document.querySelector('.form-heading').textContent =
        'Fill the fields that you want to update!';
      const model = this.dataset.model;
      const id = this.dataset.id;
      if (updateTourForm) {
        updateTourForm.classList.remove('hidden');
        updateTourForm.dataset.model = model;
        updateTourForm.dataset.id = id;
      }
      createUserForm.dataset.model = model;
      createUserForm.dataset.id = id;
    });
  });
}

// Handling updating tour
if (updateTourForm) {
  updateTourForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emptyFields = [];
    const form = new FormData(updateTourForm);
    const model = this.dataset.model;
    const id = this.dataset.id;
    for (const pair of form.entries()) {
      if (!pair[1]) emptyFields.push(pair[0]);
    }
    for (const pair of form.entries()) {
      if (pair[0] === 'imageCover' || pair[0] === 'images') {
        if (!pair[1].name) emptyFields.push(pair[0]);
      }
    }

    emptyFields.forEach((el) => form.delete(el));
    updateDoc(model, id, form);
  });
}

if (createUserForm) {
  createUserForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (this.dataset.model || this.dataset.id) {
      const emptyFields = [];
      const form = new FormData(this);
      for (const pair of form.entries()) {
        if (!pair[1]) emptyFields.push(pair[0]);
      }
      emptyFields.forEach((el) => form.delete(el));
      updateDoc(this.dataset.model, this.dataset.id, form);
      return;
    }
    this.dataset.model = '';
    this.dataset.id = '';
    const form = new FormData(this);
    for (const pair of form.entries()) {
      if (pair[0] === 'photo') {
        if (!pair[1].name) form.delete('photo');
      }
    }
    form.append('isValid', true);
    createUser(form);
  });
}

if (passwordToggleBtn.length) {
  passwordToggleBtn.forEach((btn) =>
    btn.addEventListener('click', function () {
      if (btn.previousSibling.type === 'password') {
        btn.previousSibling.type = 'text';
      } else {
        btn.previousSibling.type = 'password';
      }
    }),
  );
}
