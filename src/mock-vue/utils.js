import {Watch} from "./watch";

export const CompileUtil = {
    getValue(expr, vm) {
        return expr.split('.').reduce((data, attr) => {
            return data[attr];
        }, vm.$data)
    },
    // 双向绑定使用的setValue
    setValue(expr, vm, inputValue) {
        expr.split('.').reduce((data, currentValue, currentIndex, array) => {
            if (currentIndex === array.length - 1) {
                // 最后一个属性值赋值input输入的值
                data[currentValue] = inputValue;
            }
            return data[currentValue];
        }, vm.$data)
    },
    // {{ss}}模版获取值
    getTextContent(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getValue(args[1], vm);
        })
    },
    text(node, expr, vm) {
        let value = null;
        if (expr.includes('{{')) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new Watch(args[1], vm, (newValue) => {
                    this.update.textUpdate(node, newValue);
                });
                return this.getValue(args[1], vm);
            })
        } else {
            value = this.getValue(expr, vm);
            new Watch(expr, vm, (newValue) => {
                this.update.textUpdate(node, newValue);
            });
        }
        this.update.textUpdate(node, value);
    },
    html(node, expr, vm) {
        const value = this.getValue(expr, vm);
        this.update.htmlUpdate(node, value);
        new Watch(expr, vm, (newValue) => {
            this.update.htmlUpdate(node, newValue);
        })
    },
    modal(node, expr, vm) {
        node.addEventListener('input', (e) => {
            const value = e.target.value;
            this.setValue(expr, vm, value);
        }, false);
        new Watch(expr, vm, (newValue) => {
            this.update.modalUpdate(node, newValue);
        });
        this.update.modalUpdate(node, this.getValue(expr, vm));
    },
    on(node, expr, vm, eventName) {
        const method = vm.$option[expr];
        node.addEventListener(eventName, method.bind(vm), false);
    },
    update: {
        textUpdate(node, value) {
            node.textContent = value;
        },
        htmlUpdate(node, value) {
            node.innerHTML = value;
        },
        modalUpdate(node, value) {
            node.value = value;
        }
    }
}
