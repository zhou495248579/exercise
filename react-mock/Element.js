class Element {
    constructor(tagName, attributes = {}, children = []) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
    }

    render() {
        const ele = document.createElement(this.tagName);
        if (this.children && this.children.length > 0) {
            this.children.forEach((childElement) => {
                if (childElement instanceof Element) {
                    ele.appendChild(childElement.render());
                } else if (typeof childElement === 'string') {
                    ele.appendChild(document.createTextNode(childElement));
                }
            })
        }
        return ele;
    }
}

const element = (tagName, attributes, children) => {
    return new Element(tagName, attributes, children);
};

const renderDom = (ele, dom) => {
    dom.appendChild(ele);
};

const NODE_OPERATOR_TYPE = {
    REMOVE_NODE: 'removeNode',
    MODIFY_TEXT: 'modifyText',
    MODIFY_ATTRIBUTE: 'modifyAttribute',
    REPLACE_NODE: 'replaceNode'
};
let initialIndex = 0;

const compareDiff = (newVirtualDom, oldVirtualDom, index, patch) => {
    const diffresult = [];
    if (!newVirtualDom) {
        diffresult.push({
            type: NODE_OPERATOR_TYPE.REMOVE_NODE,
        })
    } else if (typeof newVirtualDom === 'string' && typeof oldVirtualDom === 'string') {
        if (oldVirtualDom !== newVirtualDom) {
            diffresult.push({
                type: NODE_OPERATOR_TYPE.MODIFY_TEXT,
                data: newVirtualDom
            })
        }
    } else if (newVirtualDom.tagName === oldVirtualDom.tagName) {
        const diffAttributeResult = {};
        // 先遍历老dom找出变化的属性值， 再遍历新dom找出新添加的属性
        for (const key in oldVirtualDom) {
            if (oldVirtualDom[key] !== newVirtualDom[key]) {
                diffAttributeResult[key] = newVirtualDom[key];
            }
        }

        for (const key in newVirtualDom) {
            if (!oldVirtualDom.hasOwnProperty(key)) {
                diffAttributeResult[key] = newVirtualDom[key];
            }
        }
        if (Object.keys(diffAttributeResult).length > 0) {
            diffresult.push({
                type: NODE_OPERATOR_TYPE.MODIFY_ATTRIBUTE,
                diffAttributeResult
            })
        }
        // 在节点相同情况下遍历子节点进行比较
        oldVirtualDom.children.forEach((childEle, index) => {
            compareDiff(newVirtualDom.children[index], childEle, ++initialIndex, patch)
        })
    } else {
        diffresult.push({
            type: NODE_OPERATOR_TYPE.REPLACE_NODE,
            newVirtualDom
        })
    }
    if (diffresult.length > 0) {
        patch[index] = diffresult;
    }
};


const diff = (newVirtualDom, oldVirtualDom) => {
    let patches = {}

    // 递归树 比较后的结果放到 patches
    compareDiff(newVirtualDom, oldVirtualDom, 0, patches)

    return patches
}
const setAttribute = (node, key, value) => {
    switch (key) {
        case 'style':
            node.style.cssText = value
            break
        case 'value':
            let tagName = node.tagName || ''
            tagName = tagName.toLowerCase()
            if (
                tagName === 'input' || tagName === 'textarea'
            ) {
                node.value = value
            } else {
                // 如果节点不是 input 或者 textarea, 则使用 setAttribute 去设置属性
                node.setAttribute(key, value)
            }
            break
        default:
            node.setAttribute(key, value)
            break
    }
}


function doPatch(node, diffResult) {
    diffResult.forEach((diff) => {
        switch (diff.type) {
            case NODE_OPERATOR_TYPE.REPLACE_NODE:
                const newVirtualDom = diff.newVirtualDom;
                let newNode = null;
                if (newVirtualDom instanceof Element) {
                    newNode = newVirtualDom.render();
                } else if (typeof newVirtualDom === 'string') {
                    newNode = document.createTextNode(newVirtualDom);
                }
                node.parentNode.replaceChild(newNode, node);
                break;
            case NODE_OPERATOR_TYPE.MODIFY_ATTRIBUTE:
                const diffAttributeResult = diff.diffAttributeResult;
                const attributes = diffAttributeResult.attributes;
                for (const attr in attributes) {
                    if (node.nodeType === 1) {
                        if (attributes[attr]) {
                            setAttribute(node, attr, attributes[attr]);
                        } else {
                            node.removeAttribute(attr);
                        }
                    }
                }
                break;
            case NODE_OPERATOR_TYPE.MODIFY_TEXT:
                node.textContent = diff.data;
                break;
            case NODE_OPERATOR_TYPE.REMOVE_NODE:
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    })
}

function walk(node, walker, patches) {
    const currentPatch = patches[walker.index];
    node.childNodes.forEach((node, index) => {
        walker.index++;
        walk(node, walker, patches);
    })
    if (currentPatch) {
        doPatch(node, currentPatch);
    }
}

const patch = (node, patches) => {
    const walker = {index: 0};
    walk(node, walker, patches);
}
