import throttle from 'lodash.throttle';

const formElement = document.querySelector('form');
const btnEl = document.querySelector('button');
const tempFormData = JSON.parse(localStorage.getItem('feedback-form-state'));

formElement.addEventListener('input', throttle(onInput, 500));
formElement.addEventListener('submit', onSubmit);

if (tempFormData) {
  if (!tempFormData.email) {
    formElement[0].value = '';
  } else {
    formElement[0].value = tempFormData.email;
  }

  if (!tempFormData.message) {
    formElement[1].value = '';
  } else {
    formElement[1].value = tempFormData.message;
  }
}

function onInput(e) {
  e.preventDefault();

  let formData = {};

  if (localStorage.getItem('feedback-form-state') === null) {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    return;
  }
    formData.email= formElement[0].value
    formData.message = formElement[1].value;
 

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));

  formData.email = JSON.parse(localStorage.getItem('feedback-form-state')).email;
  formData.message = JSON.parse(localStorage.getItem('feedback-form-state')).message;

}

function onSubmit(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));

  localStorage.removeItem('feedback-form-state');
  formElement[0].value = '';
  formElement[1].value = '';
}

window.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnEl.click();
  }
});