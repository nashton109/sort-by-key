/**
 * Provides the tests for the SortBy functions.
 *
 * @author Nic Ashton <nic.ashton109@gmail.com>
 */

'use strict';

const test = require('unit.js');

require('../lib/SortByKey').attach();

/** @test {SortByKey} */
describe('SortByKey', () => {
    /** @test {Array#sortByKey} */
    describe('Array.sortByKey()', () => {
        it('should have sortBy function', () => {
            test.bool(typeof Array.sortByKey === 'function').isTrue();
        });

        it('should sort by key', () => {
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

            Array.sortByKey(data, 'weight');
            test.array(data).is([{
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

        it('should sort using a function', () => {
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

            Array.sortByKey(data, 'weight');
            test.array(data).is([{
                text: 'foo',
                weight: weightFnc2
            }, {
                text: 'hello'
            }, {
                text: 'world',
                weight: weightFnc
            }]);
        });

        it('should sort in reverse', () => {
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

            Array.sortByKey(data, 'weight', true);
            test.array(data).is([{
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
    });

    /** @test {Array#sortByKey} */
    describe('Array.prototype.sortByKey()', () => {
        it('should have sortBy function', () => {
            const data = [];
            test.bool(typeof data.sortByKey === 'function').isTrue();
        });

        it('should sort by key', () => {
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

            data.sortByKey('weight');
            test.array(data).is([{
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

        it('should sort using a function', () => {
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

            data.sortByKey('weight');
            test.array(data).is([{
                text: 'foo',
                weight: weightFnc2
            }, {
                text: 'hello'
            }, {
                text: 'world',
                weight: weightFnc
            }]);
        });

        it('should sort in reverse', () => {
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

            data.sortByKey('weight', true);
            test.array(data).is([{
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
    });

    /** @test {Object#sortByKey} */
    describe('Object.sortByKey()', () => {
        it('should have sortBy function', () => {
            test.bool(typeof Object.sortByKey === 'function').isTrue();
        });

        it('should sort by key', () => {
            const data = {
                world: 'world',
                hello: { weight: -1 },
                foo: { weight: 1 },
                bar: { weight: 1 }
            };

            Object.sortByKey(data, 'weight');
            test.object(data).is({
                hello: { weight: -1 },
                world: 'world',
                foo: { weight: 1 },
                bar: { weight: 1 }
            });
        });

        it('should skip functions', () => {
            const fnc = function() {};
            const data = {
                world: 'world',
                hello: { weight: -1 },
                foo: 'bar',
                func: fnc,
                bar: { weight: 1 }
            };

            Object.sortByKey(data, 'weight');
            test.object(data).is({
                func: fnc,
                hello: { weight: -1 },
                world: 'world',
                foo: 'bar',
                bar: { weight: 1 }
            });
        });

        it('should sort by function result', () => {
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

            Object.sortByKey(data, 'weight');
            test.object(data).is({
                hello: { weight: weightFnc },
                world: 'world',
                foo: { weight: weightFnc2 }
            });
        });

        it('sould sort in reverse', () => {
            const data = {
                hello: { weight: -1 },
                world: 'world',
                foo: { weight: 1 }
            };

            Object.sortByKey(data, 'weight', true);
            test.object(data).is({
                foo: { weight: 1 },
                world: 'world',
                hello: { weight: -1 }
            });
        });
    });

    /** @test {Object#sortByKey} */
    describe('Object.prototype.sortByKey()', () => {
        it('should have sortBy function', () => {
            const data = {};
            test.bool(typeof data.sortByKey === 'function').isTrue();
        });

        it('should sort by key', () => {
            const data = {
                world: 'world',
                hello: { weight: -1 },
                foo: { weight: 1 },
                bar: { weight: 1 }
            };

            data.sortByKey('weight');
            test.object(data).is({
                hello: { weight: -1 },
                world: 'world',
                foo: { weight: 1 },
                bar: { weight: 1 }
            });
        });

        it('should skip functions', () => {
            const fnc = function() {};
            const data = {
                world: 'world',
                hello: { weight: -1 },
                foo: 'bar',
                func: fnc,
                bar: { weight: 1 }
            };

            data.sortByKey('weight');
            test.object(data).is({
                func: fnc,
                hello: { weight: -1 },
                world: 'world',
                foo: 'bar',
                bar: { weight: 1 }
            });
        });

        it('should sort by function result', () => {
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

            data.sortByKey('weight');
            test.object(data).is({
                hello: { weight: weightFnc },
                world: 'world',
                foo: { weight: weightFnc2 }
            });
        });

        it('sould sort in reverse', () => {
            const data = {
                hello: { weight: -1 },
                world: 'world',
                foo: { weight: 1 }
            };

            data.sortByKey('weight', true);
            test.object(data).is({
                foo: { weight: 1 },
                world: 'world',
                hello: { weight: -1 }
            });
        });
    });
});