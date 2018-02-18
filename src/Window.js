export default class Window {
    constructor(element, calculator) {
        this._element = element;
        this._display = element.querySelector('.calculator__input-text');
        this._calculator = calculator;
        this._bindEvents();
        this._calculator.clear();
    }

    _bindEvents() {
        this._element.addEventListener('click', this.onClickCalcBtn.bind(this), false); 
        this._calculator.on('update', this.onUpdateCalculator.bind(this));
        this._calculator.on('finish', this.onFinishCalculator.bind(this));
    }

    onClickCalcBtn(event) {
        event.preventDefault();
        event.stopPropagation();
        const targetBtn = event.target || event.srcElement;
        const val = targetBtn.getAttribute('data-val');
        if (val) {
            switch (val) {
                case 'r':
                    this._calculator.clear();
                    break;
                case '=':
                    this._calculator.evaluate();
                    break;
                default:
                    this._calculator.update(val);
                    break;
            }
        }
    }

    onUpdateCalculator() {
        const val = this.formatExpression(this._calculator.getExpression());
        this._display.innerHTML = val;
    }

    onFinishCalculator() {
        this._display.innerHTML = this.formatNumber(this._calculator.result);
    }

    formatExpression (expression) {
        const expressionLength = expression.length;
        for(let i = 0; i < expressionLength; i++) {
            if (!isNaN(parseFloat(expression[i]))) {
                expression[i] = this.formatNumber(expression[i]);
            }
        }
        return expression.join('');
    }

    formatNumber (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
};