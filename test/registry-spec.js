/**
 * registry-spec.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14 Apr 2015
 */
/* global describe, beforeEach, spyOn, it, expect */

import registry from "../js/app/util/registry";

function makeSpy(id) {
    let spy = {
        id,
        constructed: () => {},
        executed: () => {}
    };
    spyOn(spy, "constructed");
    spyOn(spy, "executed");
    return spy;
}

function makeMock(spy) {
    return () => {
        spy.constructed();
        return () => {
            spy.executed();
            return spy.id;
        };
    };
}

describe("When I instantiate a registry", () => {
    beforeEach(function () {
        this.registry = registry();
    });
    describe("and I get an item that has not been registered", () => {
        beforeEach(function () {
            this.spy = makeSpy("bar");
            this.mock = makeMock(this.spy);
            this.registry.get("foo", this.mock);
        });
        describe("the registry", () => {
            it("invokes the item's constructor", function () {
                expect(this.spy.constructed).toHaveBeenCalled();
            });
        });
        describe("and I get the item again", () => {
            describe("the registry", () => {
                it("returns a function", function () {
                    let item = this.registry.get("foo");
                    expect(typeof item).toBe("function");
                });
            });
            describe("the function returned by the registry", () => {
                it("returns the correct identity", function () {
                    let item = this.registry.get("foo");
                    expect(item()).toBe("bar");
                });
            });
        });
        describe("and I call the item, the registry", () => {
            it("invokes the item function", function () {
                this.registry.call("foo");
                expect(this.spy.executed).toHaveBeenCalled();
            });
        });
        describe("and I remove the item", () => {
            beforeEach(function () {
                this.registry.remove("foo");
            });
            describe("the registry's size", () => {
                beforeEach(function () {
                    this.registrySize = this.registry.getSize();
                });
                it("is 0", function () {
                    expect(this.registrySize).toBe(0);
                });
            });
            describe("and I try to get the item", () => {
                describe("the registry", () => {
                    it("throws an exception", function () {
                        expect(() => {
                            this.registry.get("foo");
                        }).toThrow(new Error("key foo is not registered and no constructor was provided to create it"));
                    });
                });
            });
        });
    });
    describe("and I get 101 items that have not been registered", () => {
        beforeEach(function () {
            let i;
            this.spies = new Array(101);
            this.mocks = new Array(101);
            for (i = 0; i < 101; i++) {
                this.spies[i] = makeSpy("bar" + i);
                this.mocks[i] = makeMock(this.spies[i]);
                this.registry.get("foo" + i, this.mocks[i]);
            }
        });
        describe("the registry", () => {
            it("invokes each item's constructor", function () {
                for (let i = 0; i < 101; i++) {
                    expect(this.spies[i].constructed).toHaveBeenCalled();
                }
            });
        });
        describe("and I get each item again", () => {
            describe("the function returned by the registry", () => {
                it("returns the correct identity", function () {
                    let item, i;
                    for (i = 0; i < 101; i++) {
                        item = this.registry.get("foo" + i);
                        expect(item()).toBe("bar" + i);
                    }
                });
            });
        });
        describe("and I call each item, the registry", () => {
            it("invokes each item function", function () {
                for (let i = 0; i < 101; i++) {
                    this.registry.call("foo" + i);
                    expect(this.spies[i].executed).toHaveBeenCalled();
                }
            });
        });
    });
});

