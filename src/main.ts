import { AnyFunction } from './types';

/**
 * 将两个对象合并，嵌套对象会被展开合并
 * @param source target 会被合并到 source
 * @param target 
 */
export const deepMerge = <S extends { [key: string]: any }, T extends { [key: string]: any }>(source: S, target: T): S & T => {
  for (const [key, val] of Object.entries(target)) {
    // @ts-ignore
    source[key] = isPlainObject(source[key]) && isPlainObject(val) ? deepMerge(source[key], target[key]) : target[key];
  }
  return source as S & T;
}

type DebounceParameters = {
  interval?: number;
  callLast?: boolean;
};
/**
 * 函数防抖/节流
 * @param fn 
 * @param opts default: 200
 */
export function debounce<T extends Function>(fn: T, opts?: DebounceParameters): T;
export function debounce(fn: AnyFunction, opts: DebounceParameters = {}): AnyFunction {
  const interval = isUndefined(opts.interval) ? 200 : opts.interval;
  const callLast = isUndefined(opts.callLast) || opts.callLast;
  let buffering = false;
  let lastArguments: IArguments | null;
  return function (this: any) {
    if (buffering) {
      lastArguments = arguments;
      
    } else {
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
  }
}

/**
 * 便于ts类型推断
 */
export function isUndefined(v: any): v is void {
  return typeof v === 'undefined';
}
export function isNull(v: any): v is null {
  return typeof v === 'object' && !v;
}
export function isString(v: any): v is string {
  return typeof v === 'string';
}
export function isNumber(v: any): v is number {
  return typeof v === 'number';
}
export function isFunction(v: any): v is AnyFunction {
  return typeof v === 'function';
}
export function isPlainObject(v: any) {
  return typeof v === 'object' && v;
}
export const isArray = Array.isArray;

/**
 * 命名模式转换 eg-name -> EgName
 */
export function kebabToPascal(kebab: string) {
  const tokens = kebab.split('-');
  const toFirstUpperCase = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);
  return tokens.map((token) => toFirstUpperCase(token)).join('');
}

/**
 * 命名模式转换 EgName -> egName
 */
export function pascalToCamel(pascal: string) {
  return pascal.slice(0, 1).toLowerCase() + pascal.slice(1);
}

/**
 * 返回一个延迟给定时间resolve的Promise对象，用于使当前异步函数休眠
 * @param duration 持续时间（毫秒）
 */
export function sleep(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

/**
 * 深拷贝一个普通的js对象，采用非递归形式避免栈溢出
 * @param obj 源对象
 */
export function deepClone<T>(obj: T): T;
export function deepClone(obj: object | any[]) {
  function isRefType(o: any) {
    if (typeof o !== 'object' || o === null) {
      return false;
    }
    return true;
  }
  if (!isRefType(obj)) {
    return obj;
  }
  const isArray = Array.isArray(obj);
  const replica: object | any[] = isArray ? [] : {};
  const stack: any[] = [{
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
      } else {
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
export function quickSort<T>(arr: T[], toLeft: (pivot: T, crt: T) => boolean): T[] {
  const unsort = arr.slice();
  if (!unsort.length) {
    return unsort;
  }
  const pivot = unsort.pop() as T;
  const left: T[] = [];
  const right: T[] = [];
  let crt = unsort.pop();
  while (!isUndefined(crt)) {
    if (toLeft(pivot, crt)) {
      left.push(crt);
    } else {
      right.push(crt);
    }
    crt = unsort.pop();
  }
  return [...quickSort(left, toLeft), pivot, ...quickSort(right, toLeft)];
}
