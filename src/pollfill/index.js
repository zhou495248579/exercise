Function.prototype.mockApply = function (target, args) {
    const obj = new Object(target);
    const key = Symbol.for('key');
    obj[key] = this; // 因为在Function.prototype上，隐式绑定
    const result = obj[key](...args)
    delete obj[key];
};

Function.prototype.mockBind = function (target, args) {
    const self = this;
    return function (param) {
        return this.apply(target, [args.concat(param)]);
    }
};
