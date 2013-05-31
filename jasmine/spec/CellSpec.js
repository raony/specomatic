define(['Table', 'TabCell'], function(Table, TabCell) {
    describe("Cell", function() {
        var table, lastrow, row, first, second;

        beforeEach(function() {
            table = new Table();
            lastrow = table.newstep(0, 'asd');
            row = table.newstep(0, 'asd');
            second = row.newstep(0, 'asd 2');
            first = row.newstep(0, 'asd');
        });

        it("should be selected when clicked, and also select the row", function () {
            table.deselect(first);

            second.click();
            expect(row.selected()).toBe(second);
            expect(table.selected()).toBe(row);
        });

        it("should be deselected when blur, and also deselect the row", function () {
            first.blur();
            expect(row.selected()).toBe(null);
            expect(table.selected()).toBe(null);
        });

        it("should select next cell/column when tab", function () {
            first.keyval(null, {keyCode: 9, shiftKey: false, ctrlKey:false, preventDefault: jasmine.createSpy()});
            
            expect(row.selected()).toBe(second);
        });
        
        it("should create new/select next row when enter", function () {
            row.select(second);

            second.keyval(null, {keyCode: 13, shiftKey: false, ctrlKey:false, preventDefault: jasmine.createSpy()});
            
            expect(table.selected()).toBe(lastrow);
        });
        
        it("should maintain selected row when tabbing inside the row", function () {
            first.keyval(null, {keyCode: 9, shiftKey: false, ctrlKey:false, preventDefault: jasmine.createSpy()});
            first.blur();
            
            expect(row.selected()).toBe(second);
            expect(table.selected()).toBe(row);
        });
        
        it("should maintain selected row when tabbing inside the row - second asynchronous scenario", function () {
            var stoploop = false;
            spyOn(first, 'stopediting').andCallFake(function () {
                if (!stoploop) {
                    stoploop = true;
                    first.blur();
                    TabCell.prototype.stopediting.call(first);
                }
            });
            first.keyval(null, {keyCode: 9, shiftKey: false, ctrlKey:false, preventDefault: jasmine.createSpy()});
            
            expect(row.selected()).toBe(second);
            expect(table.selected()).toBe(row);
        });
    });
});
