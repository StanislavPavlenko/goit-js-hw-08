import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const btnEl = document.querySelector('button');
const tempFormData = JSON.parse(localStorage.getItem('feedback-form-state'));

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

if (tempFormData) {
  if (!tempFormData.email) {
    form[0].value = '';
  } else {
    form[0].value = tempFormData.email;
  }

  if (!tempFormData.message) {
    form[1].value = '';
  } else {
    form[1].value = tempFormData.message;
  }
}

function onInput(e) {
  e.preventDefault();

  let formData = {};

  if (localStorage.getItem('feedback-form-state') === null) {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    return;
  }
    formData.email= form[0].value
    formData.message = form[1].value;
 

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));

  formData.email = JSON.parse(localStorage.getItem('feedback-form-state')).email;
  formData.message = JSON.parse(localStorage.getItem('feedback-form-state')).message;

}

function onSubmit(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));

  localStorage.removeItem('feedback-form-state');
  form[0].value = '';
  form[1].value = '';
}

window.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnEl.click();
  }
});