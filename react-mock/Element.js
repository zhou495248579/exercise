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
const renderDom = (element, target) => {
    target.appendChild(element)
}
const NODE_OPERATOR_TYPE = {
    REMOVE: 'remove',
    MODIFY_TEXT: 'modifyText',
    MODIFY_ATTRIBUTE: 'MODIFY_ATTRIBUTES',
    REPLACE_NODE: 'REPLACE'
}


class Element {
    constructor(tagName, attributes = {}, children = []) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
    }

    render() {
        let ele = document.createElement(this.tagName);
        for (let key in this.attributes) {
            setAttribute(ele, key, this.attributes[key]);
        }
        this.children.forEach((childElement) => {
            if (childElement instanceof Element) {
                ele.appendChild(childElement.render());
            } else if (typeof childElement === 'string') {
                ele.appendChild(document.createTextNode(childElement));
            }
        });
        return ele;
    }

}

function element(tagName, attributes, children) {
    return new Element(tagName, attributes, children)
}

const diff = (oldVirtualDom, newVirtualDom) => {
    let patches = {};

    // 递归树，比较后的结果放到 patches
    walkToDiff(oldVirtualDom, newVirtualDom, 0, patches)

    // 返回 diff 结果
    return patches
};
const patch = (node, patches) => {
    let walker = {index: 0};
    walk(node, walker, patches);
}

function doPatch(node, patches) {
    patches.forEach((patch) => {
        switch (patch.type) {
            case NODE_OPERATOR_TYPE.REMOVE:
                node.parentNode.removeChild(node);
                break;
            case NODE_OPERATOR_TYPE.MODIFY_ATTRIBUTE:
                const attributes = patch.diffAttributeResult.attributes;
                for (let key in attributes) {
                    if (node.nodeType === 1) {
                        if (attributes[key]) {
                            setAttribute(node, key, attributes[key]);
                        } else {
                            node.removeAttribute(key);
                        }
                    }
                }
                break;
            case NODE_OPERATOR_TYPE.MODIFY_TEXT:
                node.textContent = patch.data;
                break;
            case NODE_OPERATOR_TYPE.REPLACE_NODE:
                const newNode = (patch.newNode instanceof Element) ? patch.newNode.render() : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
        }
    })
}

const walk = (node, walker, patches) => {
    let currentPatch = patches[walker.index];
    let childNodes = node.childNodes;
    for (let node of childNodes) {
        walker.index++;
        walk(node, walker, patches)
    }
    if (currentPatch) {
        doPatch(node, currentPatch);
    }
}


let initialIndex = 0;
const walkToDiff = (oldVirtualDom, newVirtualDom, index, patches) => {
    let diffResult = [];
    if (!newVirtualDom) {
        diffResult.push({
            type: NODE_OPERATOR_TYPE.REMOVE,
            index
        })
    } else if (typeof oldVirtualDom === 'string' && typeof oldVirtualDom === typeof newVirtualDom) {
        if (oldVirtualDom !== newVirtualDom) {
            diffResult.push({
                type: NODE_OPERATOR_TYPE.MODIFY_TEXT,
                data: newVirtualDom,
                index
            })
        }
    } else if (typeof newVirtualDom.tagName === typeof oldVirtualDom.tagName) {
        let diffAttributeResult = {};
        for (let key in oldVirtualDom) {
            if (oldVirtualDom[key] !== newVirtualDom[key]) {
                diffAttributeResult[key] = newVirtualDom[key]
            }
        }
        for (let key in newVirtualDom) {
            // 旧节点不存在的新属性
            if (!oldVirtualDom.hasOwnProperty(key)) {
                diffAttributeResult[key] = newVirtualDom[key]
            }
        }

        if (Object.keys(diffAttributeResult).length > 0) {
            diffResult.push({
                type: NODE_OPERATOR_TYPE.MODIFY_ATTRIBUTE,
                diffAttributeResult
            })
        }
        oldVirtualDom.children.forEach((child, index) => {
            walkToDiff(child, newVirtualDom.children[index], ++initialIndex, patches)
        })
    } else {
        diffResult.push({
            type: NODE_OPERATOR_TYPE.REPLACE_NODE,
            newVirtualDom
        })
    }
    if (diffResult.length) {
        patches[index] = diffResult
    }
};
