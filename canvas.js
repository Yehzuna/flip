class Flip {
    constructor() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        this.options = {
            dimension: 50,
            multiColor: false,
            multiAnimate: false
        };

        this.placeholder = {
            x: 0,
            y: 0,
            xmax: 0,
            ymax: 0,
            h: 0,
            w: 0,
            dimension: this.options.dimension,
            direction: true,
            animate: false,
            draw: function (color = Flip.getRandomColor()) {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.w, this.h);
            },
            kappa: function () {
                const img = new Image();
                img.src = 'kappa.png';
                img.onload = () => ctx.drawImage(img, this.xmax, this.ymax, this.dimension, this.dimension);
            },
            clear: function () {
                ctx.clearRect(this.xmax, this.ymax, this.dimension, this.dimension);
            },
            reset: function () {
                ctx.fillRect(this.xmax, this.ymax, this.dimension, this.dimension);
            },
        };

        this.scene = [];
        this.item = null;
        this.raf = null;
        this.color = Flip.getRandomColor();
        this.hasMove = false;

        this.generate();

        canvas.addEventListener('mousemove', (e) => this.hasMove = e);
        canvas.addEventListener('mouseout', () => {
            this.hasMove = false;
            this.resetItem();
        });

        setInterval(() => {
            if (this.hasMove) {
                this.animate(this.hasMove);

                if (this.isAnimate()) {
                    this.reset();
                }

                this.hasMove = false;
            }
        }, 80);

        let timer;
        window.addEventListener('resize', () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => this.reset(), 500);
        });
    }

    generate() {
        const xmax = Math.ceil(window.innerWidth / this.options.dimension);
        const ymax = Math.ceil(window.innerHeight / this.options.dimension);

        for (let y = 0; y < ymax; y++) {
            if (!this.scene[y]) {
                this.scene[y] = [];
            }

            for (let x = 0; x < xmax; x++) {
                this.placeholder.xmax = x * this.options.dimension;
                this.placeholder.x = x * this.options.dimension;
                this.placeholder.ymax = y * this.options.dimension;
                this.placeholder.y = y * this.options.dimension;
                this.placeholder.h = this.options.dimension;
                this.placeholder.w = this.options.dimension;

                this.scene[y][x] = Object.assign({}, this.placeholder);
            }
        }
        console.log(this.scene);
    }

    reset() {
        const ctx = document.getElementById('canvas').getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        this.resetItem();

        this.color = Flip.getRandomColor();
        this.scene = [];

        this.generate();
    }

    resetItem() {
        if (this.item) {
            this.item.clear();
            this.item.reset();
            this.item.kappa();

            window.cancelAnimationFrame(this.raf);
            this.item = null;
        }
    }

    isAnimate() {
        return this.scene.reduce((a, b) => a.concat(b), []).every((el) => el.animate);
    }

    animate(e) {
        const x = Math.floor(e.x / this.options.dimension);
        const y = Math.floor(e.y / this.options.dimension);
        //console.log(e.x, x, e.y, y);

        if (this.scene[y] && this.scene[y][x]) {

            if (this.item !== this.scene[y][x]) {

                this.resetItem();
                this.item = this.scene[y][x];

                // cut the animation if already done
                if (this.item.animate) {
                    return false;
                }

                this.raf = window.requestAnimationFrame(() => this.flip());
            }
        }
    }

    flip() {
        this.item.animate = true;

        this.item.clear();

        // random color if needed
        let color = this.color;
        if (this.options.multiColor) {
            color = Flip.getRandomColor();
        }
        this.item.draw(color);

        if (this.item.direction) {
            this.item.x += 3;
            this.item.w -= 6;
        } else {
            this.item.x -= 3;
            this.item.w += 6;
        }

        if (this.item.w <= 0) {
            this.item.direction = false;
        }

        if (this.item.w >= this.item.dimension) {
            this.item.direction = true;

            // set only one animation
            if (!this.options.multiAnimate) {
                this.resetItem();
                return false
            }
        }

        this.raf = window.requestAnimationFrame(() => this.flip());
    }

    static getRandomColor() {
        let o = Math.round, r = Math.random, s = 255;
        return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
    }
}

const flip = new Flip();
