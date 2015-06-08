/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />
var V = require("../index");
var assert = require("assert");
describe("Utils", function () {
    var obj = {
        "name": "John Doe",
        "address": {
            "street": "Homestreet 123",
            "city": "Someville"
        }
    };
    it("get using without dots should work", function () {
        assert.deepEqual(V.get(obj, "name"), "John Doe");
    });
    it("get using dot notation should work", function () {
        assert.deepEqual(V.get(obj, "address.city"), "Someville");
    });
    it("get using very deep dot notation should work", function () {
        assert.deepEqual(V.get({ 'a': { 'b': { 'c': { 'd': 42 } } } }, "a.b.c.d"), 42);
    });
    it("get using array notation should work", function () {
        assert.deepEqual(V.get(['a', 'b'], "[1]"), 'b');
    });
    it("get using array, array notation should work", function () {
        assert.deepEqual(V.get([['a', 'b']], "[0][1]"), 'b');
    });
    it("get using dot array notation should work", function () {
        assert.deepEqual(V.get({ 'a': ['b', 'c'] }, "a[1]"), 'c');
    });
    it("get using dot array dot notation should work", function () {
        assert.deepEqual(V.get({ 'aaa': ['bbbb', { 'ccc': 'ddd' }] }, "aaa[1].ccc"), 'ddd');
    });
    it("set using without dots should work", function () {
        var copy = V.set(obj, "name", "Not a Dummy");
        assert.deepEqual(copy, {
            "name": "Not a Dummy",
            "address": {
                "street": "Homestreet 123",
                "city": "Someville"
            }
        });
    });
    it("set using dots should work", function () {
        var copy = V.set(obj, "address.city", "Otherville");
        assert.deepEqual(copy, {
            "name": "John Doe",
            "address": {
                "street": "Homestreet 123",
                "city": "Otherville"
            }
        });
    });
    it("set using array notation should work", function () {
        assert.deepEqual(V.set(['a', 'b'], "[1]", "c"), ['a', 'c']);
    });
    it("set using dot array notation should work", function () {
        assert.deepEqual(V.set({ 'a': ['b', 'c'] }, "a[1]", "d"), { 'a': ['b', 'd'] });
    });
    it("set using dot array dot notation should work", function () {
        assert.deepEqual(V.set({ 'aaa': ['bbbb', { 'ccc': 'ddd' }] }, "aaa[1].ccc", "eee"), { 'aaa': ['bbbb', { 'ccc': 'eee' }] });
    });
});
