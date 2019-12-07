Function.prototype.mockApply = function (target, args) {
    if (target == null) {
        target = window;
    }
    if (!Array.isArray(args)) {
        args = [];
    }

    target = new Object(target);
    const key = Symbol.for('key');
    target[key] = this;
    const result = target[key](...args);
    delete target[key];
    return result;
}

function fun() {
    this.a = 'a'
}

function test() {
    this.b = 'b'
}

fun.prototype.param = 'param';
const f = new fun();

console.log(test.mockApply(f), f);
