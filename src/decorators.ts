export function sealed(p: string) {
  return function (constructor: Function): void {
    console.log(`sealing constructor ${p}`);

    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
  }
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
  const newConstructor: Function = function () {
    console.log('creating new instance');
    console.log(constructor.name);

    this.age = 20;
  }

  newConstructor.prototype = Object.create(constructor.prototype);
  Object.setPrototypeOf(newConstructor.prototype, constructor.prototype);

  newConstructor.prototype.printLibrarian = function () {
    console.log(`name: ${this.name} age: ${this.age}`);
  };

  return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log(`decorator: writable w/ param value ${isWritable}`);
    console.log(target);
    console.log(methodName);

    descriptor.writable = isWritable;

    return descriptor;
  }
}

export function timeout(ms: number) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: Array<any>) {
      // if (window.confirm('are you sure?')) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, ms);
      // }
    }

    return descriptor;
  }
}

export function logParameter(target: any, methodName: string, idx: number) {
  const k = `${methodName}_decor_params_idxs`;

  if (Array.isArray(target[k])) {
    target[k].push(idx);
  } else {
    target[k] = [idx];
  }
}

export function logMethod(target: Function | object, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: Parameters<typeof originalMethod>): ReturnType<typeof originalMethod> {
    const k = `${methodName}_decor_params_idxs`;
    const idxs = target[k];

    if (Array.isArray(idxs)) {
      args.forEach((arg, idx) => {
        if (idxs.includes(idx)) {
          console.log(`${methodName}, ${idx}, ${arg}`);
        }
      })
    }

    return originalMethod.apply(this, args);
  }

  return descriptor;
}

function makeProperty<T>(
  prototype: any,
  propertyName: string,
  getTransformer: (value: any) => T,
  setTransformer: (value: any) => T
) {
  const values = new Map<any, T>();
  Object.defineProperty(prototype, propertyName, {
    set(firstValue: any) {
      Object.defineProperty(this, propertyName, {
        get() {
          if (getTransformer) {
            return getTransformer(values.get(this));
          } else {
            values.get(this);
          }
        },
        set(value: any) {
          if (setTransformer) {
            values.set(this, setTransformer(value));
          } else {
            values.set(this, value);
          }
        },
        enumerable: true
      });
      this[propertyName] = firstValue;
    },
    enumerable: true,
    configurable: true
  });
}

export function format(pref: string = 'Mr./Mrs.') {
  return function(target: any, propertyName: string) {
    makeProperty(target, propertyName, value => `${ pref } ${ value }`, value => value);
  }
}

export function positiveInteger(target: Function | object, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalSet = descriptor.set;

  descriptor.set = function(value: number) {
    if (value < 1 || !Number.isInteger(value)) {
      throw new Error('invalid value');
    }

    originalSet.call(this, value);
  }

  return descriptor;
}
