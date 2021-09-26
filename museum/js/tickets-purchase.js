function showForm() {
    ticketsForm.style.display = 'block';
    overlay.style.display = 'block';
    ticketsForm.classList.remove('hide-form');
    ticketsForm.classList.add('show-form');
    console.log(ticketsForm.classList);
    overlay.classList.remove('hide-overlay');
    overlay.classList.add('show-overlay');
}

function hideForm() {
    ticketsForm.classList.add('hide-form');
    ticketsForm.classList.remove('show-form');
    overlay.classList.remove('show-overlay');
    overlay.classList.add('hide-overlay');
    setTimeout(function () { overlay.style.display = 'none'; ticketsForm.style.display = 'none'; }, 1000);
}

let ticketsForm = document.querySelector('.tickets-purchase');
let overlay = document.querySelector('.tickets-purchase-overlay');

