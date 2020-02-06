import {CompileUtil} from "./utils";

export class Compile {
    constructor(el, vm) {
        this.vm = vm;
        if (el && el.nodeType === 1) {
            this.$el = el;
        } else {
            this.$el = document.querySelector(el);
        }

        const fragment = this.createFragment(this.$el);
        this.compile(fragment);
        this.$el.appendChild(fragment);
    }

    createFragment(el) {
        const fragment = document.createDocumentFragment();
        while (el.firstChild) {
            fragment.appendChild(el.firstChild);
        }
        return fragment;
    }

    compile(fragment) {
        fragment.childNodes.forEach((childNode) => {
            if (childNode && childNode.nodeType === 1) {
                this.compileElement(childNode)
            } else {
                this.compileText(childNode)
            }
            if (childNode && childNode.childNodes.length > 0) {
                this.compile(childNode);
            }
        })
    }

    compileElement(node) {
        const attributes = Array.from(node.attributes);
        attributes.forEach((attribute) => {
            const {name, value} = attribute;
            if (this.isDirective(name)) {
                const [, directive] = name.split('-');
                const [directiveName, eventName] = directive.split(':');
                CompileUtil[directiveName](node, value, this.vm, eventName);
            }
        })
    }

    compileText(node) {
        if (node.textContent && node.textContent.includes('{{')) {
            CompileUtil['text'](node, node.textContent, this.vm)
        }
    }

    isDirective(name) {
        if (typeof name !== 'string') {
            return false;
        }
        return name.startsWith('v-');
    }
}
