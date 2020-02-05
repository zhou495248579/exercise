import {Watch} from "./watch";

export const CompileUtil = {
    getValue(expr, vm) {
        debugger
        return expr.split('.').reduce((data, attr) => {
            return data[attr];
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
    update: {
        textUpdate(node, value) {
            node.textContent = value;
        }
    }
}
