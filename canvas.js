function getRandomColor() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
}

const fw = window.innerWidth;
const fh = window.innerHeight;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = fw;
ctx.canvas.height = fh;

let data = {};
let raf;
let obj;

let ball = {
    x: 0,
    y: 0,
    xmax: 0,
    ymax: 0,
    h: 40,
    w: 40,
    max: 40,
    direction: true,
    color: getRandomColor(),
    raf: null,
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    clear: function () {
        ctx.clearRect(this.xmax, this.ymax, this.max, this.max);
    },
    reset: function () {
        ctx.fillRect(this.xmax, this.ymax, this.max, this.max);
    },
};

function flip() {
    obj.clear();
    obj.draw();

    if (obj.direction) {
        obj.x += 3;
        obj.w -= 6;
    } else {
        obj.x -= 3;
        obj.w += 6;
    }

    if (obj.w <= 0) {
        obj.color = getRandomColor();
        obj.direction = false;
    }

    if (obj.w >= obj.max) {
        obj.direction = true;
    }

    raf = window.requestAnimationFrame(flip);
}

function init() {
    for (let i = 0; i <= 10; i++) {
        ball.xmax = i * ball.max;
        ball.x = i * ball.max;

        data[i] = Object.assign({}, ball);
        data[i].draw();
    }
    console.log(data);
}

init();

canvas.addEventListener('mouseout', function (e) {
    obj.clear();
    obj.reset();
    obj = null;
    window.cancelAnimationFrame(raf);
});

let hasScroll = false;
let event = false;
canvas.addEventListener('mousemove', function (e) {
    hasScroll = true;
    event = e;
});

setInterval(function () {
    if (hasScroll) {
        animate(event);
        hasScroll = false;
    }
}, 100);


function animate(e) {
    const x = Math.round(e.x / ball.max);
    console.log(x);

    if (obj !== data[x]) {
        console.log(e);

        if (obj) {
            obj.clear();
            obj.reset();
            obj = null;
        }

        if (data[x]) {
            obj = data[x];
            raf = window.requestAnimationFrame(flip);
        }
    }
}


//ball.draw();

/*
 function draw() {
 const dim = 80;
 const fh = window.innerHeight;
 const fw = window.innerWidth;

 const h = Math.floor(fh / dim);
 const w = Math.floor(fw / dim);

 console.log(fh, fw, color);

 ctx.fillStyle = getRandomColor();
 ctx.rotate(90 * Math.PI / 180);
 ctx.fillRect(0, 0, 800, 600);

 //ctx.fillStyle = getRandomColor();
 //ctx.rotate(-90);
 }

 draw();
 */

/*
 function getRandomColor() {
 let o = Math.round, r = Math.random, s = 255;
 return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
 }

 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');
 const color = getRandomColor();
 let raf;

 let ball = {
 x: 100,
 y: 100,
 h: 48,
 w: 48,
 max: 48,
 direction: true,
 color: getRandomColor(),
 draw: function() {
 ctx.fillStyle = this.color;
 ctx.fillRect(this.x, this.y, this.w, this.h);
 }
 };

 function draw() {
 ctx.clearRect(0,0, canvas.width, canvas.height);
 ball.draw();

 if (ball.direction) {
 ball.x += 3;
 ball.w -= 6;
 } else {
 ball.x -= 3;
 ball.w += 6;
 }

 if (ball.w <= 0) {
 ball.color = getRandomColor();
 ball.direction = false;
 }

 if (ball.w >= ball.max) {
 ball.direction = true;
 }
 raf = window.requestAnimationFrame(draw);
 }

 canvas.addEventListener('mouseover', function(e) {
 raf = window.requestAnimationFrame(draw);
 });

 canvas.addEventListener('mouseout', function(e) {
 window.cancelAnimationFrame(raf);
 });

 ball.draw();
 */