define(['BaseRow', 'utils'], function (BaseRow, utils) {

    var Row = function(prelistener, columnnumber) {
        BaseRow.call(this, prelistener, columnnumber);
    }
    utils.inherits(Row, BaseRow);

    Row.prototype.next = function (insert) {
        if (this.hasnext()) {
            return this.select(this.getnext());
        } else {
            return this.select(this.elementAt(0));
        }
    }

    Row.prototype.previous = function (insert) {
        if (this.hasprevious()) {
            return this.select(this.getprevious());
        } else {
            return this.select(this.elementAt(this.length()-1));
        }
    }

    Row.prototype.deselect = function (step) {
        if (step) {
            step.stopediting();
        }
    }

    return Row;
});

