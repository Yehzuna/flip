class Ripple {
    constructor() {
        document.body.addEventListener('click', (e) => this.show(e));
        document.body.addEventListener('mousemove', (e) => this.hasMove = e);

        this.hasMove = false;
        setInterval(() => {
            if (this.hasMove) {
                this.show(this.hasMove);
                this.hasMove = false;
            }
        }, 100);
    }

    show(event) {
        const div = document.createElement('div');
        div.classList.add('ripple');
        div.style.top = `${event.pageY}px`;
        div.style.left = `${event.pageX}px`;
        div.style.backgroundColor = Ripple.getRandomColor();
        document.body.appendChild(div);

        setTimeout(() => div.remove(), 1000);
    }

    static getRandomColor() {
        const o = Math.round;
        const r = Math.random;
        const s = 255;

        return `rgb(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)})`;
    }
}

new Ripple();