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
var check = 0;
var code = [2, 4, 6, 8, 10, 12];
var entered = [];
var direction = -1;
var speed = 0.05;
var tpz = 0;
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}
world.update = function () {
    ctx.clearRect(0, 0, d.width, d.height);
    var m = 0;
    if (world.keys.a || world.keys.arrowleft) {
        m = 1;
    } else if (world.keys.d || world.keys.arrowright) {
        m = -1;
    }
    number += m * speed;
    if (number < 0) number = 20 + number;
    number %= 20;
    rounded = Math.round(number);
    if (world.keys.enter) {
        entered.push(rounded);
        if (arraysEqual(entered, code)) {
            outer.color = 'green';
            setTimeout(() => outer.color = 'white', 1000);
        } else {
            outer.color = 'red';
            setTimeout(() => outer.color = 'white', 1000);
        }
        entered.pop();
    }
    if (m != direction && m != 0) {
        entered.push(rounded);
        if (entered.length >= code.length) {
            console.log('die');
        } else {
            check++;
            if (direction == 1) {
                direction = -1;
            } else if (direction == -1) {
                direction = 1;
            }
        }
    }
    if (m == -1) {
        if (number - m * speed >= 20) {
            tpz++;
            if (tpz >= 2) {
                entered = [];
                check = 0;
                direction = -1;
            }
        }
    } else if (tpz == 1) {
        tpz = 0;
    }
    if (rounded < 10) {
        rounded = "0" + rounded;
    }
    inner.rotation = 0 - number * 360 / 20;
    outer.rotation = 0 - number * 360 / 20;
    zero.rotation = 0 - number * 360 / 20;
    ctx.fillText(rounded, window.innerWidth / 2 - 30, window.innerHeight / 2 + 16);
}
world.start();