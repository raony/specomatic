define(['Table', 'ProtoList', 'Header'], function(Table, ProtoList, Header) {
    describe("Table", function() {
        var first, second;
        var listener;

        beforeEach(function() {
            table = new Table();
        });

        it("behaves as a ProtoList", function () {
            expect(table instanceof ProtoList).toBeTruthy();
        });

        it("creates a header when the first row", function () {
            var row = table.addrow(['first row']);

            expect(row instanceof Header).toBeTruthy();
            expect(table.elementAt(0)).toBe(row);
            expect(row.elementAt(0).value()).toBe('first row');
        });

        it("don't create a new row when previous or insert previous at the header", function () {
            var header = table.newstep(0, 'header');
            table.previous();
            expect(table.elementAt(0)).toBe(header);
            expect(table.length()).toBe(1);
            table.previous(true);
            expect(table.elementAt(0)).toBe(header);
            expect(table.length()).toBe(1);
        });

        it("creates a row when the second row", function () {
            table.addrow(['first row']);
            var row = table.addrow(['second row']);

            expect(row instanceof Header).toBeFalsy();
            expect(table.elementAt(1)).toBe(row);
            expect(row.elementAt(0).value()).toBe('second row');
        });

        it("creates a new row when asked for a new step with the same name of columns as header", function () {
            first = table.addrow(['first row', 'cell 2']);
            second = table.addrow(['second row', 'cell 2']);

            third = table.newstep(1, 'third row');

            expect(third).not.toBe(first);
            expect(third).not.toBe(second);
            expect(third).toBe(table.elementAt(1));
            expect(third.length()).toBe(2);
            expect(third.elementAt(0).value()).toBe('third row');
            expect(third.elementAt(1).value()).toBe('');
        });
        
        xit("should create a new row at the bottom when enter in the last row and it is empty", function () {
            first = table.newstep(0, 'value');
            second = table.newstep(1, 'value');
            third = table.newstep(2, 'asd');
            table.select(third);
            var stoploop = false;
            spyOn(third, 'stopediting').andCallFake(function () {
                if (!stoploop) {
                    stoploop = true;
                    third.blur();
                }
            });
            third.elementAt(0).value('');

            newstep = table.next();

            expect(newstep).not.toBe(first);
            expect(newstep).not.toBe(second);
            expect(newstep).not.toBe(third);
            expect(newstep.elementAt(0).value()).toBe('');
            expect(table.index(newstep)).toBe(2);
            expect(table.index(second)).toBe(1);
            expect(table.index(first)).toBe(0);
            expect(table.length()).toBe(3);
        });

        it("should bubble up enter on the bottom when empty so the steplist moves to the next step", function () {
            table.prelistener = jasmine.createSpyObj('listener', ['keyval']);
            table.parentstep = {};
            first = table.newstep(0, 'value');
            second = table.newstep(1, 'value');
            third = table.newstep(2, 'asd');
            table.select(third);
            third.elementAt(0).value('');

            devent = {keyCode: 13, shiftKey: false, ctrlKey:false, preventDefault: jasmine.createSpy()};
            table.keyval(third, devent);

            expect(table.prelistener.keyval).toHaveBeenCalledWith(table.parentstep, devent);
        });



        it("should remove the a row if it is empty", function () {
            first = table.newstep(0, 'value');
            second = table.newstep(1, 'value');
            third = table.newstep(2, 'asd');
            table.select(second);
            second.elementAt(0).value('');
            second.blur(second.elementAt(0));

            expect(table.length()).toBe(2);
            expect(table.elementAt(0)).toBe(first);
            expect(table.elementAt(1)).toBe(third);

        });
    });
});
