define(function () {
    var ProtoStep = function ( listener ) {
        this.listener = listener;
    };

    ProtoStep.prototype.addtabrow = function (cellvalues) {
        this.table.addrow(cellvalues);
    }

    return ProtoStep;
});

