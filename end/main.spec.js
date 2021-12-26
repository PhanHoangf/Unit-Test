describe('main.js', () => {
    describe('calculate()', () => {
        it('validates expression when first number is invalid', () => {
            spyOn(window, 'updateResult').and.stub();

            calculate('a+3');
            expect(window.updateResult).toHaveBeenCalled()
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized')
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        })

        it('validates expression when second number is invalid', () => {
            spyOn(window, 'updateResult') //.and.stub() is the default, can be omitted;

            calculate('3+a');
            expect(window.updateResult).toHaveBeenCalled()
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized')
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        })

        it('validates expression when operation is invalid', () => {
            spyOn(window, 'updateResult').and.stub();

            calculate('3_4');
            expect(window.updateResult).toHaveBeenCalled()
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized')
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        })

        it('calls add', () => {
            const spy = spyOn(Calculator.prototype, 'add');

            calculate('3 + 4');
            expect(spy).toHaveBeenCalledTimes(2)
            expect(spy).toHaveBeenCalledWith(3)
            expect(spy).toHaveBeenCalledWith(4)

        })

        it('calls subtract', () => {
            const spy = spyOn(Calculator.prototype, 'subtract');

            calculate('3 - 7');
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith(7)
        })

        it('calls multiply', () => {
            const spy = spyOn(Calculator.prototype, 'multiply')
            calculate('3*8');
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith(8)
        })

        it('calls divide', () => {
            const spy = spyOn(Calculator.prototype, 'divide')
            calculate('3/2')
            expect(spy).toHaveBeenCalled()
            expect(spy).not.toHaveBeenCalledWith(3)
            expect(spy).toHaveBeenCalledWith(2)
        })

        xit('validates operation')

        it('calls updateResult (example using and.callThrough)', () => {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();

            calculate('5*5')
            expect(window.updateResult).toHaveBeenCalled()
            expect(window.updateResult).toHaveBeenCalledWith(25)
        })

        it('calls updateResult (example using and.callFake)', () => {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake((number) => {
                return 25
            });

            calculate('5*5')
            expect(window.updateResult).toHaveBeenCalled()
            expect(window.updateResult).toHaveBeenCalledWith(25)
        })

        it('calls updateResult (example using and.returnValue)', () => {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('[multiply] return'); // Same result with callFake

            calculate('5*5')
            expect(window.updateResult).toHaveBeenCalled()
            expect(window.updateResult).toHaveBeenCalledWith('[multiply] return')
        })

        it('calls updateResult (example using and.returnValues)', () => {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 10); // Same result with callFake

            calculate('5+5')
            expect(window.updateResult).toHaveBeenCalled()
            expect(window.updateResult).toHaveBeenCalledWith(10)
        })

        it('does not handle errors', () => {
            spyOn(Calculator.prototype, 'multiply').and.throwError('some error')
            expect(() => {
                calculate('5*5')
            }).toThrowError('some error')
        })
    })

    describe('updateResult()', () => {
        let element;
        beforeAll(() => {
            element = document.createElement('div')
            element.setAttribute('id', 'result')
            document.body.appendChild(element)
        })

        afterAll(() => {
            const element = document.getElementById('result')
            document.body.removeChild(element)
        });

        it('adds result to DOM element', () => {
            updateResult('5')
            expect(element.innerText).toBe('5')
        })

    })

    describe('showVersion()', () => {
        it('calls calculator.version', async () => {
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            })

            let spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve())

            await showVersion()

            expect(spy).toHaveBeenCalled()
        })
    })
})
