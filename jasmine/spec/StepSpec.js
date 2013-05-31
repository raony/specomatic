define(['StepList'], function(StepList) {
    describe("Step", function() {
        var first, second;
        var listener;

        beforeEach(function() {
            list = new StepList();
            second = list.newstep(0, 'second');
            first = list.newstep(0, 'first');
        });

        it("should be selected when clicked", function () {
            expect(list.selected()).toBe(first);

            second.click();

            expect(list.selected()).toBe(second);
        });

        it("should be unselected when blur", function () {
            expect(list.selected()).toBe(first);

            first.blur();

            expect(list.selected()).toBe(null);
        });

        it("should next when enter", function () {
            first.keyval(null, {keyCode: 13, shiftKey: false, ctrlKey:false, preventDefault: jasmine.createSpy()});

            expect(list.selected()).toBe(second);
        });

        it("should select first row of table if next and has table", function () {
            var row = first.table.addrow(['sadsda'], 0);
            first.keyval(null, {keyCode: 13, shiftKey: false, ctrlKey:false, preventDefault: jasmine.createSpy()});

            expect(list.selected()).toBe(null);
            expect(first.table.selected()).toBe(row);
        });

        it("should not select first row of table if shift next and has table", function () {
            var row = first.table.addrow(['sadsda'], 0);
            first.keyval(null, {keyCode: 13, shiftKey: true, ctrlKey:false, preventDefault: jasmine.createSpy()});

            expect(list.selected()).not.toBe(null);
            expect(first.table.selected()).toBe(null);
        });

        it("should insert next when ctrl+enter", function () {
            first.keyval(null, {keyCode: 13, shiftKey: false, ctrlKey:true, preventDefault: jasmine.createSpy()});

            expect(list.selected()).not.toBe(second);
            expect(list.selected()).not.toBe(first);
            expect(list.selectedindex()).toBe(1);
        });

        it("should previous when shift+enter", function () {
            list.select(second);

            second.keyval(null, {keyCode: 13, shiftKey: true, ctrlKey:false, preventDefault: jasmine.createSpy()});

            expect(list.selected()).toBe(first);
        });

        it("should insert previous when shift+ctrl+enter", function () {
            list.select(second);

            second.keyval(null, {keyCode: 13, shiftKey: true, ctrlKey:true, preventDefault: jasmine.createSpy()});

            expect(list.selected()).not.toBe(second);
            expect(list.selected()).not.toBe(first);
            expect(list.selectedindex()).toBe(1);
        });

        it("should use the step that triggered the event in case nothing is selected", function () {
            list.deselect(list.selected());

            second.keyval(null, {keyCode: 13, shiftKey: true, ctrlKey:true, preventDefault: jasmine.createSpy()});

            expect(list.selected()).not.toBe(second);
            expect(list.selected()).not.toBe(first);
            expect(list.selectedindex()).toBe(1);
        });

        it("add new tab in previous when hit tab", function () {
            spyOn(first.table, 'newstep');
            list.select(second);

            second.keyval(null, {keyCode: 9, shiftKey: false, ctrlKey:true, preventDefault: jasmine.createSpy()});

            expect(list.length()).toBe(1);
            expect(list.index(first)).toBe(0);

            expect(first.table.newstep).toHaveBeenCalledWith(0, 'second');

        });
    });
});
