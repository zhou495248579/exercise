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
        setTimeout(() => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.SUCCESS;
                this.value = value;
                this.onFulfilledArray.forEach((func) => {
                    func(this.value);
                });
            }
        }, 20)
    };

    const reject = (error) => {
        if (error instanceof MyPromise) {
            return MyPromise.then(resolve, reject)
        }
        setTimeout(() => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FAIL;
                this.error = error;
                this.onRejectedArray.forEach((func) => {
                    func(this.error);
                });
            }
        }, 20)
    };
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
};

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
    onRejected = typeof onRejected === 'function' ? onRejected : (error) => {
        throw error;
    }
    let promise = null;
    if (this.status === STATUS.SUCCESS) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(() => { // 保持resolve操作在then后边
                try {
                    resolvePromiseResult(promise, onFulfilled(this.value), resolve, reject);
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
                    resolvePromiseResult(promise, onRejected(this.error), resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })

        });
        return promise;
    } else if (this.status === STATUS.PENDING) {
        promise = new MyPromise((resolve, reject) => {
            this.onFulfilledArray.push((value) => {
                try {
                    resolvePromiseResult(promise, onFulfilled(value), resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            this.onRejectedArray.push((error) => {
                try {
                    resolvePromiseResult(promise, onRejected(error), resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
        return promise;
    }
};

function resolvePromiseResult(promise, result, resolve, reject) {
    if (result instanceof MyPromise) {
        if (result.status === STATUS.PENDING) {
            result.then((data) => {
                resolvePromiseResult(promise, data, resolve, reject);
            }, reject)
        } else {
            result.then(resolve, reject);
        }
        return;
    }

    const isComplexObject = (typeof result === 'function' || typeof result === 'object') && result !== null;
    // let consumed = false;
    if (isComplexObject) {
        try {
            const thenable = result.then;
            if (typeof thenable === 'function') {
                // if (consumed) {
                //     return;
                // }
                // consumed = true;
                thenable.call(result, (data) => {
                    return resolvePromiseResult(promise, data, resolve, reject);
                }, (error) => {
                    // if (consumed) {
                    //     return;
                    // }
                    // consumed = true;
                    return reject(error);
                })
            } else {
                resolve(result);
            }
        } catch (e) {
            // if (consumed) {
            //     return;
            // }
            // consumed = true;
            return reject(e);
        }

    } else {
        resolve(result);
    }
}

MyPromise.prototype.catch = function (catchFunc) {
    return this.then(null, catchFunc)
};

MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
        resolve(value)
    })
};

MyPromise.reject = function (value) {
    return new MyPromise((resolve, reject) => {
        reject(value)
    })
};

MyPromise.all = function (promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new Error('The arguments should be an array!')
    }
    return new MyPromise((resolve, reject) => {
            try {
                let resultArray = [];

                const length = promiseArray.length;

                for (let i = 0; i < length; i++) {
                    promiseArray[i].then(data => {
                        resultArray.push(data);

                        if (resultArray.length === length) {
                            resolve(resultArray)
                        }
                    }, reject)
                }
            } catch (e) {
                reject(e)
            }
        }
    )
}

MyPromise.race = function (promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new MyPromise((resolve, reject) => {
        try {
            const length = promiseArray.length
            for (let i = 0; i < length; i++) {
                promiseArray[i].then(resolve, reject)
            }
        } catch (e) {
            reject(e)
        }
    })
}


const promise1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('lucas')
    }, 2000)
})

const promise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('lucas')
    }, 2000)
})

MyPromise.race([promise1, promise2]).then(data => {
    console.log(data)
})









