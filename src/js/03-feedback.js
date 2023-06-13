const formEl = document.querySelector('form');
const submitBtnEl = document.querySelector('button');
const tempFormData = JSON.parse(localStorage.getItem('feedback-form-state'));

formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);

if (tempFormData) {
  if (!tempFormData.email) {
    formEl[0].value = '';
  } else {
    formEl[0].value = tempFormData.email;
  }

  if (!tempFormData.message) {
    formEl[1].value = '';
  } else {
    formEl[1].value = tempFormData.message;
  }
}

function onInput(e) {
  e.preventDefault();

  let formData = {};

  if (localStorage.getItem('feedback-form-state') === null) {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    return;
  }
    formData.email= formEl[0].value
    formData.message = formEl[1].value;
 

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));

  formData.email = JSON.parse(localStorage.getItem('feedback-form-state')).email;
  formData.message = JSON.parse(localStorage.getItem('feedback-form-state')).message;

}

function onSubmit(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));

  localStorage.removeItem('feedback-form-state');
  formEl[0].value = '';
  formEl[1].value = '';
}

window.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitBtnEl.click();
  }
});