const cols = document.querySelectorAll('.col')

function setColors () {
    cols.forEach(col => {
        const text = col.querySelector('h2');
        const color = getRandomColor();

        text.textContent = color;
        col.style.background = color;
    })
}

function getRandomColor() {
    const hex = '0123456789ABCDEF';
    let color = '';

    for(let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * hex.length)]
    }

    return '#' + color;
}

setColors();
