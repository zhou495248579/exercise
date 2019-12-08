var offset = ele => {
    const result = {
        top: 0,
        left: 0
    };
    if (!ele || ele.nodeType !== 1 || getComputedStyle(ele).display === 'node') {
        return result;
    }

    result.top += ele.offsetTop;
    result.left += ele.offsetLeft;
    let parentNode = ele.parentNode;
    while (parentNode) {
        if (!parentNode || parentNode.nodeType !== 1) {
            break;
        }
        const position = getComputedStyle(parentNode).position;
        const borderTopWidth = parseFloat(getComputedStyle(parentNode).borderTopWidth) || 0;
        const borderLeftWidth = parseFloat(getComputedStyle(parentNode).borderLeftWidth) || 0;

        if (position === 'static') {
            parentNode = parentNode.parentNode;
            continue;
        }

        result.top = result.top + parentNode.offsetTop - parentNode.scrollTop + borderTopWidth;
        result.left = result.left + parentNode.offsetLeft - parentNode.scrollLeft + borderLeftWidth;

        if (position === 'fixed') {
            break;
        }
        parentNode = parentNode.parentNode;
    }
    return result;
};

var offset = ele => {
    let result = {
        top: 0,
        left: 0
    };
    if (!ele || ele.nodeType !== 1 || getComputedStyle(ele).display === 'node') {
        return result;
    }
    if (!"getBoundingClientRect" in document.documentElement) {
        return result;
    }
    result = ele.getBoundingClientRect();
    const documentElement = ele.ownerDocument.documentElement;
    return {
        top: result.top + window.pageYOffset - documentElement.clientTop - document.body.clientTop,
        left: result.left + window.pageXOffset - documentElement.clientLeft - document.body.clientLeft
    }
};
const box = document.getElementsByClassName('box')[0];
const wrapper = document.getElementsByClassName('wrapper')[0];

const content = document.getElementsByClassName('content')[0];
console.log(offset(box), offset(wrapper), offset(content))
// box.addEventListener('scroll', function () {
//     console.log(box.scrollTop, content.offsetTop, content.offsetLeft);
// }, false);
// console.log(document.documentElement.clientTop)
