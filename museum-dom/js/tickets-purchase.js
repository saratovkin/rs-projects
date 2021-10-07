function showForm() {
    hideFormOuterClick();
    if (timerForm) {
        ticketsForm.style.display = 'block';
        overlay.style.display = 'block';
        ticketsForm.classList.remove('hide-form');
        ticketsForm.classList.add('show-form');
        overlay.classList.remove('hide-overlay');
        overlay.classList.add('show-overlay');
        timerForm = false;
        setTimeout(function () { timerForm = true; }, 500);
    }

}

function hideForm() {
    if (timerForm) {
        ticketsForm.classList.add('hide-form');
        ticketsForm.classList.remove('show-form');
        overlay.classList.remove('show-overlay');
        overlay.classList.add('hide-overlay');
        setTimeout(function () { overlay.style.display = 'none'; ticketsForm.style.display = 'none'; }, 500);
        timerForm = false;
        setTimeout(function () { timerForm = true; }, 500);
    }
}

function hideFormOuterClick() {
    document.onclick = function (e) {

        if (e.target == overlay) {
            hideForm();
        }
    };
}

let timerForm = true;
let ticketsForm = document.querySelector('.tickets-purchase');
let overlay = document.querySelector('.tickets-purchase-overlay');

