define(['BaseRow', 'utils'], function (BaseRow, utils) {

    var Header = function(prelistener, columnnumber) {
        BaseRow.call(this, prelistener, columnnumber);
    }
    utils.inherits(Header, BaseRow);

    Header.prototype.newstep = function (position, value) {
        result = Header.superClass_.newstep.call(this, position, value); 
        this.prelistener.syncnewstep(position, value);
        return result;
    }

    Header.prototype.remove = function (step) {
        index = this.index(step);
        Header.superClass_.remove.call(this, step); 
        this.prelistener.syncremovestep(index);
        if (this.length() == 0) {
            this.stopediting();
        }
    }

    return Header;
});
