export const CompileUtil = {
    getValue(expr, vm) {
        return expr.split('.').reduce((data, attr) => {
            return data[attr];
        }, vm.$data)
    },
    text(node, expr, vm) {
        let value = null;
        value = this.getValue(expr, vm);
        this.update.textUpdate(node, value);
    },
    update: {
        textUpdate(node, value) {
            node.textContent = value;
        }
    }
}
