define(function () {
    var ProtoStep = function ( listener ) {
        this.listener = listener;
    };

    ProtoStep.prototype.addtabrow = function (value) {
        this.table.newstep(0, value);
    }

    return ProtoStep;
});

