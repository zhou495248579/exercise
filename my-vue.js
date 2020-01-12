const CompileUtil = {
    getValue(expr, vm) {
        return expr.split('.').reduce((data, currentValue) => {
            return data[currentValue];
        }, vm.$data)
    },
    setValue(expr, vm, inputValue) {
        return expr.split('.').reduce((data, currentValue, currentIndex, array) => {
            if (currentIndex === array.length - 1) {
                data[currentValue] = inputValue;
            }
            return data[currentValue];
        }, vm.$data)
    },
    getTextContentValue(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getValue(args[1], vm);
        })
    },
    text(node, expr, vm) {
        let value = null;
        if (expr.includes('{{')) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new Watcher(vm, args[1], (newValue) => {
                    this.updater.textUpdate(node, this.getTextContentValue(expr, vm));
                });
                return this.getValue(args[1], vm);
            })
        } else {
            value = this.getValue(expr, vm);
        }
        this.updater.textUpdate(node, value);
    },
    html(node, expr, vm) {
        new Watcher(vm, expr, (newValue) => {
            this.updater.htmlUpdate(node, newValue);
        });
        this.updater.htmlUpdate(node, this.getValue(expr, vm))
    },
    model(node, expr, vm) {
        node.addEventListener('input', (e) => {
            this.setValue(expr, vm, e.target.value);
        }, false);
        new Watcher(vm, expr, (newValue) => {
            this.updater.modelUpdate(node, newValue);
        });
        this.updater.modelUpdate(node, this.getValue(expr, vm))
    },
    on(node, expr, vm, event) {
        const fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(event, fn.bind(vm), false)
    },
    updater: {
        textUpdate(node, value) {
            node.textContent = value;
        },
        htmlUpdate(node, value) {
            node.innerHTML = value;
        },
        modelUpdate(node, value) {
            node.value = value;
        }
    }
};

class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        const fragment = this.createFragment(this.el);
        this.compile(fragment);
        this.el.appendChild(fragment)
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    createFragment(el) {
        const fragment = document.createDocumentFragment();
        while (el.firstChild) {
            fragment.appendChild(el.firstChild);
        }
        return fragment;
    }

    compile(fragment) {
        const childNodes = Array.from(fragment.childNodes);
        childNodes.forEach((node) => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
            } else {
                this.compileText(node)
            }
            if (node.childNodes && node.childNodes.length) {
                this.compile(node);
            }
        })
    }

    compileElement(node) {
        const attributes = Array.from(node.attributes);
        attributes.forEach((attr) => {
            const {name, value} = attr;
            if (this.isDirective(name)) {
                const [, directive] = name.split('-');
                const [dirName, eventName] = directive.split(':');
                CompileUtil[dirName](node, value, this.vm, eventName);

                node.removeAttribute(name);
            }
        })

        // if(node.childNodes) {
        //     Array.from(node.childNodes).forEach((node) => {
        //         this.c
        //     })
        // }

    }

    compileText(node) {
        if (node.textContent.includes('{{')) {
            CompileUtil['text'](node, node.textContent, this.vm)
        }
    }

    isDirective(name) {
        return name.startsWith('v-');
    }
}

class MyVue {
    constructor(option) {
        this.$el = option.el;
        this.$data = option.data;
        this.$options = option;
        if (this.$el) {
            new Observer(this.$data);
            new Compile(this.$el, this);
            this.proxyData(this.$data);
        }
    }

    proxyData(data) {
        for (let key of Object.keys(data)) {
            Object.defineProperty(this, key, {
                configurable: false,
                get() {
                    return this.$data[key];
                }, set(v) {
                    this.$data[key] = v;
                }
            })
        }
    }
}
