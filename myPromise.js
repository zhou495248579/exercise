STATUS = {
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL',
    PENDING: 'PENDING'
};

const MyPromise = function (executor) {
    this.status = STATUS.PENDING;
    this.onFulfilledArray = [];
    this.onRejectedArray = [];
    this.value = '';
    this.error = '';
    const resolve = (value) => {
        if (value instanceof MyPromise) {
            return MyPromise.then(resolve, reject)
        }
        if (this.status === STATUS.PENDING) {
            setTimeout(() => {
                this.status = STATUS.SUCCESS;
                this.value = value;
                this.onFulfilledArray.forEach((func) => {
                    func(this.value);
                });
            }, 20)
        }
    };

    const reject = (error) => {
        if (value instanceof MyPromise) {
            return MyPromise.then(resolve, reject)
        }
        if (this.status === STATUS.PENDING) {
            setTimeout(() => {
                this.status = STATUS.FAIL;
                this.error = error;
                this.onRejectedArray.forEach((func) => {
                    func(this.error);
                });
            }, 20)
        }
    };
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
};

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
    onRejected = typeof onRejected === 'function' ? onRejected : (error) => error;

    let promise = null;
    if (this.status === STATUS.SUCCESS) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(() => { // 保持resolve操作在then后边
                try {
                    resolve(onFulfilled(this.value));
                } catch (e) {
                    reject(e);
                }
            })

        });
        return promise;
    } else if (this.status === STATUS.FAIL) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(onRejected(this.error));
                } catch (e) {
                    reject(e);
                }
            })

        });
        return promise;
    } else if (this.status === STATUS.PENDING) {
        promise = new MyPromise((resolve, reject) => {
            this.onFulfilledArray.push(() => {
                try {
                    resolve(onFulfilled(this.value));
                } catch (e) {
                    reject(e);
                }
            });
            this.onRejectedArray.push(() => {
                try {
                    reject(onRejected(this.error));
                } catch (e) {
                    reject(e);
                }
            });
        });
        return promise;
    }
};

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('data')
    }, 2000);
});

promise.then(data => {
    console.log(`1: ${data}`)
    return 'haha';
}).then(data => {
    console.log(`2: ${data}`);
})
