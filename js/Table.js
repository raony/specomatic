define(['ProtoList', 'Header', 'Row', 'utils'], function (ProtoList, Header, Row, utils) {

    var Table = function(parentstep, prelistener) {
        ProtoList.call(this);
        this.prelistener = prelistener;
        this.parentstep = parentstep;
    }
    utils.inherits(Table, ProtoList);

    Table.prototype.previous = function (insert) {
        if (this.selectedindex() == 0) {
            return this.elementAt(0);
        }
        Table.superClass_.previous.call(this, insert);
    }

    Table.prototype.addrow = function (cellvalues, position) {
        var step;
        var columnnumber = this.getcolumnnumber();
        if (this.length() == 0) {
            step = new Header(this, cellvalues);
        } else {
            step = new Row(this, columnnumber);
            var i;
            for (var i = 0; i < cellvalues.length; i++) {
                if (i < columnnumber) {
                    step.elementAt(i).value(cellvalues[i]);
                }
            }
        }
        this.steps.splice(position !== undefined ? position : this.length(), 0, step);
        this.select(step); 
        return step;
    }

    Table.prototype.newstep = function (position, value) {
        row = this.addrow([value], position);
        this.select(row);
        return row;
    }

    Table.prototype.getcolumnnumber = function() {
        return this.length()> 0? this.elementAt(0).length() : 1; 
    }

    Table.prototype.foreachrow = function (func) {
        var i;
        var length = this.length();
        var toberemoved = [];
        var remove = function(row) {
            toberemoved.push(row);
        }
        for (i = 1; i < length; i++) {
            func(this.elementAt(i), remove);
        }
        if (toberemoved.length > 0) {
            for (i = 0; i < toberemoved.length; i++) {
                this.remove(toberemoved[i]);
            }
        }
    }

    Table.prototype.syncnewstep = function (position, value) {
        this.foreachrow(function (row) {
            row._addstep(position, value);
        });
    }

    Table.prototype.syncremovestep = function (position) {
        this.foreachrow(function (row, remove) {
            row.removeAt(position);
            if (row.length() == 0) {
                remove(row);
            }
        });
    }

    Table.prototype.blur = function (step, cell) {
        var step_sel = step.selected();
        if (step_sel == null || step_sel == cell) {
            Table.superClass_.blur.call(this, step);
        }
    }

    Table.prototype.keyval = function (step, event) {
        if (utils.keycode(event) == 13 && step.isempty() && this.index(step) == this.length()-1) {
            return this.prelistener.keyval(this.parentstep, event);
        } else {
            return Table.superClass_.keyval.call(this, step, event);
        }
    }

    return Table;
});
