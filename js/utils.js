define(function () {
    var _inherits = function(childCtor, parentCtor) {
        /** @constructor */
        function tempCtor() {};
        tempCtor.prototype = parentCtor.prototype;
        childCtor.superClass_ = parentCtor.prototype;
        childCtor.prototype = new tempCtor();
        childCtor.prototype.constructor = childCtor;
    };
    
    function _keycode(event) {
        return event.which ? event.which : event.keyCode;
    }

    return {
        inherits: _inherits,
        keycode: _keycode
    }
});
