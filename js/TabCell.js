define(['ValuedStep', 'utils'], function (ValuedStep, utils) {
    var TabCell = function (value, listener) {
        ValuedStep.call(this, value, listener);

        this.isfirst = ko.computed(function () {
            return this.listener.index(this) == 0;
        }, this);
    }
    utils.inherits(TabCell, ValuedStep);

    return TabCell;
});


