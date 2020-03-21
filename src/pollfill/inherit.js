import {inherit} from "./index";

// class Parent {
//     constructor(props) {
//         this.name = 'father'
//     }
//
//     getName() {
//         return this.name;
//     }
// }
//
// export class Child extends Parent {
//     constructor() {
//         super();
//         this.type = 'child'
//     }
//
//     setName(name) {
//         this.name = name;
//     }
// }

function setPrototypeOf(o, p) {
    setPrototypeOf = Object.setPrototypeOf || function (o, p) {
        o.__proto__ = p;
    };
    return setPrototypeOf(o, p);
}

function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
        const descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        if ('value' in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function createClass(constructor, protoProps, staticProps) {
    if (protoProps) {
        defineProperties(constructor.prototype, protoProps);
    }
    if (staticProps) {
        defineProperties(constructor, staticProps);
    }
}

function classCallCheck(instance, constructor) {
    if (!(instance instanceof constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructor(self, call) {
    if (call && typeof call === 'object' || typeof call === 'function') {
        return call;
    }
    return assetInitialized(self);

}

function assetInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}


let Parent = (function () {
    function Parent() {
        classCallCheck(this, Parent)
        this.name = 'father';
    }

    createClass(Parent, [{
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }])
    return Parent;
})();


export let Child = (function (p) {
    inherit(Child, p);

    function Child() {
        let _this = this;
        classCallCheck(_this, Child);
        _this = _possibleConstructor(_this, Object.getPrototypeOf(Child).call(_this));
        _this.type = 'child';
    }

    createClass(Child, [{
        key: "setName",
        value: function setName(name) {
            this.name = name;
        }
    }]);
    return Child;
})(Parent);


