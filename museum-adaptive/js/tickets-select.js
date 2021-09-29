let select = document.querySelector('.select-drop-down');
let listIcon = document.querySelector('.select-list');

function showSelect() {
    select.style.display = 'block';
    listIcon.style.transform = 'rotate(180deg)';
}

function setType(type) {
    let result = (type.charAt(0).toUpperCase() + type.slice(1));
    if (result == 'Combined') {
        document.querySelector('.chosen-type').innerHTML = `${result} Admission`
    } else {
        document.querySelector('.chosen-type').innerHTML = `${result} Exhibition`
    }
    document.querySelector('.select-drop-down').style.display = 'none';
    document.querySelector('.select-list').style.transform = '';
}
