/**
 * Provides the tests for the SortBy functions.
 *
 * @author Nic Ashton <nic.ashton109@gmail.com>
 */

'use strict';

const unitjs = require('unit.js');

const sortByKey = require('../lib/SortByKey');

/** @test {SortByKey} */
describe('SortByKey', () => {
    /** @test {sortByKey} */
    describe('sortByKey()', () => {
        it('should sort array by key', () => {
            const data = [{
                text: 'world',
                weight: 1
            }, {
                text: 'hello'
            }, {
                text: 'foo',
                weight: 10
            }, {
                text: 'foo',
                weight: 10
            }, {
                text: 'bar',
                weight: -11
            }, {
                text: 'goodbye',
                weight: 5
            }];

            sortByKey(data, 'weight');
            unitjs.array(data).is([{
                text: 'bar',
                weight: -11
            }, {
                text: 'hello'
            }, {
                text: 'world',
                weight: 1
            }, {
                text: 'goodbye',
                weight: 5
            }, {
                text: 'foo',
                weight: 10
            }, {
                text: 'foo',
                weight: 10
            }]);
        });

        it('should sort array using a function', () => {
            const weightFnc = function() {
                return 1;
            };
            const weightFnc2 = function() {
                return -1;
            };
            const data = [{
                text: 'world',
                weight: weightFnc
            }, {
                text: 'hello'
            }, {
                text: 'foo',
                weight: weightFnc2
            }];

            sortByKey(data, 'weight');
            unitjs.array(data).is([{
                text: 'foo',
                weight: weightFnc2
            }, {
                text: 'hello'
            }, {
                text: 'world',
                weight: weightFnc
            }]);
        });

        it('should sort array in reverse', () => {
            const data = [{
                text: 'world'
            }, {
                text: 'hello',
                weight: 1
            }, {
                text: 'foo',
                weight: -1
            }, {
                text: 'bar',
                weight: 100
            }];

            sortByKey(data, 'weight', true);
            unitjs.array(data).is([{
                text: 'bar',
                weight: 100
            }, {
                text: 'foo',
                weight: -1
            }, {
                text: 'hello',
                weight: 1
            }, {
                text: 'world'
            }]);
        });

        it('should sort object by key', () => {
            const data = {
                world: 'world',
                foo: { weight: 1 },
                hello: { weight: -1 },
                bar: { weight: 1 }
            };

            sortByKey(data, 'weight');
            unitjs.object(data).is({
                hello: { weight: -1 },
                world: 'world',
                foo: { weight: 1 },
                bar: { weight: 1 }
            });

            const keys = Object.keys(data);
            unitjs.string(keys[0]).is('hello');
            unitjs.string(keys[1]).is('world');
            unitjs.string(keys[2]).is('foo');
            unitjs.string(keys[3]).is('bar');
        });

        it('should skip object functions', () => {
            const fnc = function() {};
            const data = {
                world: 'world',
                hello: { weight: -1 },
                foo: 'bar',
                func: fnc,
                bar: { weight: 1 }
            };

            sortByKey(data, 'weight');
            unitjs.object(data).is({
                func: fnc,
                hello: { weight: -1 },
                world: 'world',
                foo: 'bar',
                bar: { weight: 1 }
            });
        });

        it('should sort object by function result', () => {
            const weightFnc = function() {
                return -1;
            };
            const weightFnc2 = function() {
                return 1;
            };
            const data = {
                world: 'world',
                hello: { weight: weightFnc },
                foo: { weight: weightFnc2 }
            };

            sortByKey(data, 'weight');
            unitjs.object(data).is({
                hello: { weight: weightFnc },
                world: 'world',
                foo: { weight: weightFnc2 }
            });
        });

        it('sould sort object in reverse', () => {
            const data = {
                hello: { weight: -1 },
                world: 'world',
                foo: { weight: 1 }
            };

            sortByKey(data, 'weight', true);
            unitjs.object(data).is({
                foo: { weight: 1 },
                world: 'world',
                hello: { weight: -1 }
            });
        });
    });
});