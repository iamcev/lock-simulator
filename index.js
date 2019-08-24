var world = new $C.World('black', undefined, window.innerWidth, window.innerHeight, 0, 0, 0);
var number = 0;
var rounded = 0;
var inner = $C.Polygon.NGON('inner', 20, 198, new $C.Vector(window.innerWidth / 2, window.innerHeight / 2), 'black');
var outer = $C.Polygon.NGON('outer', 20, 200, new $C.Vector(window.innerWidth / 2, window.innerHeight / 2), 'white');
var p = new $C.Rectangle('adfjl', 0, 0, 2, 16, 'red');
p.points.forEach(function (point) {
    point.y -= 198;
});
var zero = new $C.Polygon('zero', window.innerWidth / 2, window.innerHeight / 2, p.points, 'red');
var pointer = new $C.Rectangle('pointer', window.innerWidth / 2 + 1, window.innerHeight / 2 - 218, 2, 10, 'white'); 
var d = document.querySelector('#d');
d.width = window.innerWidth;
d.height = window.innerHeight;
var ctx = d.getContext('2d');
world.set(outer, inner, zero, pointer);
ctx.font = "50px Courier";
ctx.fillStyle = "white";
world.update = function () {
    ctx.clearRect(0, 0, d.width, d.height);
    if (world.keys.a || world.keys.arrowleft) {
        number += 0.05;
    } else if (world.keys.d || world.keys.arrowright) {
        number -= 0.05;
    }
    if (number < 0) number = 20 + number;
    number %= 20;
    rounded = Math.round(number);
    if (rounded < 10) {
        rounded = "0" + rounded;
    }
    inner.rotation = 0 - number * 360 / 20;
    outer.rotation = 0 - number * 360 / 20;
    zero.rotation = 0 - number * 360 / 20;
    ctx.fillText(rounded, window.innerWidth / 2 - 30, window.innerHeight / 2 + 16);
}
world.start();