# Utils
yarn add @wpkg/utils

# List
+ AnyFunction (type): (...args: any[]) => any;
+ deepClone: **not** support circular reference;
+ deepMerge: Recursively assign second object to first;
+ debounce: debounce a function with specified freq, default 200 ms, support executing last call;
+ isUndefined;
+ isNull;
+ isString;
+ isNumber;
+ isFunction;
+ isPlainObject: Ensure passed value is a plain object which extends {};
+ isArray: Array.isArray;
+ kebabToPascal: Transform kebab case to pascal case;
+ pascalToCamel: Transform pascal case to camel case;
+ quickSort: Sort a array and return a new Array;
+ sleep: Block specified milliseconds within async function;
