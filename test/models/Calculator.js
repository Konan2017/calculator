import {assert} from 'chai';
import sinon from 'sinon';
import Calculator from '../../src/models/Calculator';

describe('Test of calculator', function() {
    describe('# Init calculator', function() {
        it('객체 초기화 시 최초의 피연산자 0이 입력된다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            // Then
            assert.equal(calculator.calcArr[0], 0);
        });
    });

    describe('Input test', () => {
        it('피연산자로 0 ~ 9를 입력할 수 있다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('1');
            calculator.update('2');
            calculator.update('3');
            calculator.update('4');
            calculator.update('5');
            calculator.update('6');
            calculator.update('7');
            calculator.update('8');
            calculator.update('9');
            calculator.update('0');
            // Then
            assert.equal(calculator.calcArr[0], 1234567890);
          });
      
          it('피연산자로 문자를 입력하면 무시된다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('1');
            calculator.update('2');
            calculator.update('A');
            calculator.update('0');
            // Then
            assert.equal(calculator.calcArr[0], 120);
          });
      
          it('피연산자로 소수점을 입력할 수 있다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('1');
            calculator.update('2');
            calculator.update('.');
            calculator.update('1');
            // Then
            assert.equal(calculator.calcArr[0], 12.1);
          });
        it('"." 이후 피연산자는 5자리 까지만 연속으로 입력 가능하다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('1');
            calculator.update('.');
            calculator.update('1');
            calculator.update('2');
            calculator.update('3');
            calculator.update('4');
            calculator.update('5');
            calculator.update('6');
            // Then
            assert.equal(calculator.calcArr[0], 1.12345);
        });
        it('정수는 최대 10자리 까지만 입력이 가능하다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            calculator.update('9');
            // Then
            assert.equal(calculator.calcArr[0], 9999999999);
        });
        it('+, -, *, / 연산자를 입력할 수 있다.', () => {
            // Given
            const calculatorAdd = new Calculator();
            const calculatorSub = new Calculator();
            const calculatorMul = new Calculator();
            const calculatorDiv = new Calculator();
            // When
            calculatorAdd.update('+');
            calculatorSub.update('-');
            calculatorMul.update('*');
            calculatorDiv.update('/');
            // Then
            assert.equal(calculatorAdd.calcArr[1], '+');
            assert.equal(calculatorSub.calcArr[1], '-');
            assert.equal(calculatorMul.calcArr[1], '*');
            assert.equal(calculatorDiv.calcArr[1], '/');
        });
        it('연산자가 연속으로 입력될 경우 입력된 연산자로 replace된다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('+');
            calculator.update('-');
            calculator.update('*');
            calculator.update('/');
            // Then
            assert.equal(calculator.calcArr[1], '/');
        });
        it('인풋시에 저장되어 있는 피연산자가 0이고 0~9가 입력되면 0이 replace된다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('0');
            calculator.update('0');
            calculator.update('2');
            // Then
            assert.equal(calculator.calcArr[0], 2);
        });
    });

    describe('Calculate test', () => {
        it('평가 시 입력된 값들이 연산순서에 의거하여 계산된다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('2');
            calculator.update('+');
            calculator.update('4');
            calculator.update('*');
            calculator.update('2');
            calculator.evaluate();
            // Then
            assert.equal(calculator.result, 10);
        });
        it('평가 시 연산자가 없으면 에러가 발생한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('2');
            // Then
            assert.throws(() => calculator.evaluate(), '하나 이상의 연산이 필요합니다.');
        });
        it('평가 시 마지막 값이 피연산자가 아니라면 에러가 발생한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('2');
            calculator.update('+');
            // Then
            assert.throws(() => calculator.evaluate(), '피연산자가 필요합니다.');
        });
        it('연산 결과는 소수점 5자리 까지만 반올림하여 표현한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('2');
            calculator.update('/');
            calculator.update('3');
            calculator.evaluate();
            // Then
            assert.equal(calculator.result, 0.66667);
        });
        it('연산 종료 후 평가를 실행하면 결과값을 좌측 피연산자로 연산을 반복 한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('2');
            calculator.update('*');
            calculator.update('3');
            calculator.evaluate();
            calculator.evaluate();
            calculator.evaluate();
            // Then
            assert.equal(calculator.result, 54);
        });
    });
    
    describe('Help method test', () => {
        it('입력된 값이 [0~9,".",+,-,*,/,=,r]인지 검증한다.', () => {
            // Given
            const calculator = new Calculator();
            //Then
            assert.isTrue(calculator._checkValidVal('0'));
            assert.isTrue(calculator._checkValidVal('1'));
            assert.isTrue(calculator._checkValidVal('2'));
            assert.isTrue(calculator._checkValidVal('3'));
            assert.isTrue(calculator._checkValidVal('4'));
            assert.isTrue(calculator._checkValidVal('5'));
            assert.isTrue(calculator._checkValidVal('6'));
            assert.isTrue(calculator._checkValidVal('7'));
            assert.isTrue(calculator._checkValidVal('8'));
            assert.isTrue(calculator._checkValidVal('9'));
            assert.isTrue(calculator._checkValidVal('.'));
            assert.isTrue(calculator._checkValidVal('+'));
            assert.isTrue(calculator._checkValidVal('-'));
            assert.isTrue(calculator._checkValidVal('*'));
            assert.isTrue(calculator._checkValidVal('/'));
            assert.isTrue(calculator._checkValidVal('='));
            assert.isTrue(calculator._checkValidVal('r'));
            assert.isFalse(calculator._checkValidVal('A'));
            assert.isFalse(calculator._checkValidVal('^'));
            assert.isFalse(calculator._checkValidVal('%'));
        });

        it('입력된 값이 operand인지 operator인지 판단한다.', () => {
            // Given
            const calculator = new Calculator();
            //Then
            assert.equal(calculator._checkType('0'), 'operand');
            assert.equal(calculator._checkType('1'), 'operand');
            assert.equal(calculator._checkType('2'), 'operand');
            assert.equal(calculator._checkType('3'), 'operand');
            assert.equal(calculator._checkType('4'), 'operand');
            assert.equal(calculator._checkType('5'), 'operand');
            assert.equal(calculator._checkType('6'), 'operand');
            assert.equal(calculator._checkType('7'), 'operand');
            assert.equal(calculator._checkType('8'), 'operand');
            assert.equal(calculator._checkType('9'), 'operand');
            assert.equal(calculator._checkType('.'), 'operand');
            assert.equal(calculator._checkType('+'), 'operator');
            assert.equal(calculator._checkType('-'), 'operator');
            assert.equal(calculator._checkType('*'), 'operator');
            assert.equal(calculator._checkType('/'), 'operator');
        });

        it('마지막 값을 반환한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.update('2');
            calculator.update('*');
            calculator.update('3');
            calculator.update('4');
            //Then
            assert.equal(calculator._getLastVal(), 34);
        });

        it('평가될 평가식의 마지막에 값을 추가한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator._push('2');
            calculator._push('+');
            calculator._push('4');
            //Then
            assert.equal(calculator.calcArr[calculator.calcArr.length - 1], 4);
        });

        it('평가식의 마지막 값을 업데이트한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator._push('2');
            calculator._push('+');
            calculator._push('4');
            calculator._updateLastVal('45');
            //Then
            assert.equal(calculator.calcArr[calculator.calcArr.length - 1], 45);
        });

        it('입력된 값을 소수점 5자리까지 반올림하여 반환한다.', () => {
            // Given
            const calculator = new Calculator();
            //Then
            assert.equal(calculator._cutInfiveDemicalPlace(0.1234567), 0.12346);
        });

        it('이벤트 리스너를 등록한다.', () => {
            // Given
            const calculator = new Calculator();
            // When
            calculator.on('update', () => {});
            calculator.on('evaluate', () => {});
            //Then
            assert.isTrue(!!calculator._listeners.update);
            assert.isTrue(!!calculator._listeners.evaluate);
        });

        it('등록된 이벤트들을 발화한다.', () => {
            // Given
            const spyUpdate = sinon.spy();
            const spyEvaluate = sinon.spy();
            const calculator = new Calculator();
            calculator.on('update', spyUpdate);
            calculator.on('evaluate', spyEvaluate);
            // When
            calculator._eventfire('update');
            calculator._eventfire('update');
            calculator._eventfire('evaluate');
            //Then
            assert.equal(spyUpdate.callCount, 2);
            assert.equal(spyEvaluate.callCount, 1);
        });
    });
});























