import {STATUS} from "./config";

const resolvePromise = (promise, result, resolve, reject) => {
    // 返回result如果和then方法返回的promise一样会陷入死循环
    if (result === promise) {
        reject(new TypeError('error due to circular reference'));
    }

    // 处理result是promise类型
    if (result instanceof Promise) {
        if (result.status === STATUS.PENDING) {
            // 成功后防止仍然是promise 递归调用
            result.then((data) => {
                resolvePromise(promise, data, resolve, reject);
            }, reject);
        } else {
            result.then(resolve, reject);
        }
        return; // 防止走下去 走进判断类promise中
    }
    // 判断对象是不是 object 或者function
    const isComplexObject = (target) => (typeof target === 'object' || typeof target === 'function') && (target !== null);

    if (isComplexObject(result)) {
        try {
            // 处理类promise对象
            const thenable = result.then;
            if (typeof thenable === 'function') {
                thenable.call(result, (data) => {
                    return resolvePromise(promise, data, resolve, reject);
                }, (error) => {
                    reject(error);
                })
            } else {
                resolve(result);
            }
        } catch (e) {
            reject(e);
        }
    } else {
        resolve(result);
    }

};
export default class Promise {
    constructor(executor) {
        // 状态需要有，控制executor中与then联动
        this.status = STATUS.PENDING;
        this.successCallbackList = [];
        this.failCallBackList = [];
        this.value = '';
        this.error = '';
        if (typeof executor === 'function') {
            const resolveFunction = (param) => {
                if (param instanceof Promise) {
                    param.then(resolveFunction, rejectFunction)
                }
                // 保证promise中输出的值在正常流程后边，也保证回调函数队列中一定有回调函数
                setTimeout(() => {
                    if (this.status === STATUS.PENDING) {
                        this.status = STATUS.SUCCESS;
                        this.value = param;
                        this.successCallbackList.forEach((successCallback) => {
                            successCallback(this.value);
                        })
                    }
                })
            };
            const rejectFunction = (error) => {
                if (error instanceof Promise) {
                    error.then(resolveFunction, rejectFunction)
                }
                setTimeout(() => {
                    if (this.status === STATUS.PENDING) {
                        this.error = error;
                        this.status = STATUS.FAIL;
                        this.failCallBackList.forEach((failCallBack) => {
                            failCallBack(this.error);
                        })
                    }
                })

            };
            try {
                executor(resolveFunction, rejectFunction);
            } catch (e) {
                rejectFunction(e);
            }
        }
    }

    /**
     * 每个判断分支中都返回一个promise
     */
    then(successCallback, failCallBack) {
        if (typeof failCallBack !== 'function') {
            failCallBack = (error) => error;
        }
        if (typeof successCallback !== 'function') {
            successCallback = (data) => data;
        }
        let promise = null;
        if (this.status === STATUS.PENDING) {
            return promise = new Promise((resolve, reject) => {
                this.successCallbackList.push(() => {
                    try {
                        let result = successCallback(this.value);
                        resolvePromise(promise, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                this.failCallBackList.push(() => {
                    try {
                        let result = failCallBack(this.error);
                        resolvePromise(promise, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });

        } else if (this.status === STATUS.FAIL) {
            return promise = new Promise((resolve, reject) => {
                try {
                    let result = failCallBack(this.error);
                    resolvePromise(promise, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        } else if (this.status === STATUS.SUCCESS) {
            return promise = new Promise((resolve, reject) => {
                try {
                    let result = successCallback(this.value);
                    resolvePromise(promise, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        }
    }

    catch(handleError) {
        this.then(null, handleError);
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(value) {
        return new Promise((resolve, reject) => {
            reject(value);
        })
    }

    /**
     *
     * @param promiseArray
     * @return {Promise}
     * 要注意catch 错误的位置
     */
    static all(promiseArray) {
        const result = [];
        return new Promise((resolve, reject) => {
            try {
                promiseArray.forEach((promise, index) => {
                    promiseArray[index].then((data) => {
                        result.push(data);
                        if (index === promiseArray.length - 1) {
                            resolve(result);
                        }

                    }, (error) => {
                        reject(error);
                    })
                })
            } catch (e) {
                reject(e);
            }
        })
    }

    static race(promiseArray) {
        return new Promise((resolve, reject) => {
            try {
                promiseArray.forEach((promise, index) => {
                    promiseArray[index].then((data) => {
                        resolve(data)
                    }, (error) => {
                        reject(error);
                    })
                })
            } catch (e) {
                reject(e);
            }
        })
    }
}
