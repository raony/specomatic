define(['StepList'], function(StepList) {
    describe("StepList", function() {
        var steplist;

        beforeEach(function() {
            steplist = new StepList();
        });

        it("should have nothing selected at start", function () {
            expect(steplist.selected()).toBeNull();
        });

        it("should set the newstep table parent and prelistener", function () {
            step = steplist.newstep(0, 'value');

            expect(step.table.parentstep).toBe(step);
            expect(step.table.prelistener).toBe(steplist);
        });

        it("should select the newstep when added", function () {
            step = steplist.newstep(0, 'value');

            expect(steplist.selected()).toBe(step);
        });
        it("should select the newstep when added even if we already have one selected", function () {
            step = steplist.newstep(0, 'value');
            step2 = steplist.newstep(0, 'value');

            expect(steplist.selected()).toBe(step2);
        });
        it("should start editing the selected step and stop previous selected", function () {
            step = steplist.newstep(0, 'value');
            step2 = steplist.newstep(0, 'value');

            steplist.select(step);

            expect(step.isediting()).toBe(true);
            expect(step2.isediting()).toBe(false);
        });
        it("should select the next step relative to the current selected when we hit next", function () {
            third = steplist.newstep(0, 'value');
            second = steplist.newstep(0, 'value');
            first = steplist.newstep(0, 'value');
            steplist.select(first);

            selected = steplist.next();

            expect(second.isediting()).toBe(true);
            expect(selected).toBe(second);
        });
        it("should create a newstep when the last step is selected and we hit next", function () {
            third = steplist.newstep(0, 'value');
            second = steplist.newstep(0, 'value');
            first = steplist.newstep(0, 'value');
            steplist.select(third);

            newstep = steplist.next();

            expect(newstep).not.toBe(first);
            expect(newstep).not.toBe(second);
            expect(newstep).not.toBe(third);
            expect(newstep.value()).toBe('');
            expect(steplist.index(newstep)).toBe(3);
        });
        it("should create a newstep right after selected when we hit insert next", function () {
            third = steplist.newstep(0, 'value');
            second = steplist.newstep(0, 'value');
            first = steplist.newstep(0, 'value');
            steplist.select(second);

            newstep = steplist.next(true);

            expect(newstep).not.toBe(first);
            expect(newstep).not.toBe(second);
            expect(newstep).not.toBe(third);
            expect(newstep.value()).toBe('');
            expect(steplist.index(newstep)).toBe(2);
        });
        it("should select the previous step relative to the current selected when we hit previous", function () {
            third = steplist.newstep(0, 'value');
            second = steplist.newstep(0, 'value');
            first = steplist.newstep(0, 'value');
            steplist.select(second);

            selected = steplist.previous();

            expect(first.isediting()).toBe(true);
            expect(selected).toBe(first);
        });
        it("should create a newstep when the first step is selected and we hit previous", function () {
            third = steplist.newstep(0, 'value');
            second = steplist.newstep(0, 'value');
            first = steplist.newstep(0, 'value');
            steplist.select(first);

            newstep = steplist.previous();

            expect(newstep).not.toBe(first);
            expect(newstep).not.toBe(second);
            expect(newstep).not.toBe(third);
            expect(newstep.value()).toBe('');
            expect(steplist.index(newstep)).toBe(0);
        });
        it("should create a newstep right before selected when we hit insert previous", function () {
            third = steplist.newstep(0, 'value');
            second = steplist.newstep(0, 'value');
            first = steplist.newstep(0, 'value');
            steplist.select(second);
            newstep = steplist.previous(true);
            expect(newstep).not.toBe(first);
            expect(newstep).not.toBe(second);
            expect(newstep).not.toBe(third);
            expect(newstep.value()).toBe('');
            expect(steplist.index(newstep)).toBe(1);
        });
        it("should remove an empty step when it loses selection", function () {
            emptyfirst = steplist.newstep(0, '');
            firstandonly = steplist.newstep(0, 'value');

            expect(steplist.length()).toBe(1);
            expect(steplist.elementAt(0)).toBe(firstandonly);
        });
        it("should add an table row on previous step when hit createtab", function () {
            second = steplist.newstep(0, 'to be a cell');
            first = steplist.newstep(0, 'value');
            spyOn(first, 'addtabrow');
            steplist.select(second);
            steplist.createtab();

            expect(steplist.length()).toBe(1);
            expect(steplist.elementAt(0)).toBe(first);
            expect(first.addtabrow).toHaveBeenCalledWith('to be a cell');
        });

        it("should create a new at the bottom when enter in the last step and it is empty", function () {
            third = steplist.newstep(0, 'asd');
            second = steplist.newstep(0, 'value');
            first = steplist.newstep(0, 'value');
            steplist.select(third);
            var stoploop = false;
            spyOn(third, 'stopediting').andCallFake(function () {
                if (!stoploop) {
                    stoploop = true;
                    third.blur();
                }
            });
            third.value('');

            newstep = steplist.next();

            expect(newstep).not.toBe(first);
            expect(newstep).not.toBe(second);
            expect(newstep).not.toBe(third);
            expect(newstep.value()).toBe('');
            expect(steplist.index(newstep)).toBe(2);
        });
    });
});
