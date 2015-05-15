/**
 * registry-spec.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14 Apr 2015
 */
/* global describe, beforeEach, spyOn, it, expect */

define([
    "jquery",
    "../js/app/util/registry"
], function ($, registry) {

    describe("When I instantiate a registry with no arguments", function () {
        beforeEach(function () {
            this.registry = registry();
        });
        describe("and I get an item that has not been registered", function () {
            beforeEach(function () {
                this.spy = makeSpy("bar");
                this.mock = makeMock(this.spy);
                this.registry.get("foo", this.mock);
            });
            describe("the registry", function () {
                it("invokes the item's constructor", function () {
                    expect(this.spy.constructed).toHaveBeenCalled();
                });
            });
            describe("and I get the item again", function () {
                describe("the registry", function () {
                    it("returns a function", function () {
                        var item = this.registry.get("foo");
                        expect(typeof item).toBe("function");
                    });
                });
                describe("the function returned by the registry", function () {
                    it("returns the correct identity", function () {
                        var item = this.registry.get("foo");
                        expect(item()).toBe("bar");
                    });
                });
            });
            describe("and I call the item, the registry", function () {
                it("invokes the item function", function () {
                    this.registry.call("foo");
                    expect(this.spy.executed).toHaveBeenCalled();
                });
            });
        });
        describe("and I get 101 items that have not been registered", function () {
            beforeEach(function () {
                var i;
                this.spies = new Array(101);
                this.mocks = new Array(101);
                for (i = 0; i < 101; i++) {
                    this.spies[i] = makeSpy("bar" + i);
                    this.mocks[i] = makeMock(this.spies[i]);
                    this.registry.get("foo" + i, this.mocks[i]);
                }
            });
            describe("the registry", function () {
                it("invokes each item's constructor", function () {
                    for (var i = 0; i < 101; i++) {
                        expect(this.spies[i].constructed).toHaveBeenCalled();
                    }
                });
            });
            describe("and I get each item again", function () {
                describe("the function returned by the registry", function () {
                    it("returns the correct identity", function () {
                        var item, i;
                        for (i = 0; i < 101; i++) {
                            item = this.registry.get("foo" + i);
                            expect(item()).toBe("bar" + i);
                        }
                    });
                });
            });
            describe("and I call each item, the registry", function () {
                it("invokes each item function", function () {
                    for (var i = 0; i < 101; i++) {
                        this.registry.call("foo" + i);
                        expect(this.spies[i].executed).toHaveBeenCalled();
                    }
                });
            });
        });
    });

    describe("When I instantiate the registry with maxItems = 3 and a garbage collector that removes every second item", function () {
        beforeEach(function () {
            var spy = makeSpy("gc");
            this.gcSpy = spy;
            this.registry = registry(3, function (reg) {
                var flag = false;
                spy.executed();
                $.each(reg, function (key) {
                    if (flag) {
                        delete reg[key];
                    }
                    flag = !flag;
                });
            });
        });
        describe("and I get 4 items", function () {
            beforeEach(function () {
                var i;
                this.spies = new Array(4);
                this.mocks = new Array(4);
                for (i = 0; i < 4; i++) {
                    this.spies[i] = makeSpy("bar" + i);
                    this.mocks[i] = makeMock(this.spies[i]);
                    this.registry.get("foo" + i, this.mocks[i]);
                }
            });
            describe("the garbage collector", function () {
                it("was invoked", function () {
                    expect(this.gcSpy.executed).toHaveBeenCalled();
                });
            });
            describe("and I call the first item, the registry", function () {
                it("invokes the item function", function () {
                    this.registry.call("foo0");
                    expect(this.spies[0].executed).toHaveBeenCalled();
                });
            });
            describe("and I call the second item, the registry", function () {
                it("throws an exception", function () {
                    expect(function () {
                        this.registry.call("foo1");
                    }).toThrow();
                });
                it("does not invoke the item function", function () {
                    try {
                        this.registry.call("foo1");
                    } catch (e) {}
                    expect(this.spies[1].executed).not.toHaveBeenCalled();
                });
            });
            describe("and I call the third item, the registry", function () {
                it("invokes the item function", function () {
                    this.registry.call("foo2");
                    expect(this.spies[2].executed).toHaveBeenCalled();
                });
            });
            describe("and I call the fourth item, the registry", function () {
                it("throws an exception", function () {
                    expect(function () {
                        this.registry.call("foo3");
                    }).toThrow();
                });
                it("does not invoke the item function", function () {
                    try {
                        this.registry.call("foo3");
                    } catch (e) {}
                    expect(this.spies[3].executed).not.toHaveBeenCalled();
                });
            });
        });
    });

    function makeSpy(id) {
        var spy = {
            id: id,
            constructed: function () {},
            executed: function () {}
        };
        spyOn(spy, "constructed");
        spyOn(spy, "executed");
        return spy;
    }

    function makeMock(spy) {
        return function mock() {
            spy.constructed();
            return function () {
                spy.executed();
                return spy.id;
            };
        };
    }
});

