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
            }).always(function () {
                self.ajaxloading(false);
            });
        }

    }

    Step.prototype.keyval = function(element, event) {
        if (!event.shiftKey && utils.keycode(event) == 13 && this.table.length() > 0) {
            event.preventDefault();
            this.table.select(this.table.elementAt(0));
            this.stopediting();
            return false;
        }
        return Step.superClass_.keyval.call(this, element, event);
    }

    return Step;
});

