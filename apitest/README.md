# API test

## Requirements of a test case

1. The positive context must be tested, including empty response (or no data) context.
2. All the required fileds should be tested.
3. All positive context should be tested by its StatusCode !== 200.

## Positive context vs. Negative context ?

- [谈谈 Negative Testing](https://blog.csdn.net/seagal890/article/details/84947168)

e.g. 

|Negative Testing|Positive Testing|
|--|--|
|如果乘坐電梯的人數（重量）超過了電梯給定的最大限制？ |假設乘坐電梯的人數符合電梯容量（重量）的限制。 |
|當乘客在電梯運行過程中按下了火警按鈕，或者因為抽煙等觸發了火警警報，那麼會發生什麼？ |乘客在乘坐電梯是不會按下火警按鈕，或者不會因為抽煙等觸發火警警報。 |
|當電梯在運行過程中，突然斷電，或發生什麼情況？ |在電梯的運行過程中，不會發生斷電的情況。 |

## Code pattern of a test case

```
const testCases = (db, method, url) => () => {

    // You can define matched data here
    const shouldMatchedData = {};

    // Before test case
    beforeEach(async () => {});

    // Put global vars or functions here
    // ...

    // Positive context
    describe('Positive Testing', () => {
        it('Normal case', async () => {});
        it('Empty data case', async () => {});
        ...
    });

    // Negative context
    describe('Negative Testing', () => {
        it('filed _______ is missing.', async () => {});
        it('field _______ is wrong', async () => {});
        ...
    });

};

```

## Testing methods

- https://mochajs.org/
- https://www.chaijs.com/api/assert/

## Lifecycle of Mocha hooks

```
describe('hooks', function() {
    before(() => {
        // runs once before the first test in this block
    });

    after(() => {
        // runs once after the last test in this block
    });

    beforeEach(() => {
        // runs before each test in this block
    });

    afterEach(() => {
        // runs after each test in this block
    });

    // test cases
});
```
