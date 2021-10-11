function showSelect() {
  select.style.display = 'block';
  listIcon.style.transform = 'rotate(180deg)';
}

function setTicketType(type) {
  let checkoutType = document.querySelector('.payment-type');
  let selectType = document.querySelector('.chosen-type');
  let radioType = document.querySelectorAll('.custom-radio');
  if (type == 0) {
    checkoutType.innerHTML = 'Permanent exhibition';
    selectType.innerHTML = 'Permanent exhibition';
    radioType[0].checked = true;
    ticketPrice = 20;
  }
  if (type == 1) {
    checkoutType.innerHTML = 'Temporary exhibition';
    selectType.innerHTML = 'Temporary exhibition';
    radioType[1].checked = true;
    ticketPrice = 25;
  }
  if (type == 2) {
    checkoutType.innerHTML = 'Combined Admission';
    selectType.innerHTML = 'Combined Admission';
    radioType[2].checked = true;
    ticketPrice = 40;
  }
  refreshPrice();
  document.querySelector('.select-drop-down').style.display = 'none';
  document.querySelector('.select-list').style.transform = '';
  localStorage.setItem('type', type);
  localStorage.setItem('ticketPrice', ticketPrice);
}

//0 is senior, 1 is basic
function addTicket(age) {
  if (age == 1 && amountBasic < 20) {
    amountBasic++;
  }
  if (age == 0 && amountSenior < 20) {
    amountSenior++;
  }
  refreshCounter();
  refreshPrice();
  toggleCheckout(age);
  localStorage.setItem('amountBasic', amountBasic);
  localStorage.setItem('amountSenior', amountSenior);
}

function removeTicket(age) {
  if (age == 1 && amountBasic > 0) {
    amountBasic--;
  }
  if (age == 0 && amountSenior > 0) {
    amountSenior--;
  }
  refreshCounter();
  refreshPrice();
  toggleCheckout(age);
  localStorage.setItem('amountBasic', amountBasic);
  localStorage.setItem('amountSenior', amountSenior);
}

function refreshCounter() {
  document.querySelectorAll('.tickets-amount.basic')[0].value = amountBasic;
  document.querySelectorAll('.tickets-amount.basic')[1].value = amountBasic;
  document.querySelectorAll('.tickets-amount.senior')[0].value = amountSenior;
  document.querySelectorAll('.tickets-amount.senior')[1].value = amountSenior;
  document.getElementById('basic-counter').innerHTML = amountBasic;
  document.getElementById('senior-counter').innerHTML = amountSenior;
}

function refreshPrice() {
  document.querySelector('.sum').innerHTML = ticketPrice * amountBasic + ticketPrice / 2 * amountSenior;
  document.querySelector('.final-sum').innerHTML = ticketPrice * amountBasic + ticketPrice / 2 * amountSenior + " €";
  document.querySelector('.basic-sum').innerHTML = ticketPrice * amountBasic + " €";
  document.querySelector('.senior-sum').innerHTML = ticketPrice / 2 * amountSenior + " €";
  document.querySelectorAll('.basic-price')[0].innerHTML = `Basic 18+ (${ticketPrice} €)`;
  document.querySelectorAll('.basic-price')[1].innerHTML = `Basic (${ticketPrice} €)`;
  document.querySelectorAll('.senior-price')[0].innerHTML = `Senior 65+ (${ticketPrice / 2} €)`;
  document.querySelectorAll('.senior-price')[1].innerHTML = `Senior (${ticketPrice / 2} €)`;
}

//0 is senior, 1 is basic
function toggleCheckout(age) {
  if (age == 1) {
    if (amountBasic == 0) {
      document.querySelector('.payment-subtotal.basic').style.display = 'none';
    } else {
      document.querySelector('.payment-subtotal.basic').style.display = 'flex';
    }
  }
  if (age == 0) {
    if (amountSenior == 0) {
      document.querySelector('.payment-subtotal.senior').style.display = 'none';
    } else {
      document.querySelector('.payment-subtotal.senior').style.display = 'flex';
    }
  }
}

let select = document.querySelector('.select-drop-down');
let listIcon = document.querySelector('.select-list');

let ticketPrice = 20;
let amountBasic = 0;
let amountSenior = 0;
let typeOfExh = 0;

window.onload = function () {
  ticketPrice = +localStorage.getItem('ticketPrice') || 20;
  typeOfExh = +localStorage.getItem('type') || 0;
  amountBasic = +localStorage.getItem('amountBasic') || 0;
  amountSenior = +localStorage.getItem('amountSenior') || 0;
  setTicketType(typeOfExh);
  toggleCheckout(0);
  toggleCheckout(1);
  refreshCounter();
  refreshPrice();
};



