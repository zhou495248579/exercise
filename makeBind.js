Function.prototype.bind = function (context) {
    const $this = this;
    if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    const args = Array.prototype.slice.call(arguments, 1)；
    const fun = function () {

    };
    fun.prototype = this.prototype
    const binder = function () {
        if (this instanceof fun) {
            return $this.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)))

        } else {
            return $this.apply(context, args.concat(Array.prototype.slice.call(arguments, 0)))

        }
    }
    return binder;
};
