
const sidebarStep = document.querySelectorAll('.indecater__num');
const formStep = document.querySelectorAll('.step');
const form = document.getElementById('form');

const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('prev-button');


let stepNum = 0;


const selectPlanError = (text) => {
  document.getElementById('select-plan-error').textContent = text;
};


nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (stepNum === 0) {
    
    if (!formValidation()) return;
    stepNum++;
    showStep(stepNum);
  } else if (stepNum === 1) {

    stepNum++;
    showStep(stepNum);
} else return;
});


prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  stepNum--;
  return showStep(stepNum);
});


const showStep = (x) => {

  if (x < sidebarStep.length) {

    for (let i = 0; i < sidebarStep.length; i++) {
      sidebarStep[i].classList.remove('active');
    }

    sidebarStep[x].classList.add('active');
  }


  if (x < formStep.length) {
    if (x === 0) {
      
      prevBtn.classList.add('hidden');
      prevBtn.setAttribute('disabled', '');
    } else if (x === 4) {
      
      nextBtn.parentElement.classList.add('hidden');
    } else {
      
      prevBtn.classList.remove('hidden');
      prevBtn.removeAttribute('disabled');
    }
   
    x === 3
      ? (nextBtn.textContent = 'Confirm')
      : (nextBtn.textContent = 'Next step');

    
    for (let i = 0; i < formStep.length; i++) {
      formStep[i].classList.remove('active');
    }
    
    formStep[x].classList.add('active');
  }
};

showStep(stepNum);




const showError = (input, warningText) => {
  input.classList.add('error');
  input.parentElement.querySelector('.warning').textContent = warningText;
};


const hideError = (input) => {
  input.classList.remove('error');
  input.parentElement.querySelector('.warning').textContent = '';
};


const formInput = form.querySelectorAll('input');


const formValidation = () => {

  formInput.forEach((input) => {
    // username
    if (input.name === 'userName') {
      return input.value.length === 0
        ? showError(input, 'Enter your name')
        : hideError(input);
    }
    // email
    if (input.name === 'email') {
      // verify email input value using regex
      const emailRegExp = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      return input.value.length === 0
        ? showError(input, 'Enter email')
        : !emailRegExp.test(input.value)
        ? showError(input, 'Enter valid email')
        : hideError(input);
    }
    // phone number
    if (input.name === 'password') {
      return input.value.length === 0
        ? showError(input, 'Enter your mobile number')
        : hideError(input);
    }
  });
  return form.checkValidity();
};
