(function() {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // ECMAScript 5 내부 IsCallable 함수와
            // 가능한 가장 가까운 것
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
    
        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
    
        if (this.prototype) {
            // Function.prototype은 prototype 속성이 없음
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
    
        return fBound;
        };
    }
})();