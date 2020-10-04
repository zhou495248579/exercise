 export function _get(object, keys: string) {
    const keyArr = keys.split(/\./g);
    return keyArr.reduce((cur,prev)=> {
        return (cur||{})[prev];
    },object)
}


