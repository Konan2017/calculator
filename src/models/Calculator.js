export default class calculator {
    constructor() {
        this._listeners = {};
        this.calcArr = ['0'];
        this.result = null;
    }
    /**
     * 입력된 값에 따라 추가 또는 업데이트 한다.
     * @param {string} val
     */
    update(val) {
        if (!this._checkValidVal(val)) return false;
        const newVal = val;
        const newType = this._checkType(newVal);
        const lastVal = this._getLastVal();
        const lastInputType = this._checkType(lastVal);

        if (lastInputType === 'operand' && newType === 'operand') {
            if (
                ( (lastVal.indexOf('.') > -1) && (lastVal.split('.')[1].length < 5) )
                || ( (lastVal.indexOf('.') === -1) && (lastVal.length < 10) )
            ) {
                this._updateLastVal(newVal === '.' ? `${lastVal}${newVal}` : parseFloat(`${lastVal}${newVal}`));
            }
        } else if (lastInputType === 'operand' && newType === 'operator') {
            this._push(newVal);
        } else if (lastInputType === 'operator' && newType === 'operand') {
            this._push(newVal === '.' ? '0.' : newVal);
        } else if (lastInputType === 'operator' && newType === 'operator') {
            this._updateLastVal(newVal);
        }
        this._eventfire('update');
    }
    /**
     * 이벤트를 바인딩한다.
     * @param {string} name
     * @param {function} listener
     */
    on(name, listener) {
        if (!this._listeners[name]) {
        this._listeners[name] = [];
        }
        this._listeners[name].push(listener);
    }
    /**
     * 입력된 값들을 평가한다.
     */
    evaluate() {
        let rawData = null;
        const lastVal = this._getLastVal();
        const lastInputType = this._checkType(lastVal);
        if (this.calcArr.length < 2) throw new Error('하나 이상의 연산이 필요합니다.');
        if (lastInputType === 'operator') throw new Error('피연산자가 필요합니다.');
        if (this.result) {
            const calcArrLength = this.calcArr.length;
            rawData = eval(`${this.result}${this.calcArr[calcArrLength-2]}${this.calcArr[calcArrLength-1]}`);
        } else {
            rawData = eval(this.calcArr.join(''));
        }
        this.result = this._cutInfiveDemicalPlace(rawData);
        this._eventfire('finish');
    }
    /**
     * 값들을 초기화한다.
     */
    clear() {
        this.calcArr = ['0'];
        this.result = null;
        this._eventfire('update');
    }
    /**
     * 연산식을 반환한다.
     */
    getExpression() {
        return this.calcArr.slice(0);
    }
    /**
     * 입력된 값이 유효한 값인지 검사한다.
     * @param {string} val
     * @private
     */
    _checkValidVal(val) {
        return !!(val && val.match(/[0-9\.\+\-\/\*\=r]/));
    }
    /**
     * 입력된 값의 타입을 검사한다.
     * @param {string} val
     * @private
     */
    _checkType(val) {
        return (val === '.' || !isNaN(parseInt(val))) ? 'operand' : 'operator';
    }
    /**
     * 마지막 값을 반환한다.
     * @private
     */
    _getLastVal() {
        return this.calcArr[this.calcArr.length - 1];
    }
    /**
     * 입력된 값을 평가 후보자에 추가한다.
     * @param {string} val
     * @private
     */
    _push(val) {
        this.calcArr.push(val);
    }
    /**
     * 마지막값을 업데이트한다.
     * @param {string} val
     * @private
     */
    _updateLastVal(val) {
        this.calcArr[this.calcArr.length - 1] = val + '';
    }
    /**
     * 입력된 값을 소수점 5자리까지만 자른다.
     * @param {string} val
     * @private
     */
    _cutInfiveDemicalPlace(val) {
        return parseFloat(val.toFixed(5));
    }
    /**
     * 이벤트를 발화한다.
     * @param {string} name
     * @param {*} rest
     * @private
     */
    _eventfire(name, ...rest) {
        if (this._listeners[name]) {
            const listeners = this._listeners[name];
            for(let i = 0, n = listeners.length; i < n; i++) {
                listeners[i].apply(null, rest);
            }
        }
    }
};
