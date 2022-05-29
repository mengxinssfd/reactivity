import {isObject} from "@vue/shared";

const isReactive = Symbol('isReactive');
const map = new WeakMap();

export function reactive(target: object) {
    // 不代理非对象目标
    if (!isObject(target)) {
        return target;
    }

    // 如果传进来的是代理过的proxy对象
    if(target[isReactive]){
        return target;
    }

    // 如果该原始对象已经代理过
    const existing = map.get(target);
    if (existing) {
        return existing;
    }


    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            // 如果访问的key是标记则返回true，前提是已经代理过的对象
            if (key === isReactive) {
                return true;
            }
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver);
            return true;
        },

    });

    console.log(1);
    map.set(target, proxy);
    return proxy;
}