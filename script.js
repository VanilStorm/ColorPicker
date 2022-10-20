const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', e => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space') {
        setColors();
    }
})

document.addEventListener('click', e => {
    const type = e.target.dataset.type;

    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }
})

function setColors() {
    cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = getRandomColor();

        if (isLocked) {
           return;
        }

        text.textContent = color;
        col.style.background = color; //chroma.random()
        setTextColor(text, color);
        setTextColor(button, color);
    })
}

function getRandomColor() {
    const hex = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * hex.length)]
    }

    return '#' + color;
}

function setTextColor(elem, color) {
    const luminance = chroma(color).luminance();
    elem.style.color = luminance > 0.5 ? 'black' : 'white';
}

setColors();

// alert('Press the Space bar to refresh the colors')