define(['ProtoStep', 'utils'], function (ProtoStep, utils) {
    var ValuedStep = function (value, listener) {
        ProtoStep.call(this, listener);
        this.value = ko.observable(value);
        this.isediting = ko.observable(false);
        this.hasfocus = ko.observable(false);
    }

    utils.inherits(ValuedStep, ProtoStep);

    ValuedStep.prototype.startediting = function () {
        this.isediting(true);
        this.hasfocus(true);
    }

    ValuedStep.prototype.stopediting = function () {
        this.isediting(false);
    }

    ValuedStep.prototype.click = function() {
        this.listener.click(this);
    }

    ValuedStep.prototype.blur = function() {
        this.listener.blur(this);
    }

    ValuedStep.prototype.keyval = function(element, event) {
        return this.listener.keyval(this, event);
        
    }

    ValuedStep.prototype.isempty = function () {
        return !this.value().replace(/^\s+|\s+$/g, '')
    }

    return ValuedStep;
});
