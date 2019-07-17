import { AnyFunction } from './types';
/**
 * 将两个对象合并，嵌套对象会被展开合并
 * @param source target 会被合并到 source
 * @param target
 */
export declare const deepMerge: <S extends {
    [key: string]: any;
}, T extends {
    [key: string]: any;
}>(source: S, target: T) => S & T;
declare type DebounceParameters = {
    interval?: number;
    callLast?: boolean;
};
/**
 * 函数防抖/节流
 * @param fn
 * @param opts default: 200
 */
export declare function debounce<T extends Function>(fn: T, opts?: DebounceParameters): T;
/**
 * 便于ts类型推断
 */
export declare function isUndefined(v: any): v is void;
export declare function isNull(v: any): v is null;
export declare function isString(v: any): v is string;
export declare function isNumber(v: any): v is number;
export declare function isFunction(v: any): v is AnyFunction;
export declare function isPlainObject(v: any): any;
export declare const isArray: (arg: any) => arg is any[];
/**
 * 命名模式转换 eg-name -> EgName
 */
export declare function kebabToPascal(kebab: string): string;
/**
 * 命名模式转换 EgName -> egName
 */
export declare function pascalToCamel(pascal: string): string;
/**
 * 返回一个延迟给定时间resolve的Promise对象，用于使当前异步函数休眠
 * @param duration 持续时间（毫秒）
 */
export declare function sleep(duration: number): Promise<unknown>;
/**
 * 深拷贝一个普通的js对象，采用非递归形式避免栈溢出
 * @param obj 源对象
 */
export declare function deepClone<T>(obj: T): T;
/**
 * 快排，返回一个新数组（Array.prototype.sort为原地排序）
 * @param arr 待排序数组
 * @param toLeft 比较函数，若返回true，则当前数据项被移到左边
 */
export declare function quickSort<T>(arr: T[], toLeft: (pivot: T, crt: T) => boolean): T[];
export * from './types';
