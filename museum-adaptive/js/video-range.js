function progressBar() {
    let progress = document.getElementById('progress-bar');
    let displayProgress = document.getElementById('bar-sub');
    displayProgress.style.width = `${progress.value * 9.3}px`;
}

function volumeBar() {
    let volume = document.getElementById('volume-bar');
    let volumeRange = document.getElementById('volume-sub');
    volumeRange.style.width = `${volume.value * 1.55}px`;
}


//log my score

console.log(`
            Score 150/150
            
`)
console.log('---------Выполненые пункт:---------');
console.log(`
Вёрстка валидная. (10/10)

Вёрстка семантическая. (24/24)

Вёрстка соответствует макету. (45/45)

Форма покупки билетов. (22/22)

Вёрстка формы соответствует макету. (10/10)

Требования к css. (18/18)

Интерактивность, реализуемая через css. (25/25)

Интерактивность, реализуемая через js. (14/16)

                                    `);
console.log('---------Невыполненные пункты:---------')
console.log(`
кнопке "Book" в форме покупки билетов добавлен ripple-эффект. (0/2)`);