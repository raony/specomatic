define(['Table', 'ValuedStep', 'utils'], function (Table, ValuedStep, utils) {
    var Step = function (value, listener) {
        ValuedStep.call(this, value, listener);
        this.table = new Table(this, listener);
        this.ajaxloading = ko.observable(false);
    }

    utils.inherits(Step, ValuedStep);

    Step.prototype.startediting = function () {
        Step.superClass_.startediting.call(this); 
        $('.step').autocomplete({
          source: '/ajax/search/'
        });
    }

    Step.prototype.stopediting = function () {
        var self = this
        Step.superClass_.stopediting.call(self); 
        if (self.table.length() == 0) {
            self.ajaxloading(true);
            $.getJSON('/ajax/table/', {term: self.value()}, function (data) {
                $.each(data, function (key,val) {
                    var values = [];
                    $.each(val, function(index, desc) {
                        values.push(desc);
                    });
                    self.table.addrow(values, self.table.length()); 
                });
            }).always(function () {self.ajaxloading(false);});
        }

    }

    return Step;
});

