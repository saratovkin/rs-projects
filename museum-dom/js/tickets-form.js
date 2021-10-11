function errorStyle(elem) {
  elem.style.border = '1px solid #ff0000';
}

function normalStyle(elem) {
  elem.style.border = '1px solid #030303';
}

function validateDate(d) {
  d = new Date(d);
  let dTemp = d.toDateString();
  let today = new Date();
  today = today.toDateString();
  if (dTemp) {
    displayDate(d);
    normalStyle(inputDate);
    return true;
  }
  document.querySelector('.payment-date').innerHTML = 'Select date';
  errorStyle(inputDate);
  return false;
}

function displayDate(d) {
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  d = d.toLocaleDateString('en-us', options);
  document.querySelector('.payment-date').innerHTML = d;
}

function validateTime(t) {
  let hour = t.split(':')[0];
  let minutes = t.split(':')[1];
  if ((hour >= 9) && (hour <= 18)) {
    if (minutes == '00' || minutes == '30') {
      displayTime(t.substring(0, 5));
      //save time
      normalStyle(inputTime);
      return true;
    }
  }
  errorStyle(inputTime);
  document.querySelector('.payment-time').innerHTML = 'Select time';
  return false;
}

function displayTime(t) {
  document.querySelector('.payment-time').innerHTML = t;
}

function validateName(name) {
  let temp;
  if (name.length < 3 || name.length > 15) {
    errorStyle(inputName);
    return false;
  }
  temp = name.split(' ').join('');
  temp = temp.replace(/[a-z]*/gi, '');
  temp = temp.replace(/[а-я]*/gi, '');
  if (temp.length != 0) {
    errorStyle(inputName);
    return false;
  }
  //save name
  normalStyle(inputName);
  return true;
}

function validateEmail(email) {
  if (email.indexOf(' ') != -1) {
    errorStyle(inputEmail);
    return false;
  }
  let temp = email.split('@');
  if (!temp[1]) {
    errorStyle(inputEmail);
    return false;
  }
  let emailName = temp[0];
  let emailServer = temp[1].split('.')[0];
  let emailDomain = temp[1].split('.')[1];
  if (emailDomain == undefined) {
    errorStyle(inputEmail);
    return false;
  }
  if (emailName.length < 3 || emailName.length > 15) {
    errorStyle(inputEmail);
    return false;
  }
  if (emailName.replace(/^[a-z-_0-9]*/gi, '').length != 0) {
    errorStyle(inputEmail);
    return false;
  }
  if (emailServer.length < 4) {
    errorStyle(inputEmail);
    return false;
  }
  if (emailServer.replace(/^[a-z]*/gi, '').length != 0) {
    errorStyle(inputEmail);
    return false;
  }
  if (emailDomain < 2) {
    errorStyle(inputEmail);
    return false;
  }
  if (emailDomain.replace(/^[a-z]*/gi, '').length != 0) {
    errorStyle(inputEmail);
    return false;
  }
  //save email
  normalStyle(inputEmail);
  return true;
}

function validatePhone(phone) {
  let temp = phone.split('-').join('');
  temp = temp.split(' ').join('');
  if (temp.length > 10) {
    errorStyle(inputTel);
    return false;
  }
  if (temp.replace(/[0-9]/gi, '').length != 0) {
    errorStyle(inputTel);
    return false;
  }
  //save phone number
  normalStyle(inputTel);
  return true;
}

function setMinDate() {
  let today = new Date();
  today = today.toLocaleDateString('fr-CA');
  inputDate.setAttribute('min', today);
}

function validateForm() {
  if (validateDate(inputDate.value)) {
    if (validateTime(inputTime.value)) {
      if (validateName(inputName.value)) {
        if (validateEmail(inputEmail.value)) {
          if (validatePhone(inputTel.value)) {
            return true;
          }
        }
      }
    }
  }
  return false;
}


let form = document.forms['customer-info'];

let inputDate = document.getElementById('booking-date');
let inputTime = document.getElementById('booking-time');
let inputName = document.getElementById('customer-name');
let inputEmail = document.getElementById('customer-email');
let inputTel = document.getElementById('customer-tel');
setMinDate();

inputDate.addEventListener('input', function () {
  if (!validateDate(inputDate.value)) {
    inputDate.setCustomValidity('Input correct date. The museum is open every day except yesterday.');
    inputDate.reportValidity();
  } else {
    inputDate.setCustomValidity("");
  }
  inputDate.style.paddingLeft = '20px';
  inputDate.style.background = 'none';
});

inputTime.addEventListener('input', function () {
  if (!validateTime(inputTime.value)) {
    inputTime.setCustomValidity('Input correct time. Available time is from 9:00 to 18:00 with 30 minutes interval');
    inputTime.reportValidity();
  } else {
    inputTime.setCustomValidity('');
  }
});

inputName.addEventListener('input', function () {
  if (!validateName(inputName.value)) {
    inputName.setCustomValidity('Input correct name: from 3 to 15 symbols. Only rus and eng letters avaliable');
    inputName.reportValidity();
  } else {
    inputName.setCustomValidity('');
  }
});

inputEmail.addEventListener('input', function () {
  if (!validateEmail(inputEmail.value)) {
    inputEmail.setCustomValidity('Input valid e-mail. Example: mail@rsschool.com');
    inputEmail.reportValidity();
  } else {
    inputEmail.setCustomValidity('');
  }
});

inputTel.addEventListener('input', function () {
  if (!validatePhone(inputTel.value)) {
    inputTel.setCustomValidity('Input valid phone. Example: 1-800-150-150. Max length - 10 digits');
    inputTel.reportValidity();
  } else {
    inputTel.setCustomValidity('');
  }
});
