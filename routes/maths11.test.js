const sum12 = require('./maths11');

test('jingSYNC TESTING sum ', () => {
    expect(sum12(1, 12)).toBe(13);
});

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    });
});

// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
// https://github.com/prashant1k99/JWT-example/blob/main/routes/posts/__tests__/posts.test.js