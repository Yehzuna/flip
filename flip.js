function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function init() {
    const dim = 80;
    const fh = window.innerHeight;
    const fw = window.innerWidth;

    const h = Math.floor(fh / dim);
    const w = Math.floor(fw / dim);

    const nb = h * w;

    console.log(nb, fh, fw);
    console.log(h*dim, w*dim);

    const container = document.querySelector('.container');
    container.style.width = w*dim + 'px';
    container.style.height = h*dim + 'px';
    container.style.marginLeft = -w*dim/2 + 'px';
    container.style.marginTop = -h*dim/2 + 'px';

    for (let i = 1; i <= nb; i++) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.style.width = dim + 'px';
        div.style.height = dim + 'px';
        container.appendChild(div);
    }
}

document.body.addEventListener('mouseover', (event) => {
    const el = event.target;
    if (el.classList.contains('card') && !el.classList.contains('done')) {
        el.classList.add('flip');
    }
}, false);

document.body.addEventListener('transitionend', (event) => {
    const el = event.target;
    if (el.classList.contains('flip')) {
        el.style.backgroundColor = color;
        el.classList.remove('flip');
        el.classList.add('done');
    }
}, false);

/*
document.body.addEventListener('mouseover', (event) => {
    const el = event.target;
    if (el.classList && el.classList.contains('card')) {
        el.classList.add('flip');
    }
});

document.body.addEventListener('transitionend', (event) => {
    const el = event.target;
    if (el.classList && el.classList.contains('card')) {
        el.style.backgroundColor = color;
        el.classList.remove('flip');
    }
});
*/

init();

const color = getRandomColor();