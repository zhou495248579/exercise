import html from './index.html'
import styles from './styles/index.less';

const obj = {
    a: 1,
    b: 3,
    [Symbol.for('key')]: 'symbol',
    c: {
        d: 4,
        arr: [1, new Date(), 3],
        method(a, b) {
            return a + b;
        }
    }
};
Object.setPrototypeOf(obj, {
    val: 'value'
});
// console.log(obj.propertyIsEnumerable('val'));
//
//
// for (var key in obj) {
//     console.log(key, obj[key]);
// }
// for (let key of Object.keys(obj)) {
//     console.log(key, obj[key]);
// }
// for (let key of Object.getOwnPropertySymbols(obj)) {
//     console.log(key, obj[key]);
// }
function isSampleType(val) {
    if(typeof val === 'object'  || typeof val === 'symbol') {
        return false;
    } else {
        return true;
    }
}
function clone(obj) {
    const temp = {};
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (Array.isArray(value)) {
            const arr = [];
            for(const item of value) {
                if(isSampleType(item)) {
                    arr.push(item);
                } else {
                    arr.push(clone(item));
                }
            }
            temp[key] = arr;
        } else if (isSampleType(value)) {
            temp[key] = value;
        } else {
            temp[key] = clone(value);
        }
    }
    return temp;
}

// var a = clone(obj)
// console.log(a);
setTimeout(() => {
    console.log('a')
    new Promise((res) => {
        res('c1')
    }).then((d) => {
        console.log(d)
    })
    new Promise((res) => {
        res('c2')
    }).then((d) => {
        console.log(d)
    })
    setTimeout(() => {
        console.log('f')
    })
})
setTimeout(() => {
    console.log('b')
})
