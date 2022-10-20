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
    } else if (type === 'copy') {
        copyHexColor(e.target.textContent);
    }
})

function setColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');


        if (isLocked) {
            colors.push(text.textContent)
            return;
        }

        const color = isInitial ? colors[index] : getRandomColor();

        if (!isInitial) {
            colors.push(color);
        }

        text.textContent = color;
        col.style.background = color; //chroma.random()
        setTextColor(text, color);
        setTextColor(button, color);
    })

    updateColorsHash(colors);
}

function copyHexColor(text) {
    return navigator.clipboard.writeText(text);
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

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(item => item.substring(1)).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => "#" + color)
    }
    return [];
}

setColors(true);

// alert('Press the Space bar to refresh the colors')