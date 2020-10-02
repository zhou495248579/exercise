Array.prototype.distinct = function () {
    let i =0;
    const set = new Set();
    while(i<this.length) {
        const value = this[i];
        if(set.has(value)) {
            this.splice(i,1);
        } else {
            set.add(value);
            i++;
        }
    }
}


const arr = [1,2,3,2,3,4];
arr.distinct()
console.log(arr);
