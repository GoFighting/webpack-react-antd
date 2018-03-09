const PromisePolyfill = (() => {
    //状态管理
    const promiseStatusSymbol = Symbol('PromiseStatus');
    const promiseValueSymbol = Symbol('PromiseValue');
    function resolve() { // resolve操作设置值和状态
        if(this[promiseStatusSymbol] !== 'PENDING') {
            return
        }
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = 'FULFILLED';
    }
    function reject() { // reject操作设置值和状态
        if(this[promiseStatusSymbol] !== 'PENDING') {
            return
        }
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = 'REJECTED';
    }
    class myPromise {
        constructor(resolver) {
            if (typeof resolver !== 'function') {
                throw new TypeError(`parameter 1 must be a function, but get a ${typeof func}`);
            }
            this[promiseStatusSymbol] = 'PENDING';
            resolver(
                resolve.bind(this),
                reject.bind(this)
            );
            this.listenIn()
        }
        listenIn() { // 开一个定时器监听状态变化，如果有变化则执行相对应的callback
            const interval = setInterval(() => {
                if (this[promiseStatusSymbol] === 'FULFILLED' || this[promiseStatusSymbol] === 'REJECTED') {
                    clearInterval(interval);
                    if(this[promiseStatusSymbol] === 'FULFILLED' && this.resolveCallback) {
                        this.resolveCallback(this[promiseValueSymbol]);
                    } else if(this[promiseStatusSymbol] === 'REJECTED' && this.rejectCallback) {
                        this.rejectCallback(this[promiseValueSymbol]);
                    }
                    this[promiseStatusSymbol] = 'PENDING';
                }
            });
            return this
        }
        then(callback) { // resolve起监听
            if(this.resolveCallback) {
                return
            }
            this.resolveCallback = callback;
            return this
        }
        catch(callback) { // reject起监听
            if(this.rejectCallback) {
                return
            }
            this.rejectCallback = callback;
            return this
        }
    }
    return myPromise;
})();
new PromisePolyfill(function (resolve, reject) {
    setTimeout(() => {
        // resolve(222);
        reject(333);
    }, 1000);
}).then(function (res) {
    console.log(res)
}).catch(function (res) {
    console.log(res)
})