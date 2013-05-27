require(['StepList'], function (StepList) {
    $(function () {

        var steps = new StepList();

        viewModel = {steps: steps};

        ko.applyBindings(viewModel);

        steps.newstep(0, '');

        $('#help-list').hide();
        $('#help-list').mouseleave(function (event) {
            $(this).hide();
            $('#help').show();
        });

        $('#help').click(function (event) {
            $(this).hide();
            $('#help-list').show();
        });
           

    });
});
