
define(['ProtoList', 'TabCell', 'utils'], function (ProtoList, TabCell, utils) {

    var BaseRow = function(prelistener, columns) {
        ProtoList.call(this);
        this.prelistener = prelistener;
        if (columns instanceof Array) {
            for (var i = columns.length-1; i >= 0; i--) {
                this._addstep(0, columns[i]);
            }
        } else if (typeof columns === 'number') {
            for (var i = 0; i < columns; i++) {
                this._addstep(0, '');
            }
        }
    }
    utils.inherits(BaseRow, ProtoList);

    BaseRow.prototype.select = function (step) {
        BaseRow.superClass_.select.call(this, step);
        if (this.prelistener) {
            this.prelistener.select(this);
        }
    }

    BaseRow.prototype._addstep = function (position, value) {
        var step = new TabCell(value, this);
        this.steps.splice(position, 0, step);
        return step;
    }

    BaseRow.prototype.newstep = function (position, value) {
        var step = this._addstep(position, value);
        this.select(step);
        return step;
    }

    BaseRow.prototype.isempty = function () {
        var i = 0;
        var length = this.steps().length;
        var cellempty = true;
        for (i = 0; i < length; i++) {
            cellempty = cellempty && (this.steps()[i].isempty());
        }
        return (this.steps().length == 0) || cellempty;
    }

    BaseRow.prototype.startediting = function (position) {
        if (this.selected() || this.length() == 0) {
            return;
        }
        if (!position) {
            position = 0;
        }
        if (position > this.length() - 1) {
            position = this.length() - 1;
        }
        this.select(this.elementAt(position));
    }

    BaseRow.prototype.isediting = function () {
        return this.selected() != null;
    }

    BaseRow.prototype.stopediting = function () {
        var selected = this.selected();
        if (selected) {
            this.deselect(selected);
        }
    }

    // listener steplist functions

    BaseRow.prototype.click = function (step) {
        BaseRow.superClass_.click.call(this, step);
        this.prelistener.click(this);
    }

    BaseRow.prototype.blur = function (step) {
        this.prelistener.blur(this, step);
        BaseRow.superClass_.blur.call(this, step);
    }

    BaseRow.prototype.keyval = function (step, event) {
        if (utils.keycode(event) == 9) {
            event.preventDefault();
            if (event.shiftKey) {
                this.previous(event.ctrlKey);
            } else {
                this.next(event.ctrlKey);
            }
            return false;
        } else if (utils.keycode(event) == 13) {
            return this.prelistener.keyval(this, event);
        }
        return true;
    }

    return BaseRow;
});

