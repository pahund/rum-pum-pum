/**
 * registry-spec.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14 Apr 2015
 */
/* global describe, beforeEach, spyOn, it, expect */
define([
    "app/util/registry"
], function (
    registry
) {
    "use strict";

    describe("When I instantiate a registry with no arguments", function () {
        beforeEach(function () {
            this.registry = registry();
        });
        describe("and I get an item that has not been registered", function () {
            beforeEach(function () {
                this.mock = mockf();
                spyOn(this.mock, "constructor").and.callThrough();
                this.registry.get("mock", this.mock.constructor);
            });
            describe("and I get the item again, the registry", function () {
                it("returns the item", function () {
                    var item = this.registry.get("mock");
                    expect(item()).toBe("MOCK");
                });
            });
            describe("the registry", function () {
                it("invokes the item's constructor", function () {
                    expect(this.mock.constructor).toHaveBeenCalled();
                });
            });
        });
        describe("and I get 101 items that have not been registered", function () {
            beforeEach(function () {
                var i;
                for (i = 0; i < 101; i++) {
                    this.registry.get("mock" + i, mockf(i).constructor);
                }
            });
            describe("and I get each item again, the registry", function () {
                it("returns the correct item", function () {
                    var item, i;
                    for (i = 0; i < 101; i++) {
                        item = this.registry.get("mock" + i);
                        expect(item()).toBe("MOCK" + i);
                    }
                });
            });
        });
    });

    function mockf(index) {
        return {
            constructor: function () {
                return function () {
                    return "MOCK" + (typeof index === "undefined" ? "" : index);
                };
            }
        };
    }
});
