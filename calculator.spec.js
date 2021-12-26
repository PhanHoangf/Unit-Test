describe('Calculator.js', () => {
    let calculator;
    let calculator2;

    describe('Calculator', () => {
        beforeEach(() => {
            calculator = new Calculator()
            calculator2 = new Calculator()
        })

        afterEach(() => {

        })

        it('should initialize the total', () => {
            expect(calculator.total).toBe(0)
        })

        it('should have constructor', () => {
            jasmine.addMatchers(customMatchers)

            expect(calculator).toBeCalculator()
            expect(calculator).toBeTruthy()
            expect(calculator2).toBeTruthy()
        })

        it('instantiates unique object', () => {
            expect(calculator).not.toBe(calculator2)
        })

        it('has common operations', () => {
            expect(calculator.add).toBeDefined() // = .not.toBeUndefined
            expect(calculator.subtract).toBeDefined()
            expect(calculator.multiply).toBeDefined()
            expect(calculator.divide).toBeDefined()
        })

        it('can overwrite total', () => {
            calculator.total = null
            expect(calculator.total).toBeNull()
        })

        describe('add()', () => {
            it('should add numbers to total', () => {
                calculator.add(5);
                expect(calculator.total).toBe(5)
            })

            it('returns total', () => {
                calculator.total = 50

                expect(calculator.add(20)).toBe(70)
                expect(calculator.total).toMatch(/-?\d+/)
                expect(calculator.total).toBeNumber

                expect(calculator.total).toEqual(jasmine.anything())
            })
        })

        describe('subtract()', () => {
            it('should subtract numbers from total', () => {
                calculator.total = 30
                calculator.subtract(5);
                expect(calculator.total).toEqual(25)
            })
        })

        describe('multiply()', () => {
            it('should multiply total by numbers', () => {
                calculator.total = 100
                calculator.multiply(2);
                expect(calculator.total).toEqual(200)
            })

            it('does not handle NaN', () => {
                calculator.total = 20;
                calculator.multiply('a')

                expect(calculator.total).toBeNaN()
            })
        })

        describe('divide()', () => {
            it('should divine total by numbers', () => {
                calculator.total = 200
                calculator.divide(2)
                expect(calculator.total).toEqual(100)
            })

            it('handle divide by zero', () => {
                expect(() => calculator.divide(0)).toThrow();
                expect(() => calculator.divide(0)).toThrowError(Error);
                expect(() => calculator.divide(0)).toThrowError(Error, 'Cannot divide by zero');
            })
        })

        describe('get version', () => {
            it('fetches version from external source', async () => {
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                    new Response('{"version": "0.1"}')
                ));

                const version = await calculator.version;
                expect(version).toBe('0.1')
            })
        })

    })
})
