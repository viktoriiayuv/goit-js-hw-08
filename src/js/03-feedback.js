import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');

//перевіряємо, якщо в локальному сховищі є ключ feedback-form-state, то записуємо його значення в поля форми
const savedFormData = localStorage.getItem('feedback-form-state');

if (savedFormData) {
  const parsedformData = JSON.parse(savedFormData);
  emailEl.value = parsedformData.email;
  messageEl.value = parsedformData.message;
}

//додаємо слухачі подій зміни даних в полях форми та відправлення форми
formEl.addEventListener('input', throttle(onInputDataChange, 500));
formEl.addEventListener('submit', onFormSubmit);

function onInputDataChange() {
  const formData = {
    email: emailEl.value.trim(),
    message: messageEl.value.trim(),
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (
    event.currentTarget.elements.email.value === '' ||
    event.currentTarget.elements.message.value === ''
  ) {
    alert('You must fill all fields');
    return;
  }
  const formData = {
    email: event.currentTarget.elements.email.value.trim(),
    message: event.currentTarget.elements.message.value.trim(),
  };
  console.log(formData);
  formEl.reset();
  localStorage.removeItem('feedback-form-state');
}
