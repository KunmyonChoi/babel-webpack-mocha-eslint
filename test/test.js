var should = require('should');

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', function() {
            [1,2,3].indexOf(4).should.be.exactly(-1);
        });
    });
});
