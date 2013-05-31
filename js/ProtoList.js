
define(['utils'], function (utils) {

    var ProtoList = function () {
        var self = this
        self.steps = ko.observableArray([]);
    }

    ProtoList.prototype.index = function (step) {
        return this.steps.indexOf(step);
    }

    ProtoList.prototype.elementAt = function (index) {
        return this.steps()[index];
    }

    ProtoList.prototype.length = function () {
        return this.steps().length;
    }

    ProtoList.prototype.selectedindex = function () {
        if (!this.selected()) {
            return undefined;
        }
        return this.index(this.selected());
    }

    ProtoList.prototype.hasprevious = function () {
        return this.selectedindex() !== undefined? this.selectedindex() > 0 : false;
    }

    ProtoList.prototype.hasnext = function () {
        return this.selectedindex() !== undefined? this.selectedindex() < this.length() - 1 : false;
    }

    ProtoList.prototype.getnext = function () {
        return this.elementAt(this.selectedindex() + 1);
    }

    ProtoList.prototype.getprevious = function () {
        return this.elementAt(this.selectedindex() - 1);
    }

    ProtoList.prototype.remove = function (step) {
        return this.steps.remove(step);
    }

    ProtoList.prototype.removeAt = function (position) {
        return this.steps.splice(position, 1);
    }

    ProtoList.prototype.selected = function () {
        var i, length;
        length = this.length();
        for (i = 0; i < length; i++) {
            if (this.elementAt(i).isediting()) {
                return this.elementAt(i);
            }
        }
        return null;
    }

    ProtoList.prototype.select = function (step) {
        var old = this.selected();
        if (old != step) {
            if (old) {
                this.deselect(old);
            }
            if (step) {
                step.startediting();
            }
        }
        return step;
    }

    ProtoList.prototype.deselect = function (step) {
        step.stopediting();
        if (step.isempty()) {
            this.remove(step);
        }
    }

    ProtoList.prototype.next = function (insert) {
        if (!insert && this.hasnext()) {
            return this.select(this.getnext());
        } else {
            return this.newstep(this.selectedindex()+1, '');
        }
    }

    ProtoList.prototype.previous = function (insert) {
        if (!insert && this.hasprevious()) {
            return this.select(this.getprevious());
        } else {
            return this.newstep(this.selectedindex(), '');
        }
    }

    ProtoList.prototype.createtab = function() {
        if (this.hasprevious()) {
            var previous = this.getprevious();
            var selected = this.selected();
            previous.addtabrow(selected.value());
            this.remove(selected);
        }
    }

    // listener steplist functions

    ProtoList.prototype.click = function (step) {
        this.select(step);
    }

    ProtoList.prototype.blur = function (step) {
        if (step == this.selected()) {
            this.deselect(step);
        }
    }

    ProtoList.prototype.keyval = function (step, event) {
        if (utils.keycode(event) == 13) {
            if (this.selected() == null) {
                this.select(step);
            }
            event.preventDefault();
            if (event.shiftKey) {
                this.previous(event.ctrlKey);
            } else {
                this.next(event.ctrlKey);
            }
            return false;
        } else if (utils.keycode(event) == 9) {
            event.preventDefault();
            this.createtab(this, event.shiftKey, event.ctrlKey);
            return false;
        }
        return true;
    }

    return ProtoList;
});

