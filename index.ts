/// <reference path="typings/lodash/lodash.d.ts" />
import _ = require("lodash");
/***
 * Copyright (C) Jari Pennanen, 2015
 * See LICENSE for copying
 */

export function getUsingDotArrayNotation(object: any, notation: string): any {
    var objectGetter = object,
        objectTrail = "",
        arrayTrail = "",
        inArray = false;
    for (var i = 0; i < notation.length; i++) {
        var char = notation[i],
            next = notation[i + 1];
        if (char === "[") {
            arrayTrail = "";
            inArray = true;
            continue;
        } else if (char === "]") {
            inArray = false;
            objectGetter = objectGetter[parseInt(arrayTrail)];
            objectTrail = "";
            continue;
        }
        if (inArray) {
            arrayTrail += char;
            continue;
        }
        if (char !== ".") {
            objectTrail += char;
        }
        if (next === "." || typeof next === "undefined") {
            objectGetter = objectGetter[objectTrail];
            objectTrail = "";
        }
    }
    return objectGetter;
}

export function setUsingDotArrayNotation<T>(object: T, notation: string, val: any): T {
    var o = _.cloneDeep(object),
        objectSetter = o,
        objectTrail = "",
        arrayTrail = "",
        inArray = false;
        
    for (var i = 0; i < notation.length; i++) {
        var char = notation[i],
            next = notation[i + 1];
        if (char === "[") {
            inArray = true;
            continue;
        } else if (char === "]") {
            inArray = false;
            if (typeof next === "undefined") {
                objectSetter[parseInt(arrayTrail)] = val;
            }
            objectSetter = objectSetter[parseInt(arrayTrail)];
            objectTrail = "";
            continue;
        }
        if (inArray) {
            arrayTrail += char;
            continue;
        }
        if (char !== ".") {
            objectTrail += char;
        }
        if (typeof next === "undefined") {
            objectSetter[objectTrail] = val;
        } else if (next === ".") {
            objectSetter = objectSetter[objectTrail];
            objectTrail = "";
        }
    }
    // Object.freeze o here?
    return o;
}
