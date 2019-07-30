import { deepClone, deepMerge, kebabToPascal, sleep, quickSort, debounce, pascalToCamel } from '../src/main';

describe('deepClone', () => {
  it('should clone a new plain object.', () => {
    const src = {
      foo: 'foo',
      bar: {
        prop: 'prop',
      },
    };
    const clone = deepClone(src);
    src.bar.prop = 'changed';
    src.foo = 'changed';
    expect(clone.foo).toBe('foo');
    expect(clone.bar.prop).toBe('prop');
  });
  it('should clone a new array.', () => {
    const src = [1, 2, 'foo', 'bar', {
      foo: 'bar',
    }];
    const clone = deepClone(src);
    src[0] = 2;
    src[2] = 'changed';
    (src[4] as { foo: string }).foo = 'bar bar';
    expect(clone[0]).toBe(1);
    expect(clone[2]).toBe('foo');
    expect(clone[4]).toEqual({
      foo: 'bar',
    });
    expect(src[4]).toEqual({
      foo: 'bar bar',
    });
  });
  it('should clone a value-type variable.', () => {
    let src: any = 1;
    let clone = deepClone(src);
    expect(clone).toBe(src);
    src = 'foo';
    clone = deepClone(src);
    expect(clone).toBe(src);
    src = null;
    clone = deepClone(src);
    expect(clone).toBe(src);
    src = undefined;
    clone = deepClone(src);
    expect(clone).toBe(src);
    src = true;
    clone = deepClone(src);
    expect(clone).toBe(src);
  });
  it('should clone symbol keys.', () => {
    const symbolA = Symbol('a');
    const src = {
      [symbolA]: 'symbol-a',
    };
    const clone = deepClone(src);
    expect(clone[symbolA]).toBe('symbol-a');
  });
  it('should clone recursive reference object.', () => {
    const a: any = {};
    const b: any = {};
    b.a = a;
    a.b = b;
    const clone = deepClone(a);
    expect(clone).toBe(clone.b.a);
  });
});

describe('deepMerge', () => {
  it(`return first parameter.`, () => {
    const a = {};
    const b = {};
    const c = deepMerge(a, b);
    expect(c).toStrictEqual(a);
  });
  it('merges two shallow objects.', () => {
    const a = {
      p1: 1,
      p2: 2,
    };
    const b = {
      p1: 'p1',
    };
    const c = deepMerge(a, b);
    expect(c.p1).toBe('p1');
    expect(c.p2).toBe(2);
  });
  it('merges two nested objects.', () => {
    const a = {
      p1: 1,
      p2: 2,
      p3: {
        p3p1: 'p3p1',
        p3p2: 'p3p2',
      }
    };
    const b = {
      p1: 'p1',
      p3: {
        p3p2: 'p3p2-merged',
      },
    };
    const c = deepMerge(a, b);
    expect(c.p1).toBe('p1');
    expect(c.p2).toBe(2);
    expect(c.p3).toEqual({
      p3p1: 'p3p1',
      p3p2: 'p3p2-merged',
    });
  });
  it('merges value-type properties directly.', () => {
    const a = {
      p1: 1,
      p2: {
        p2p1: 'p2p1',
      },
    };
    const b = {
      p1: 'p1',
      p2: 'p2'
    };
    const c = deepMerge(a, b);
    expect(c.p1).toBe('p1');
    expect(c.p2).toBe('p2');
  });
  it('merges reference-type properties directly which are value-type in first parameter.', () => {
    const a = {
      p1: 1,
      p2: 'p2',
    };
    const b = {
      p1: 'p1',
      p2: {
        p2p1: 'p2p1',
      },
    };
    const c = deepMerge(a, b);
    expect(c.p1).toBe('p1');
    expect(c.p2).toEqual({
      p2p1: 'p2p1',
    });
  });
});

describe('kebabToPascal', () => {
  it('transforms kebab to pascal.', () => {
    const kebab = 'kebab-name_1';
    const pascal = kebabToPascal(kebab);
    expect(pascal).toBe('KebabName_1');
  });
});

describe('pascalToCamel', () => {
  it('transforms pascal to camel.', () => {
    const pascal = 'PascalName_1';
    const camel = pascalToCamel(pascal);
    expect(camel).toBe('pascalName_1');
  });
});

describe('sleep', () => {
  it('blocks specified milliseconds.', done => {
    let a = 'before sleep';
    sleep(1500).then(() => a = 'after sleep');
    setTimeout(() => {
      expect(a).toBe('after sleep');
      done();
    }, 1501);
  });
});

describe('quickSort', () => {
  it('sorts an out-of-order array and return a new array', () => {
    const a = [1, 3, 0, 89, 76];
    const b = quickSort(a, (pivot, crt) => pivot < crt);
    const c = quickSort(a, (pivot, crt) => pivot > crt);
    expect(b).toEqual([89, 76, 3, 1, 0]);
    expect(c).toEqual([0, 1, 3, 76, 89]);
    const tester = jest.fn(() => a !== b && a !== c && b !== c);
    tester();
    expect(tester).toReturnWith(true);
  });
});

describe('debounce', () => {
  it(`return a function which called futilely during interval.`, done => {
    const raw1 = jest.fn(() => 0);
    // default interval is 200
    let debounced1 = debounce(raw1, { callLast: false });
    const raw2 = jest.fn(() => 0);
    debounced1 = jest.fn(debounced1);
    let debounced2 = debounce(raw2, { interval: 350, callLast: false });
    debounced2 = jest.fn(debounced2);
    debounced1();
    debounced1();
    debounced2();
    debounced2();
    setTimeout(() => {
      debounced1();
      debounced1();
      debounced2();
      debounced2();
    debounced2();
      setTimeout(() => {
        debounced1();
        debounced1();
        debounced2();
        debounced2();
        expect(raw1).toBeCalledTimes(3);
        expect(raw2).toBeCalledTimes(2);
        done();
      }, 201);
    }, 201);
  });
  it(`return a function which will be called once if buffered during interval.`, done => {
    const raw = jest.fn((arg?: any) => 0);
    let debounced = debounce(raw);
    debounced();
    debounced('arg1');
    debounced('arg2');
    setTimeout(() => {
      expect(raw).toBeCalledTimes(2);
      expect(raw).toBeCalledWith('arg2');
      done();
    }, 201);
  });
  it(`callLast only when lastArguments existed.`, done => {
    const raw = jest.fn(() => 0);
    let debounced = debounce(raw);
    debounced();
    setTimeout(() => {
      expect(raw).toBeCalledTimes(1);
      done();
    }, 201);
  });
});
