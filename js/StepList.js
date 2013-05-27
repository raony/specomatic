
define(['ProtoList', 'Step', 'utils'], function (ProtoList, Step, utils) {

    var StepList = function (nparent) {
        ProtoList.call(this, nparent);
    }
    utils.inherits(StepList, ProtoList);

    StepList.prototype.newstep = function (position, value) {
        var step = new Step(value, this);
        this.steps.splice(position, 0, step);
        this.select(step);
        return step;
    }

    return StepList;
});

