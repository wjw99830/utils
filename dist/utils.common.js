'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 将两个对象合并，嵌套对象会被展开合并
 * @param source target 会被合并到 source
 * @param target
 */
const deepMerge = (source, target) => {
    for (const [key, val] of Object.entries(target)) {
        // @ts-ignore
        source[key] = isPlainObject(source[key]) && isPlainObject(val) ? deepMerge(source[key], target[key]) : target[key];
    }
    return source;
};
function debounce(fn, opts = {}) {
    const interval = isUndefined(opts.interval) ? 200 : opts.interval;
    const callLast = isUndefined(opts.callLast) || opts.callLast;
    let buffering = false;
    let lastArguments;
    return function () {
        if (buffering) {
            lastArguments = arguments;
        }
        else {
            lastArguments = null;
            buffering = true;
            setTimeout(() => {
                buffering = false;
                if (callLast && lastArguments) {
                    fn.call(this, ...lastArguments);
                }
            }, interval);
            fn.call(this, ...arguments);
        }
    };
}
/**
 * 便于ts类型推断
 */
function isUndefined(v) {
    return typeof v === 'undefined';
}
function isNull(v) {
    return typeof v === 'object' && !v;
}
function isString(v) {
    return typeof v === 'string';
}
function isNumber(v) {
    return typeof v === 'number';
}
function isFunction(v) {
    return typeof v === 'function';
}
function isPlainObject(v) {
    return typeof v === 'object' && v;
}
const isArray = Array.isArray;
/**
 * 命名模式转换 eg-name -> EgName
 */
function kebabToPascal(kebab) {
    const tokens = kebab.split('-');
    const toFirstUpperCase = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);
    return tokens.map((token) => toFirstUpperCase(token)).join('');
}
/**
 * 命名模式转换 EgName -> egName
 */
function pascalToCamel(pascal) {
    return pascal.slice(0, 1).toLowerCase() + pascal.slice(1);
}
/**
 * 返回一个延迟给定时间resolve的Promise对象，用于使当前异步函数休眠
 * @param duration 持续时间（毫秒）
 */
function sleep(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}
function deepClone(obj) {
    function isRefType(o) {
        if (typeof o !== 'object' || o === null) {
            return false;
        }
        return true;
    }
    if (!isRefType(obj)) {
        return obj;
    }
    const isArray = Array.isArray(obj);
    const replica = isArray ? [] : {};
    const stack = [{
            replica,
            target: obj,
        }];
    while (stack.length > 0) {
        const { target, replica } = stack.pop();
        for (const [key, val] of Object.entries(target)) {
            if (isRefType(val)) {
                replica[key] = Array.isArray(val) ? [] : {};
                stack.push({
                    target: val,
                    replica: replica[key],
                });
            }
            else {
                replica[key] = val;
            }
        }
    }
    return replica;
}
/**
 * 快排，返回一个新数组（Array.prototype.sort为原地排序）
 * @param arr 待排序数组
 * @param toLeft 比较函数，若返回true，则当前数据项被移到左边
 */
function quickSort(arr, toLeft) {
    const unsort = arr.slice();
    if (!unsort.length) {
        return unsort;
    }
    const pivot = unsort.pop();
    const left = [];
    const right = [];
    let crt = unsort.pop();
    while (!isUndefined(crt)) {
        if (toLeft(pivot, crt)) {
            left.push(crt);
        }
        else {
            right.push(crt);
        }
        crt = unsort.pop();
    }
    return [...quickSort(left, toLeft), pivot, ...quickSort(right, toLeft)];
}

exports.debounce = debounce;
exports.deepClone = deepClone;
exports.deepMerge = deepMerge;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isPlainObject = isPlainObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.kebabToPascal = kebabToPascal;
exports.pascalToCamel = pascalToCamel;
exports.quickSort = quickSort;
exports.sleep = sleep;
