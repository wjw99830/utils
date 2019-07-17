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
/**
 * 函数防抖/节流
 * @param fn
 * @param opts default: 200
 */
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
                if (callLast) {
                    fn.call(this, lastArguments);
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

exports.debounce = debounce;
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
exports.sleep = sleep;
